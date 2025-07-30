# ML Module - AQI Prediction

This module contains the AI/ML components for predicting AQI trends.

## Setup

### Option 1: Virtual Environment (Recommended)
```bash
# Windows
setup_env.bat

# Or manually:
python -m venv venv
venv\Scripts\activate.bat
pip install --upgrade pip
pip install setuptools wheel
pip install -r requirements.txt
```

### Option 2: Global Installation (If virtual env fails)
```bash
# Windows
alternative_setup.bat

# Or manually:
pip install --upgrade pip
pip install setuptools wheel
pip install -r requirements.txt
```

### 2. Activate Environment (after setup)
```bash
venv\Scripts\activate.bat
```

## Troubleshooting

If you get `Cannot import 'setuptools.build_meta'` error:
1. Try the alternative setup: `alternative_setup.bat`
2. Or manually upgrade pip and setuptools first:
   ```bash
   pip install --upgrade pip setuptools wheel
   pip install -r requirements.txt
   ```

## Usage

### 1. Generate Predictions
```bash
python aqi_predictor.py
```
This will:
- Load AQI data from `../server/data/aqi_sample.csv`
- Train an ARIMA model
- Generate predictions for the next 5 hours
- Save results to `predicted_aqi.json`

### 2. Serve Predictions API
```bash
python serve_predictions.py
```
This starts a Flask server on port 5001 serving predictions at `/predict`.

## Files
- `aqi_predictor.py` - ML model training and prediction generation
- `serve_predictions.py` - Flask API to serve predictions
- `requirements.txt` - Python dependencies
- `setup_env.bat` - Windows setup script
- `alternative_setup.bat` - Alternative setup for compatibility issues 