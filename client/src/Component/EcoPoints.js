import React, { useState, useEffect } from 'react';
import './EcoPoints.css';

const EcoPoints = () => {
  // Load initial data from localStorage or use defaults
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('ecopoints');
    return saved ? parseInt(saved) : 120;
  });
  
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem('ecolevel');
    return saved ? parseInt(saved) : 3;
  });
  
  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem('ecobadges');
    return saved ? JSON.parse(saved) : ['🌱', '🌳', '🚴'];
  });
  
  const [recentAchievements, setRecentAchievements] = useState(() => {
    const saved = localStorage.getItem('ecoachievements');
    return saved ? JSON.parse(saved) : [];
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first eco-action', points: 10, icon: '🌱', unlocked: false },
    { id: 2, name: 'Tree Hugger', description: 'Plant 5 trees', points: 50, icon: '🌳', unlocked: false },
    { id: 3, name: 'Bike Master', description: 'Use bike for 30 days', points: 100, icon: '🚴', unlocked: false },
    { id: 4, name: 'Air Guardian', description: 'Monitor AQI for 7 days', points: 25, icon: '🌬️', unlocked: false },
    { id: 5, name: 'Community Hero', description: 'Join 3 pledges', points: 75, icon: '🤝', unlocked: false },
    { id: 6, name: 'Green Innovator', description: 'Suggest 5 eco-ideas', points: 40, icon: '💡', unlocked: false },
    { id: 7, name: 'Energy Saver', description: 'Reduce energy consumption by 20%', points: 60, icon: '⚡', unlocked: false },
    { id: 8, name: 'Waste Warrior', description: 'Recycle 50 items', points: 35, icon: '♻️', unlocked: false }
  ];

  const leaderboard = [
    { name: 'Alice', points: 200, level: 4, avatar: '👩‍💼' },
    { name: 'Bob', points: 150, level: 3, avatar: '👨‍💻' },
    { name: 'You', points: points, level: level, avatar: '👤', isCurrentUser: true },
    { name: 'Charlie', points: 95, level: 2, avatar: '👨‍🎨' },
    { name: 'Diana', points: 80, level: 2, avatar: '👩‍🎓' }
  ];

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecopoints', points.toString());
    localStorage.setItem('ecolevel', level.toString());
    localStorage.setItem('ecobadges', JSON.stringify(badges));
    localStorage.setItem('ecoachievements', JSON.stringify(recentAchievements));
  }, [points, level, badges, recentAchievements]);

  const addPoints = (amount, reason = 'Action completed') => {
    const newPoints = points + amount;
    setPoints(newPoints);
    
    // Check for level up
    const newLevel = Math.floor(newPoints / 50) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setShowConfetti(true);
      setNotificationMessage(`🎉 Level Up! You're now level ${newLevel}!`);
      setShowNotification(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => setShowNotification(false), 4000);
    } else {
      setNotificationMessage(`+${amount} points! ${reason}`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }

    // Check for achievements
    checkAchievements(newPoints);
  };

  const unlockBadge = (badge, reason = 'Badge unlocked!') => {
    if (!badges.includes(badge)) {
      setBadges([...badges, badge]);
      setRecentAchievements([...recentAchievements, { 
        badge, 
        timestamp: new Date().toISOString(),
        reason 
      }]);
      setNotificationMessage(`🏆 ${reason}`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const checkAchievements = (currentPoints) => {
    // Check for point-based achievements
    if (currentPoints >= 50 && !badges.includes('🌳')) {
      unlockBadge('🌳', 'Tree Hugger achievement unlocked!');
    }
    if (currentPoints >= 100 && !badges.includes('🌬️')) {
      unlockBadge('🌬️', 'Air Guardian achievement unlocked!');
    }
    if (currentPoints >= 200 && !badges.includes('⚡')) {
      unlockBadge('⚡', 'Energy Saver achievement unlocked!');
    }
  };

  const performEcoAction = (action) => {
    const actions = {
      'plant_tree': { points: 15, message: '🌳 Tree planted! +15 points' },
      'use_bike': { points: 10, message: '🚴 Bike ride! +10 points' },
      'recycle': { points: 8, message: '♻️ Item recycled! +8 points' },
      'save_energy': { points: 12, message: '⚡ Energy saved! +12 points' },
      'use_public_transport': { points: 6, message: '🚌 Public transport! +6 points' },
      'reduce_water': { points: 5, message: '💧 Water conserved! +5 points' }
    };

    const actionData = actions[action];
    if (actionData) {
      addPoints(actionData.points, actionData.message);
    }
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      setPoints(0);
      setLevel(1);
      setBadges(['🌱']);
      setRecentAchievements([]);
      localStorage.removeItem('ecopoints');
      localStorage.removeItem('ecolevel');
      localStorage.removeItem('ecobadges');
      localStorage.removeItem('ecoachievements');
      setNotificationMessage('Progress reset! Start fresh!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
  <div className="card ecopoints-card">
      <div className="ecopoints-header">
        <h2>🏆 EcoPoints & Achievements</h2>
        <div className="level-indicator">
          <span className="level-badge">Level {level}</span>
        </div>
      </div>

      <div className="points-section">
        <div className="points-display">
          <div className="points-number">{points}</div>
          <div className="points-label">Total Points</div>
        </div>
        
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(points % 50) * 2}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {50 - (points % 50)} points to next level
          </div>
        </div>
      </div>

      <div className="badges-section">
        <h3>🎖️ Badges Earned</h3>
        <div className="badges-grid">
          {badges.map((badge, index) => (
            <div key={index} className="badge-item">
              <span className="badge-icon">{badge}</span>
            </div>
          ))}
          {[...Array(8 - badges.length)].map((_, index) => (
            <div key={`empty-${index}`} className="badge-item empty">
              <span className="badge-icon">🔒</span>
            </div>
          ))}
        </div>
      </div>

      <div className="achievements-section">
        <h3>🏅 Recent Achievements</h3>
        <div className="achievements-list">
          {recentAchievements.slice(-3).reverse().map((achievement, idx) => (
            <div key={idx} className="achievement-item">
              <span className="achievement-icon">{achievement.badge}</span>
              <div className="achievement-info">
                <div className="achievement-name">{achievement.reason}</div>
                <div className="achievement-desc">
                  {new Date(achievement.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
          {recentAchievements.length === 0 && (
            <div className="achievement-item">
              <span className="achievement-icon">🎯</span>
              <div className="achievement-info">
                <div className="achievement-name">No achievements yet</div>
                <div className="achievement-desc">Complete eco-actions to earn achievements!</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="leaderboard-section">
        <h3>📊 Leaderboard</h3>
        <div className="leaderboard-list">
          {leaderboard.map((user, index) => (
            <div 
              key={user.name} 
              className={`leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}`}
            >
              <div className="rank">{index + 1}</div>
              <div className="user-avatar">{user.avatar}</div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-level">Level {user.level}</div>
              </div>
              <div className="user-points">{user.points} pts</div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <div className="eco-actions-grid">
          <button 
            className="eco-action-btn"
            onClick={() => performEcoAction('plant_tree')}
          >
            🌳 Plant Tree
          </button>
          <button 
            className="eco-action-btn"
            onClick={() => performEcoAction('use_bike')}
          >
            🚴 Use Bike
          </button>
          <button 
            className="eco-action-btn"
            onClick={() => performEcoAction('recycle')}
          >
            ♻️ Recycle
          </button>
          <button 
            className="eco-action-btn"
            onClick={() => performEcoAction('save_energy')}
          >
            ⚡ Save Energy
          </button>
          <button 
            className="eco-action-btn"
            onClick={() => performEcoAction('use_public_transport')}
          >
            🚌 Public Transport
          </button>
          <button 
            className="eco-action-btn"
            onClick={() => performEcoAction('reduce_water')}
          >
            💧 Conserve Water
          </button>
        </div>
        
        <div className="management-buttons">
          <button 
            className="action-btn primary"
            onClick={() => addPoints(10, 'Bonus points!')}
          >
            +10 Bonus Points
          </button>
          <button 
            className="action-btn secondary"
            onClick={resetProgress}
          >
            Reset Progress
          </button>
        </div>
      </div>

      {showConfetti && (
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: ['#667eea', '#764ba2', '#ff6b6b', '#f39c12', '#9b59b6'][Math.floor(Math.random() * 5)]
            }}></div>
          ))}
        </div>
      )}

      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}
  </div>
);
};

export default EcoPoints;