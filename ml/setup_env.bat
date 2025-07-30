@echo off
echo Creating Python virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Upgrading pip...
python -m pip install --upgrade pip

echo Installing setuptools and wheel first...
pip install setuptools wheel

echo Installing requirements...
pip install -r requirements.txt

echo Setup complete! To activate the environment later, run:
echo venv\Scripts\activate.bat 