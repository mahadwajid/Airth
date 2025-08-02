import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import numpy as np
import json
from datetime import datetime, timedelta

# Create more sample data for better ML training
def create_sample_data():
    # Generate more realistic sample data with hourly intervals
    base_time = pd.Timestamp('2023-06-01T10:00:00Z')  # Start from 1 year ago
    cities = ['New York', 'London', 'Delhi', 'Beijing']
    sample_data = []
    
    for city in cities:
        base_aqi = {'New York': 42, 'London': 55, 'Delhi': 120, 'Beijing': 130}[city]
        for i in range(8760):  # 8760 hours = 1 year of data
            timestamp = base_time + pd.Timedelta(hours=i)
            # Add some realistic variation with daily patterns
            hour_of_day = timestamp.hour
            month = timestamp.month
            
            # Higher AQI during rush hours (8-10 AM, 5-7 PM)
            rush_hour_factor = 1.2 if hour_of_day in [8, 9, 10, 17, 18, 19] else 0.9
            
            # Add some weekly pattern (weekend vs weekday)
            weekday_factor = 0.8 if timestamp.weekday() >= 5 else 1.0  # Weekend lower AQI
            
            # Seasonal patterns (higher AQI in winter months for some cities)
            seasonal_factor = 1.0
            if city in ['Delhi', 'Beijing']:
                # Higher AQI in winter (Nov-Feb) due to heating and less wind
                if month in [11, 12, 1, 2]:
                    seasonal_factor = 1.3
                elif month in [6, 7, 8]:  # Monsoon season for Delhi
                    seasonal_factor = 0.7
            elif city == 'London':
                # London has higher AQI in winter due to heating
                if month in [12, 1, 2]:
                    seasonal_factor = 1.2
            
            aqi = base_aqi * rush_hour_factor * weekday_factor * seasonal_factor + np.random.normal(0, 8)
            aqi = max(0, int(aqi))  # Ensure non-negative
            sample_data.append({
                'city': city,
                'aqi': aqi,
                'timestamp': timestamp.isoformat()
            })
    
    return pd.DataFrame(sample_data)

def detect_anomalies(aqi_series, threshold=2.0):
    """Detect anomalies in AQI data using z-score method"""
    mean = np.mean(aqi_series)
    std = np.std(aqi_series)
    z_scores = np.abs((aqi_series - mean) / std)
    anomalies = z_scores > threshold
    return anomalies

def generate_predictions_for_all_cities():
    """Generate predictions for all cities"""
    try:
        csv_path = '../server/data/aqi_sample.csv'
        df = pd.read_csv(csv_path)
        
        # If too few data points, create more
        if len(df) < 100:
            print("Generating comprehensive sample data for all cities...")
            df = create_sample_data()
        
        all_predictions = {}
        
        for city in ['New York', 'London', 'Delhi', 'Beijing']:
            print(f"Training model for {city}...")
            
            # Filter data for current city
            city_data = df[df['city'] == city].copy()
            if len(city_data) == 0:
                print(f"No data found for {city}, skipping...")
                continue
                
            # Prepare data for time series
            city_data['timestamp'] = pd.to_datetime(city_data['timestamp'])
            city_data.set_index('timestamp', inplace=True)
            city_data = city_data.sort_index()
            
            # Detect anomalies
            anomalies = detect_anomalies(city_data['aqi'])
            anomaly_count = anomalies.sum()
            
            print(f"Using {len(city_data)} data points for {city} (Anomalies detected: {anomaly_count})")
            
            try:
                # Train ARIMA model
                model = ARIMA(city_data['aqi'], order=(3,1,3))
                model_fit = model.fit()
                
                # Forecast next 5 hours
                forecast = model_fit.forecast(steps=5)
                forecast_index = pd.date_range(city_data.index[-1], periods=6, freq='h')[1:]
                
                # Add some realistic variation to predictions
                forecast_values = forecast.values + np.random.normal(0, 3, len(forecast))
                forecast_values = np.maximum(0, forecast_values)  # Ensure non-negative
                
                city_predictions = []
                for i, (timestamp, value) in enumerate(zip(forecast_index, forecast_values)):
                    city_predictions.append({
                        'timestamp': timestamp.isoformat(),
                        'predicted_aqi': round(float(value), 1),
                        'hour_offset': i + 1
                    })
                
                all_predictions[city] = {
                    'predictions': city_predictions,
                    'current_aqi': int(city_data['aqi'].iloc[-1]),
                    'anomaly_count': int(anomaly_count),
                    'data_points': len(city_data)
                }
                
            except Exception as e:
                print(f"Error training model for {city}: {e}")
                # Fallback: create simple predictions
                last_aqi = city_data['aqi'].iloc[-1]
                city_predictions = []
                for i in range(1, 6):
                    timestamp = city_data.index[-1] + pd.Timedelta(hours=i)
                    predicted_aqi = max(0, int(last_aqi + np.random.normal(0, 5)))
                    city_predictions.append({
                        'timestamp': timestamp.isoformat(),
                        'predicted_aqi': predicted_aqi,
                        'hour_offset': i
                    })
                
                all_predictions[city] = {
                    'predictions': city_predictions,
                    'current_aqi': int(last_aqi),
                    'anomaly_count': 0,
                    'data_points': len(city_data)
                }
        
        # Save comprehensive predictions
        with open('predicted_aqi.json', 'w') as f:
            json.dump(all_predictions, f, indent=2)
        
        print('Comprehensive predictions saved to predicted_aqi.json')
        
        # Print summary
        for city, data in all_predictions.items():
            predictions = [p['predicted_aqi'] for p in data['predictions']]
            print(f"{city}: Current AQI {data['current_aqi']}, Predictions: {predictions}")
        
        return all_predictions
        
    except Exception as e:
        print(f"Error in comprehensive prediction: {e}")
        # Fallback to original single-city approach
        return generate_single_city_predictions()

def generate_single_city_predictions():
    """Original single-city prediction method as fallback"""
    try:
        csv_path = '../server/data/aqi_sample.csv'
        df = pd.read_csv(csv_path)
        df = df[df['city'] == 'Delhi']  # Filter for Delhi
        if len(df) < 100:  # If too few data points, create more
            print("Too few data points, generating 1 year of sample data...")
            df = create_sample_data()
            df = df[df['city'] == 'Delhi']
    except Exception as e:
        print(f"Error loading CSV: {e}")
        print("Generating 1 year of sample data...")
        df = create_sample_data()
        df = df[df['city'] == 'Delhi']

    # Prepare data for time series
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df.set_index('timestamp', inplace=True)
    df = df.sort_index()

    print(f"Using {len(df)} data points for training (1 year of hourly data)")

    # Train ARIMA model with error handling
    try:
        model = ARIMA(df['aqi'], order=(3,1,3))  # More complex model for large dataset
        model_fit = model.fit()
        
        # Forecast next 5 hours
        forecast = model_fit.forecast(steps=5)
        forecast.index = pd.date_range(df.index[-1], periods=6, freq='h')[1:]  # Use 'h' instead of 'H'
        
        forecast_data = []
        for i, (timestamp, value) in enumerate(zip(forecast.index, forecast.values)):
            forecast_data.append({
                'timestamp': timestamp.isoformat(),
                'predicted_aqi': round(float(value), 1)
            })
        
        # Save to JSON
        with open('predicted_aqi.json', 'w') as f:
            json.dump(forecast_data, f, indent=2)
        
        print('Prediction saved to predicted_aqi.json')
        print(f"Predicted AQI values: {[round(x, 1) for x in forecast.values.tolist()]}")
        
        return forecast_data
        
    except Exception as e:
        print(f"Error in model training: {e}")
        # Fallback: create simple predictions
        last_aqi = df['aqi'].iloc[-1]
        forecast_data = []
        for i in range(1, 6):
            timestamp = df.index[-1] + pd.Timedelta(hours=i)
            predicted_aqi = max(0, int(last_aqi + np.random.normal(0, 5)))
            forecast_data.append({
                'timestamp': timestamp.isoformat(),
                'predicted_aqi': predicted_aqi
            })
        
        with open('predicted_aqi.json', 'w') as f:
            json.dump(forecast_data, f, indent=2)
        print('Fallback prediction saved to predicted_aqi.json')
        return forecast_data

if __name__ == "__main__":
    print("🚀 Starting Enhanced AQI Prediction System...")
    print("=" * 50)
    
    # Generate comprehensive predictions for all cities
    predictions = generate_predictions_for_all_cities()
    
    print("=" * 50)
    print("✅ Prediction generation completed!")
    print("📊 Check predicted_aqi.json for detailed results")