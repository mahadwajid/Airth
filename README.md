# 🌱 Airth - Air Quality Monitoring & Environmental Impact Platform

[![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.0.0-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-yellow.svg)](https://python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0.0-red.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A comprehensive full-stack environmental monitoring and gamification platform that combines real-time air quality data analysis, machine learning-powered predictions, and gamified user engagement to create a holistic solution for environmental consciousness and community-driven sustainability initiatives.

## 🚀 Features

### 🌬️ Air Quality Monitoring
- **Real-time AQI data** from OpenAQ API and simulated datasets
- **Multi-city support** (New York, London, Delhi, Beijing)
- **Interactive visualizations** with Chart.js and Recharts
- **Color-coded AQI categories** for easy interpretation
- **Historical trend analysis** with time-series charts

### 🤖 Machine Learning Predictions
- **7-day AQI forecasts** using ARIMA time series models
- **Multi-city prediction system** with automated training
- **Anomaly detection** using z-score analysis
- **Realistic data patterns** including rush hour and seasonal effects
- **RESTful API** for easy integration

### 🎮 Gamified Environmental Engagement
- **EcoPoints system** with real-time point accumulation
- **Achievement badges** unlocked through environmental actions
- **Level progression** with visual feedback and celebrations
- **Leaderboard system** for community competition
- **Activity logging** for various eco-friendly actions

### 🤝 Community Pledge System
- **Environmental pledges** (plastic reduction, tree planting, energy conservation)
- **Personal progress tracking** with visual progress bars
- **Activity logging** with point-based rewards
- **Community statistics** and participation metrics
- **Custom pledge creation** functionality

### 🎨 Modern UI/UX
- **Dribbble-inspired design** with glassmorphism effects
- **Responsive layout** optimized for all devices
- **Smooth animations** and micro-interactions
- **Gradient backgrounds** and modern color schemes
- **Intuitive navigation** with sidebar and breadcrumbs

## 🛠️ Technology Stack

### Frontend
- **React.js 18** - Modern UI framework
- **Material-UI** - Component library
- **Chart.js & Recharts** - Data visualization
- **Leaflet** - Interactive mapping
- **Axios** - HTTP client
- **React Router** - Navigation
- **CSS3** - Custom styling with glassmorphism

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAQ API** - Real-time air quality data
- **CORS** - Cross-origin resource sharing
- **CSV-parser** - Data processing

### Machine Learning
- **Python 3.8+** - ML runtime
- **Flask** - API framework
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Scikit-learn** - Machine learning utilities
- **Statsmodels** - ARIMA time series models
- **Matplotlib** - Data visualization

### Data Storage
- **localStorage** - Client-side data persistence
- **JSON** - Data interchange format
- **CSV** - Historical data storage

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** package manager
- **Python** (v3.8 or higher)
- **pip** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mahadwajid/airth.git
cd airth
```

### 2. Frontend Setup (React)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

The React app will be available at `http://localhost:3000`

### 3. Backend Setup (Node.js)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the server
npm start
```

The Express server will run on `http://localhost:5000`

### 4. Machine Learning Setup (Python)

```bash
# Navigate to ml directory
cd ml

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Generate initial predictions
python aqi_predictor.py

# Start the Flask API server
python serve_predictions.py
```

The ML API will be available at `http://localhost:5001`

## 📁 Project Structure

```
airth/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── Component/      # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── AQIDisplay.js
│   │   │   ├── EcoPoints.js
│   │   │   ├── PledgeSystem.js
│   │   │   ├── Suggestions.js
│   │   │   ├── Sidebar.js
│   │   │   └── Header.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── server/                 # Node.js backend
│   ├── Routes/
│   │   └── aqi.js
│   ├── Controller/
│   │   └── aqiDataController.js
│   ├── data/
│   │   └── aqi_sample.csv
│   ├── index.js
│   └── package.json
├── ml/                     # Python ML service
│   ├── aqi_predictor.py    # ARIMA model training
│   ├── serve_predictions.py # Flask API server
│   ├── requirements.txt
│   ├── predicted_aqi.json  # Generated predictions
│   └── README.md
└── README.md
```

## 🎯 Usage Guide

### Getting Started

1. **Start all services** (frontend, backend, ML) as described in the setup section
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Explore the dashboard** to view current air quality data
4. **Join environmental pledges** and start earning EcoPoints
5. **Log your activities** to track your environmental impact

### Air Quality Monitoring

- **View current AQI** for different cities
- **Check predictions** for the next 7 days
- **Analyze trends** with interactive charts
- **Compare cities** side by side

### Gamification Features

- **Earn EcoPoints** by performing environmental actions
- **Unlock badges** as you reach milestones
- **Track your level** and progress
- **Compete on leaderboards** with other users

### Community Pledges

- **Join existing pledges** or create custom ones
- **Log daily activities** to update your progress
- **View community statistics** and participation
- **Track personal achievements** with visual progress bars

## 🔧 API Endpoints

### Backend API (Port 5000)
- `GET /api/data` - Get air quality data
- `GET /api/data/live` - Get live data from OpenAQ
- `GET /api/data/simulated` - Get simulated data

### ML API (Port 5001)
- `GET /predict` - Get AQI predictions for all cities

## 🎨 Customization

### Styling
- Modify CSS files in `client/src/Component/` for UI changes
- Update color schemes in `client/src/index.css`
- Customize glassmorphism effects in component CSS files

### Data Sources
- Add new cities in `ml/aqi_predictor.py`
- Modify data patterns in the `create_sample_data` function
- Update API endpoints in `server/Controller/aqiDataController.js`

### Gamification
- Add new activities in `client/src/Component/PledgeSystem.js`
- Modify point values and achievements in `client/src/Component/EcoPoints.js`
- Update pledge categories and descriptions

## 🐛 Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure all services are running on correct ports
- Check CORS configuration in `ml/serve_predictions.py`

**ML Predictions Not Loading:**
- Verify Python virtual environment is activated
- Check if `predicted_aqi.json` exists in `ml/` directory
- Run `python aqi_predictor.py` to regenerate predictions

**React App Not Starting:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for port conflicts on 3000

**Backend API Issues:**
- Verify OpenAQ API connectivity
- Check CSV file paths in `server/data/`

### Debug Mode

Enable debug logging by adding console.log statements or using browser developer tools for frontend debugging.

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📊 Performance

- **Frontend**: Optimized with React 18 features and lazy loading
- **Backend**: Efficient API responses with caching
- **ML**: Optimized ARIMA models with realistic data patterns
- **Database**: Client-side localStorage for fast access

## 🔒 Security

- **CORS** properly configured for cross-origin requests
- **Input validation** on all user inputs
- **Secure API endpoints** with proper error handling
- **No sensitive data** stored in client-side storage

## 📈 Future Enhancements

- [ ] **Real-time notifications** for air quality alerts
- [ ] **Mobile app** development
- [ ] **Advanced ML models** (LSTM, Prophet)
- [ ] **Social features** (sharing, comments)
- [ ] **Integration with IoT sensors**
- [ ] **Advanced analytics dashboard**
- [ ] **Multi-language support**
- [ ] **Dark mode** theme


## 🙏 Acknowledgments

- **OpenAQ** for providing air quality data
- **React.js** community for excellent documentation
- **Material-UI** for beautiful components
- **Chart.js** for data visualization tools
- **Flask** for lightweight API framework

--

**Made with ❤️ for a greener future**

*This project was created for environmental awareness and sustainable living. Every contribution helps make our planet a better place.* 