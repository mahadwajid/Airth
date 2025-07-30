@echo off
echo Alternative setup using pip install directly...
echo This bypasses virtual environment if there are issues.

echo Upgrading pip...
python -m pip install --upgrade pip

echo Installing setuptools and wheel first...
pip install setuptools wheel

echo Installing requirements globally...
pip install -r requirements.txt

echo Setup complete! You can now run:
echo python aqi_predictor.py
echo python serve_predictions.py 