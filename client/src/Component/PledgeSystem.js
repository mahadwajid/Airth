import React, { useState, useEffect } from 'react';
import './PledgeSystem.css';

const PledgeSystem = () => {
  // Default pledges data
  const defaultPledges = [
    {
      id: 1,
      title: 'Reduce Plastic Usage',
      description: 'Commit to reducing single-use plastic by 50%',
      participants: 1250,
      goal: 2000,
      category: 'Waste Reduction',
      icon: '♻️',
      joined: false,
      progress: 62.5,
      activities: [
        { name: 'Used reusable water bottle', points: 5 },
        { name: 'Brought own shopping bag', points: 3 },
        { name: 'Avoided plastic packaging', points: 4 },
        { name: 'Used metal straw', points: 2 }
      ]
    },
    {
      id: 2,
      title: 'Plant Trees Challenge',
      description: 'Plant 10,000 trees in your community',
      participants: 890,
      goal: 1500,
      category: 'Greenery',
      icon: '🌳',
      joined: false,
      progress: 59.3,
      activities: [
        { name: 'Planted a tree', points: 20 },
        { name: 'Watered existing trees', points: 5 },
        { name: 'Donated to tree planting', points: 10 },
        { name: 'Organized tree planting event', points: 30 }
      ]
    },
    {
      id: 3,
      title: 'Energy Conservation',
      description: 'Reduce household energy consumption by 30%',
      participants: 2100,
      goal: 3000,
      category: 'Energy',
      icon: '⚡',
      joined: false,
      progress: 70.0,
      activities: [
        { name: 'Turned off unused lights', points: 3 },
        { name: 'Used energy-efficient bulbs', points: 8 },
        { name: 'Unplugged electronics', points: 4 },
        { name: 'Used natural light', points: 2 }
      ]
    },
    {
      id: 4,
      title: 'Water Conservation',
      description: 'Save 1000 liters of water per month',
      participants: 750,
      goal: 1200,
      category: 'Water',
      icon: '💧',
      joined: false,
      progress: 62.5,
      activities: [
        { name: 'Fixed leaky faucet', points: 15 },
        { name: 'Took shorter shower', points: 5 },
        { name: 'Used water-saving devices', points: 10 },
        { name: 'Collected rainwater', points: 20 }
      ]
    }
  ];

  // Load initial data from localStorage or use defaults with proper error handling
  const [pledges, setPledges] = useState(() => {
    try {
      const saved = localStorage.getItem('pledges');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that parsed data is an array
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading pledges from localStorage:', error);
    }
    return defaultPledges;
  });
  
  const [userPledges, setUserPledges] = useState(() => {
    try {
      const saved = localStorage.getItem('userPledges');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that parsed data is an array
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading userPledges from localStorage:', error);
    }
    return [];
  });

  const [userActivities, setUserActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('userActivities');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that parsed data is an object
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading userActivities from localStorage:', error);
    }
    return {};
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedPledge, setSelectedPledge] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivityPledge, setSelectedActivityPledge] = useState(null);

  // Save data to localStorage whenever it changes with error handling
  useEffect(() => {
    try {
      localStorage.setItem('pledges', JSON.stringify(pledges));
    } catch (error) {
      console.error('Error saving pledges to localStorage:', error);
    }
  }, [pledges]);

  useEffect(() => {
    try {
      localStorage.setItem('userPledges', JSON.stringify(userPledges));
    } catch (error) {
      console.error('Error saving userPledges to localStorage:', error);
    }
  }, [userPledges]);

  useEffect(() => {
    try {
      localStorage.setItem('userActivities', JSON.stringify(userActivities));
    } catch (error) {
      console.error('Error saving userActivities to localStorage:', error);
    }
  }, [userActivities]);

  const joinPledge = (pledgeId) => {
    const updatedPledges = pledges.map(pledge => {
      if (pledge.id === pledgeId) {
        const newParticipants = pledge.participants + 1;
        const newProgress = (newParticipants / pledge.goal) * 100;
        return {
          ...pledge,
          participants: newParticipants,
          progress: Math.min(newProgress, 100),
          joined: true
        };
      }
      return pledge;
    });

    setPledges(updatedPledges);
    
    const pledge = pledges.find(p => p.id === pledgeId);
    if (pledge) {
      setUserPledges([...userPledges, { 
        ...pledge, 
        joinedAt: new Date().toISOString(),
        personalProgress: 0,
        personalGoal: 100
      }]);
      
      // Initialize user activities for this pledge
      setUserActivities({
        ...userActivities,
        [pledgeId]: []
      });
      
      setNotificationMessage(`🎉 Joined "${pledge.title}" pledge!`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const leavePledge = (pledgeId) => {
    const updatedPledges = pledges.map(pledge => {
      if (pledge.id === pledgeId) {
        const newParticipants = Math.max(pledge.participants - 1, 0);
        const newProgress = (newParticipants / pledge.goal) * 100;
        return {
          ...pledge,
          participants: newParticipants,
          progress: Math.max(newProgress, 0),
          joined: false
        };
      }
      return pledge;
    });

    setPledges(updatedPledges);
    setUserPledges(userPledges.filter(p => p.id !== pledgeId));
    
    // Remove user activities for this pledge
    const updatedActivities = { ...userActivities };
    delete updatedActivities[pledgeId];
    setUserActivities(updatedActivities);
    
    const pledge = pledges.find(p => p.id === pledgeId);
    if (pledge) {
      setNotificationMessage(`👋 Left "${pledge.title}" pledge`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const logActivity = (pledgeId, activity) => {
    const newActivity = {
      id: Date.now(),
      name: activity.name,
      points: activity.points,
      timestamp: new Date().toISOString(),
      pledgeId: pledgeId
    };

    // Add activity to user's activity log
    const updatedActivities = {
      ...userActivities,
      [pledgeId]: [...(userActivities[pledgeId] || []), newActivity]
    };
    setUserActivities(updatedActivities);

    // Update user's personal progress
    const userPledge = userPledges.find(p => p.id === pledgeId);
    if (userPledge) {
      const totalPoints = (userActivities[pledgeId] || []).reduce((sum, act) => sum + act.points, 0) + activity.points;
      const newPersonalProgress = Math.min((totalPoints / userPledge.personalGoal) * 100, 100);
      
      const updatedUserPledges = userPledges.map(p => 
        p.id === pledgeId 
          ? { ...p, personalProgress: newPersonalProgress }
          : p
      );
      setUserPledges(updatedUserPledges);
    }

    setNotificationMessage(`✅ Logged: ${activity.name} (+${activity.points} points)`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const openPledgeDetails = (pledge) => {
    setSelectedPledge(pledge);
    setShowModal(true);
  };

  const openActivityModal = (pledge) => {
    // Find the complete pledge data including activities
    const completePledge = pledges.find(p => p.id === pledge.id) || pledge;
    console.log('Opening activity modal for pledge:', completePledge);
    console.log('Activities:', completePledge.activities);
    setSelectedActivityPledge(completePledge);
    setShowActivityModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPledge(null);
  };

  const closeActivityModal = () => {
    setShowActivityModal(false);
    setSelectedActivityPledge(null);
  };

  const resetPledgesData = () => {
    // Clear localStorage and reset to defaults
    localStorage.removeItem('pledges');
    localStorage.removeItem('userPledges');
    localStorage.removeItem('userActivities');
    setPledges(defaultPledges);
    setUserPledges([]);
    setUserActivities({});
    setNotificationMessage('🔄 Pledges data reset to defaults!');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const createNewPledge = () => {
    const newPledge = {
      id: Date.now(),
      title: 'My Custom Pledge',
      description: 'Create your own environmental pledge',
      participants: 1,
      goal: 100,
      category: 'Custom',
      icon: '🌟',
      joined: true,
      progress: 1.0,
      activities: [
        { name: 'Custom activity 1', points: 10 },
        { name: 'Custom activity 2', points: 15 }
      ]
    };

    setPledges([...pledges, newPledge]);
    setUserPledges([...userPledges, { 
      ...newPledge, 
      joinedAt: new Date().toISOString(),
      personalProgress: 0,
      personalGoal: 100
    }]);
    
    setUserActivities({
      ...userActivities,
      [newPledge.id]: []
    });
    
    setNotificationMessage('🌟 Created new custom pledge!');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 60) return '#f59e0b';
    if (progress >= 40) return '#f97316';
    return '#ef4444';
  };

  const getUserPledgeProgress = (pledgeId) => {
    const userPledge = userPledges.find(p => p.id === pledgeId);
    return userPledge ? userPledge.personalProgress : 0;
  };

  const getUserActivities = (pledgeId) => {
    return userActivities[pledgeId] || [];
  };

  // Ensure pledges is always an array
  if (!Array.isArray(pledges)) {
    console.error('Pledges is not an array, resetting to defaults');
    setPledges(defaultPledges);
    return <div>Loading pledges...</div>;
  }

  // Ensure userPledges is always an array
  if (!Array.isArray(userPledges)) {
    console.error('UserPledges is not an array, resetting to empty array');
    setUserPledges([]);
    return <div>Loading user pledges...</div>;
  }

  return (
  <div className="card pledge-card">
      <div className="pledge-header">
        <h2>🤝 Community Pledge System</h2>
        <div className="pledge-header-buttons">
          <button className="create-pledge-btn" onClick={createNewPledge}>
            + Create Pledge
          </button>
          <button className="reset-pledges-btn" onClick={resetPledgesData}>
            🔄 Reset
          </button>
        </div>
      </div>

      <p>Join environmental pledges and track community progress!</p>

      <div className="pledges-grid">
        {pledges.map((pledge) => {
          const userProgress = getUserPledgeProgress(pledge.id);
          const userPledge = userPledges.find(p => p.id === pledge.id);
          const isJoined = userPledge !== undefined;
          
          return (
            <div key={pledge.id} className="pledge-item">
              <div className="pledge-icon">{pledge.icon}</div>
              <div className="pledge-content">
                <h3>{pledge.title}</h3>
                <p>{pledge.description}</p>
                <div className="pledge-category">{pledge.category}</div>
                
                <div className="pledge-stats">
                  <div className="participants">
                    <span className="stat-number">{pledge.participants}</span>
                    <span className="stat-label">participants</span>
                  </div>
                  <div className="goal">
                    <span className="stat-number">{pledge.goal}</span>
                    <span className="stat-label">goal</span>
                  </div>
                </div>

                <div className="pledge-progress">
                  <div className="progress-info">
                    <span>Community: {pledge.progress.toFixed(1)}%</span>
                    <span>{pledge.participants}/{pledge.goal}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ 
                        width: `${pledge.progress}%`,
                        backgroundColor: getProgressColor(pledge.progress)
                      }}
                    ></div>
                  </div>
                </div>

                {isJoined && (
                  <div className="personal-progress">
                    <div className="progress-info">
                      <span>Your Progress: {userProgress.toFixed(1)}%</span>
                      <span>{Math.round(userProgress)}/100</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress personal" 
                        style={{ 
                          width: `${userProgress}%`,
                          backgroundColor: getProgressColor(userProgress)
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="pledge-actions">
                  <button 
                    className="pledge-details-btn"
                    onClick={() => openPledgeDetails(pledge)}
                  >
                    Details
                  </button>
                  {isJoined ? (
                    <>
                      <button 
                        className="log-activity-btn"
                        onClick={() => openActivityModal(pledge)}
                      >
                        Log Activity
                      </button>
                      <button 
                        className="leave-pledge-btn"
                        onClick={() => leavePledge(pledge.id)}
                      >
                        Leave
                      </button>
                    </>
                  ) : (
                    <button 
                      className="join-pledge-btn"
                      onClick={() => joinPledge(pledge.id)}
                    >
                      Join
                    </button>
                  )}
      </div>
    </div>
  </div>
);
        })}
      </div>

      {userPledges.length > 0 && (
        <div className="user-pledges-section">
          <h3>🎯 My Pledges ({userPledges.length})</h3>
          <div className="user-pledges-list">
            {userPledges.map((pledge, index) => (
              <div key={index} className="user-pledge-item">
                <span className="user-pledge-icon">{pledge.icon}</span>
                <div className="user-pledge-info">
                  <div className="user-pledge-title">{pledge.title}</div>
                  <div className="user-pledge-date">
                    Joined: {new Date(pledge.joinedAt).toLocaleDateString()}
                  </div>
                  <div className="user-pledge-progress-bar">
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ 
                          width: `${pledge.personalProgress}%`,
                          backgroundColor: getProgressColor(pledge.personalProgress)
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">{pledge.personalProgress.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="user-pledge-actions">
                  <button 
                    className="log-activity-btn small"
                    onClick={() => openActivityModal(pledge)}
                  >
                    Log
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for pledge details */}
      {showModal && selectedPledge && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedPledge.icon} {selectedPledge.title}</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedPledge.description}</p>
              <div className="modal-stats">
                <div className="modal-stat">
                  <span className="modal-stat-number">{selectedPledge.participants}</span>
                  <span className="modal-stat-label">Current Participants</span>
                </div>
                <div className="modal-stat">
                  <span className="modal-stat-number">{selectedPledge.goal}</span>
                  <span className="modal-stat-label">Goal</span>
                </div>
                <div className="modal-stat">
                  <span className="modal-stat-number">{selectedPledge.progress.toFixed(1)}%</span>
                  <span className="modal-stat-label">Progress</span>
                </div>
              </div>
              <div className="modal-progress">
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ 
                      width: `${selectedPledge.progress}%`,
                      backgroundColor: getProgressColor(selectedPledge.progress)
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {userPledges.find(p => p.id === selectedPledge.id) ? (
                <button 
                  className="leave-pledge-btn"
                  onClick={() => {
                    leavePledge(selectedPledge.id);
                    closeModal();
                  }}
                >
                  Leave Pledge
                </button>
              ) : (
                <button 
                  className="join-pledge-btn"
                  onClick={() => {
                    joinPledge(selectedPledge.id);
                    closeModal();
                  }}
                >
                  Join Pledge
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal for logging activities */}
      {showActivityModal && selectedActivityPledge && (
        <div className="modal-overlay" onClick={closeActivityModal}>
          <div className="modal-content activity-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📝 Log Activity - {selectedActivityPledge.title}</h3>
              <button className="modal-close" onClick={closeActivityModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="activity-list">
                <h4>Available Activities:</h4>
                {selectedActivityPledge.activities && selectedActivityPledge.activities.length > 0 ? (
                  selectedActivityPledge.activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-info">
                        <span className="activity-name">{activity.name}</span>
                        <span className="activity-points">+{activity.points} points</span>
                      </div>
                      <button 
                        className="log-activity-btn"
                        onClick={() => {
                          logActivity(selectedActivityPledge.id, activity);
                          closeActivityModal();
                        }}
                      >
                        Log
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-activities">
                    No activities available for this pledge.
                  </div>
                )}
              </div>
              
              <div className="recent-activities">
                <h4>Your Recent Activities:</h4>
                {getUserActivities(selectedActivityPledge.id).slice(-5).reverse().map((activity, index) => (
                  <div key={activity.id} className="recent-activity-item">
                    <span className="activity-name">{activity.name}</span>
                    <span className="activity-date">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </span>
                    <span className="activity-points">+{activity.points}</span>
                  </div>
                ))}
                {getUserActivities(selectedActivityPledge.id).length === 0 && (
                  <div className="no-activities">
                    No activities logged yet. Start by logging your first activity!
                  </div>
                )}
              </div>
            </div>
          </div>
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

export default PledgeSystem;