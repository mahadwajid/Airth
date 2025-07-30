import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import numpy as np

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
            
            aqi = base_aqi * rush_hour_factor * weekday_factor * seasonal_factor + np.random.normal(0, 8)
            aqi = max(0, int(aqi))  # Ensure non-negative
            sample_data.append({
                'city': city,
                'aqi': aqi,
                'timestamp': timestamp.isoformat()
            })
    
    return pd.DataFrame(sample_data)

# Load or create data
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
    
    forecast_df = pd.DataFrame({
        'timestamp': forecast.index,
        'predicted_aqi': forecast.values
    })
    
    # Save to JSON
    forecast_df.to_json('predicted_aqi.json', orient='records', date_format='iso')
    print('Prediction saved to predicted_aqi.json')
    print(f"Predicted AQI values: {[round(x, 1) for x in forecast.values.tolist()]}")
    
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
    
    import json
    with open('predicted_aqi.json', 'w') as f:
        json.dump(forecast_data, f, indent=2)
    print('Fallback prediction saved to predicted_aqi.json')