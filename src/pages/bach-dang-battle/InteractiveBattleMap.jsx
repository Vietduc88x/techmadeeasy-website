import React, { useState, useEffect } from 'react';
import './InteractiveBattleMap.css';

const InteractiveBattleMap = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStakes, setShowStakes] = useState(false);

  const battlePhases = [
    {
      id: 0,
      title: "Strategic Preparation",
      subtitle: "March 1288 - The Trap is Set",
      description: "Tran Hung Dao orders 3,000 iron-tipped stakes to be planted underwater across Bach Dang River. Each stake positioned with mathematical precision, invisible at high tide.",
      stakesVisible: false,
      mongolFleetPosition: { x: -100, y: 50 },
      vietnameseFleetPosition: { x: 80, y: 60 },
      tideLevel: "high"
    },
    {
      id: 1,
      title: "The Mongol Approach",
      subtitle: "April 9, 1288 - Dawn",
      description: "Admiral Omar's fleet of 400+ warships enters Bach Dang River during high tide. The massive armada appears unstoppable, confident in their naval supremacy.",
      stakesVisible: false,
      mongolFleetPosition: { x: 20, y: 50 },
      vietnameseFleetPosition: { x: 80, y: 60 },
      tideLevel: "high"
    },
    {
      id: 2,
      title: "The Feigned Retreat",
      subtitle: "Morning - The Bait is Taken",
      description: "Vietnamese junks engage briefly then flee in apparent panic. The Mongols, seeing weakness, pursue eagerly into the trap. This is strategic theater at its finest.",
      stakesVisible: false,
      mongolFleetPosition: { x: 50, y: 50 },
      vietnameseFleetPosition: { x: 90, y: 65 },
      tideLevel: "high"
    },
    {
      id: 3,
      title: "The Tide Turns",
      subtitle: "Midday - Nature Becomes Weapon",
      description: "As the tide recedes, the deadly stakes are revealed. The mighty Mongol warships are suddenly impaled and immobilized. The trap is sprung!",
      stakesVisible: true,
      mongolFleetPosition: { x: 60, y: 50 },
      vietnameseFleetPosition: { x: 85, y: 65 },
      tideLevel: "low"
    },
    {
      id: 4,
      title: "The Counterattack",
      subtitle: "Afternoon - Victory Unleashed",
      description: "Vietnamese forces emerge from hiding to attack the trapped fleet. What was once the invincible Mongol navy becomes helpless prey. Complete victory achieved.",
      stakesVisible: true,
      mongolFleetPosition: { x: 60, y: 50 },
      vietnameseFleetPosition: { x: 65, y: 55 },
      tideLevel: "low"
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentPhase(prev => {
          if (prev >= battlePhases.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, battlePhases.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePhaseSelect = (phaseIndex) => {
    setCurrentPhase(phaseIndex);
    setIsPlaying(false);
  };

  const currentBattlePhase = battlePhases[currentPhase];

  return (
    <div className="interactive-battle-map">
      <div className="battle-header">
        <h2>🗺️ Interactive Battle of Bach Dang</h2>
        <p>Experience Tran Hung Dao's strategic masterpiece unfold step by step</p>
      </div>

      <div className="battle-container">
        <div className="map-section">
          <div className="battle-map">
            <svg viewBox="0 0 100 100" className="battle-svg">
              {/* River Background */}
              <defs>
                <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4A90E2" />
                  <stop offset="50%" stopColor="#357ABD" />
                  <stop offset="100%" stopColor="#2E5984" />
                </linearGradient>
                <pattern id="waterPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                  <rect width="4" height="4" fill="#4A90E2" opacity="0.3"/>
                  <path d="M0,2 Q2,0 4,2 Q2,4 0,2" fill="#357ABD" opacity="0.5"/>
                </pattern>
              </defs>

              {/* River */}
              <path
                d="M0,40 Q25,35 50,45 Q75,55 100,50 L100,70 Q75,75 50,65 Q25,55 0,60 Z"
                fill="url(#riverGradient)"
                className="river"
              />

              {/* Tide Level Indicator */}
              <path
                d="M0,40 Q25,35 50,45 Q75,55 100,50 L100,70 Q75,75 50,65 Q25,55 0,60 Z"
                fill="url(#waterPattern)"
                className={`tide-overlay ${currentBattlePhase.tideLevel}`}
                opacity={currentBattlePhase.tideLevel === 'high' ? 0.8 : 0.3}
              />

              {/* Stakes (only visible when tide is low) */}
              {currentBattlePhase.stakesVisible && (
                <g className="stakes-group">
                  {[...Array(15)].map((_, i) => (
                    <g key={i} className="stake-group">
                      <line
                        x1={30 + (i % 5) * 8}
                        y1={45 + Math.floor(i / 5) * 5}
                        x2={30 + (i % 5) * 8}
                        y2={40 + Math.floor(i / 5) * 5}
                        stroke="#8B4513"
                        strokeWidth="0.5"
                        className="stake animate-stake"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                      <circle
                        cx={30 + (i % 5) * 8}
                        cy={40 + Math.floor(i / 5) * 5}
                        r="0.3"
                        fill="#FF4444"
                        className="stake-tip animate-stake"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    </g>
                  ))}
                </g>
              )}

              {/* Mongol Fleet */}
              <g 
                className="mongol-fleet"
                transform={`translate(${currentBattlePhase.mongolFleetPosition.x}, ${currentBattlePhase.mongolFleetPosition.y})`}
              >
                {[...Array(6)].map((_, i) => (
                  <g key={i} className="mongol-ship">
                    <ellipse
                      cx={i * 3}
                      cy={i * 1.5}
                      rx="2"
                      ry="1"
                      fill="#8B0000"
                      stroke="#4A0000"
                      strokeWidth="0.2"
                      className={currentPhase >= 3 ? 'ship-trapped' : 'ship-moving'}
                    />
                    <polygon
                      points={`${i * 3 - 0.5},${i * 1.5 - 1} ${i * 3},${i * 1.5 - 2} ${i * 3 + 0.5},${i * 1.5 - 1}`}
                      fill="#654321"
                      className="ship-sail"
                    />
                  </g>
                ))}
              </g>

              {/* Vietnamese Fleet */}
              <g 
                className="vietnamese-fleet"
                transform={`translate(${currentBattlePhase.vietnameseFleetPosition.x}, ${currentBattlePhase.vietnameseFleetPosition.y})`}
              >
                {[...Array(4)].map((_, i) => (
                  <g key={i} className="vietnamese-ship">
                    <ellipse
                      cx={i * 2}
                      cy={i * 1}
                      rx="1.5"
                      ry="0.8"
                      fill="#228B22"
                      stroke="#006400"
                      strokeWidth="0.2"
                      className="ship-moving"
                    />
                    <polygon
                      points={`${i * 2 - 0.3},${i * 1 - 0.8} ${i * 2},${i * 1 - 1.5} ${i * 2 + 0.3},${i * 1 - 0.8}`}
                      fill="#8B4513"
                      className="ship-sail"
                    />
                  </g>
                ))}
              </g>

              {/* Coastline */}
              <path
                d="M0,0 L100,0 L100,35 Q75,30 50,35 Q25,40 0,35 Z"
                fill="#90EE90"
                stroke="#228B22"
                strokeWidth="0.5"
                className="coastline north"
              />
              <path
                d="M0,75 Q25,70 50,75 Q75,80 100,75 L100,100 L0,100 Z"
                fill="#90EE90"
                stroke="#228B22"
                strokeWidth="0.5"
                className="coastline south"
              />

              {/* Battle Effects */}
              {currentPhase >= 4 && (
                <g className="battle-effects">
                  {[...Array(8)].map((_, i) => (
                    <circle
                      key={i}
                      cx={55 + (i % 3) * 4}
                      cy={48 + Math.floor(i / 3) * 3}
                      r="0.5"
                      fill="#FF6B35"
                      className="explosion-effect"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </g>
              )}
            </svg>

            {/* Legend */}
            <div className="map-legend">
              <div className="legend-item">
                <div className="legend-color mongol"></div>
                <span>Mongol Fleet (400+ ships)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color vietnamese"></div>
                <span>Vietnamese Fleet</span>
              </div>
              <div className="legend-item">
                <div className="legend-color stakes"></div>
                <span>Iron-tipped Stakes (3,000)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="phase-info">
            <h3>{currentBattlePhase.title}</h3>
            <h4>{currentBattlePhase.subtitle}</h4>
            <p>{currentBattlePhase.description}</p>
          </div>

          <div className="battle-stats">
            <div className="stat-item">
              <span className="stat-label">Phase:</span>
              <span className="stat-value">{currentPhase + 1} of {battlePhases.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Tide Level:</span>
              <span className={`stat-value tide-${currentBattlePhase.tideLevel}`}>
                {currentBattlePhase.tideLevel.toUpperCase()}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Stakes Visible:</span>
              <span className={`stat-value ${currentBattlePhase.stakesVisible ? 'visible' : 'hidden'}`}>
                {currentBattlePhase.stakesVisible ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="battle-controls">
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={handlePlayPause}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play Battle'}
        </button>

        <div className="phase-selector">
          {battlePhases.map((phase, index) => (
            <button
              key={phase.id}
              className={`phase-button ${index === currentPhase ? 'active' : ''}`}
              onClick={() => handlePhaseSelect(index)}
              title={phase.title}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="battle-insights">
          <h4>🎯 Strategic Insight</h4>
          <div className="insight-content">
            {currentPhase === 0 && (
              <p><strong>Preparation Mastery:</strong> Like modern project planning, success begins with meticulous preparation. Every stake was positioned with purpose.</p>
            )}
            {currentPhase === 1 && (
              <p><strong>Environmental Intelligence:</strong> Tran Hung Dao used high tide to hide his advantages - like using market conditions to mask your competitive preparations.</p>
            )}
            {currentPhase === 2 && (
              <p><strong>Strategic Deception:</strong> Sometimes appearing weak draws your opponent into overconfidence - a powerful negotiation and competitive strategy.</p>
            )}
            {currentPhase === 3 && (
              <p><strong>Perfect Timing:</strong> The tide's natural rhythm became a weapon. In business, market timing can multiply your strategic advantages.</p>
            )}
            {currentPhase === 4 && (
              <p><strong>Decisive Execution:</strong> When all conditions align, execute with overwhelming force. Hesitation turns opportunity into regret.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveBattleMap;

