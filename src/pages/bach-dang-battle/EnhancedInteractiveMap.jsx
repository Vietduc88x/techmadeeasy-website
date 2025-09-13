import React, { useState, useEffect, useRef } from 'react';
import './EnhancedInteractiveMap.css';

const EnhancedInteractiveMap = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [viewMode, setViewMode] = useState('battle'); // 'battle', 'strategy', 'modern'
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  const battlePhases = [
    {
      id: 0,
      title: "The Silent Preparation",
      subtitle: "March 1288 - The Invisible Foundation",
      description: "Under cover of darkness and secrecy, Vietnamese forces plant 3,000 iron-tipped stakes across Bach Dang River. Each stake positioned with mathematical precision, creating an underwater forest of death invisible to enemy eyes.",
      stakesVisible: false,
      mongolFleetPosition: { x: -100, y: 50 },
      vietnameseFleetPosition: { x: 80, y: 60 },
      tideLevel: "high",
      strategicInsight: "Like building your project infrastructure before anyone notices - the foundation of victory is laid in silence.",
      modernParallel: "Building your competitive advantages in stealth mode - developing capabilities, relationships, and systems before competitors realize what you're doing.",
      soundEffect: "preparation"
    },
    {
      id: 1,
      title: "The Dragon Awakens",
      subtitle: "April 9, 1288 - Dawn of Destiny",
      description: "The mighty Mongol armada emerges from the morning mist - 400 warships strong, their red sails blotting out the horizon. Admiral Omar and General Sogetu command this floating fortress, confident in their invincibility.",
      stakesVisible: false,
      mongolFleetPosition: { x: 20, y: 50 },
      vietnameseFleetPosition: { x: 80, y: 60 },
      tideLevel: "high",
      strategicInsight: "When facing overwhelming force, don't panic - execute your prepared strategy with calm precision.",
      modernParallel: "When competitors launch massive initiatives, stick to your strategic plan rather than reactive scrambling.",
      soundEffect: "approach"
    },
    {
      id: 2,
      title: "The Art of Deception",
      subtitle: "Morning - The Perfect Performance",
      description: "Vietnamese junks engage briefly, then flee in apparent terror. The Mongols, drunk on easy victories, pursue eagerly. This isn't cowardice - it's strategic theater performed to perfection.",
      stakesVisible: false,
      mongolFleetPosition: { x: 50, y: 50 },
      vietnameseFleetPosition: { x: 90, y: 65 },
      tideLevel: "high",
      strategicInsight: "Sometimes appearing weak draws your opponent into overconfidence - a powerful negotiation and competitive strategy.",
      modernParallel: "Strategic vulnerability in negotiations - showing weakness in non-critical areas to gain advantages where it matters.",
      soundEffect: "retreat"
    },
    {
      id: 3,
      title: "Nature's Betrayal",
      subtitle: "Midday - When the Sea Reveals Its Secrets",
      description: "The tide recedes with merciless precision. Suddenly, the river reveals its deadly secret - thousands of iron-tipped stakes pierce the hulls of Mongol warships. The invincible fleet becomes helpless prey.",
      stakesVisible: true,
      mongolFleetPosition: { x: 60, y: 50 },
      vietnameseFleetPosition: { x: 85, y: 65 },
      tideLevel: "low",
      strategicInsight: "Perfect timing transforms preparation into decisive advantage - when conditions align, your hidden work becomes visible power.",
      modernParallel: "Market timing - when conditions are right, your prepared capabilities become overwhelming competitive advantages.",
      soundEffect: "trap"
    },
    {
      id: 4,
      title: "The Dragon's Revenge",
      subtitle: "Afternoon - Victory Unleashed",
      description: "Vietnamese forces emerge from hiding like dragons from their lairs. What was once the mighty Mongol navy becomes helpless prey. Complete victory achieved through brilliant strategy, not brute force.",
      stakesVisible: true,
      mongolFleetPosition: { x: 60, y: 50 },
      vietnameseFleetPosition: { x: 65, y: 55 },
      tideLevel: "low",
      strategicInsight: "When the moment comes, execute with overwhelming force and precision - hesitation turns opportunity into regret.",
      modernParallel: "When all conditions align, commit fully and execute flawlessly - half-measures waste perfect opportunities.",
      soundEffect: "victory"
    }
  ];

  const interactiveElements = [
    {
      id: 'stakes',
      name: 'Iron-Tipped Stakes',
      position: { x: 45, y: 48 },
      description: 'Over 3,000 wooden stakes with iron tips, planted underwater across a 3-mile stretch. Each stake was precisely positioned to be invisible at high tide but deadly when exposed.',
      strategicLesson: 'Hidden capabilities that become decisive at crucial moments',
      modernApplication: 'Build systems, relationships, and capabilities that others can\'t see but become game-changers when needed'
    },
    {
      id: 'mongolFleet',
      name: 'Mongol War Fleet',
      position: { x: 55, y: 50 },
      description: 'Over 400 warships commanded by Admiral Omar and General Sogetu. The pride of the Mongol navy, representing centuries of naval dominance.',
      strategicLesson: 'Overconfidence in superior resources can become a weakness',
      modernApplication: 'Don\'t rely solely on resource advantages - competitors can outmaneuver you with better strategy'
    },
    {
      id: 'vietnameseFleet',
      name: 'Vietnamese Naval Force',
      position: { x: 75, y: 60 },
      description: 'Smaller but more agile Vietnamese junks commanded by Tran Hung Dao. Built for speed and maneuverability rather than brute force.',
      strategicLesson: 'Agility and intelligence can overcome raw power',
      modernApplication: 'Small, agile teams with clear strategy can outperform large, resource-heavy competitors'
    },
    {
      id: 'river',
      name: 'Bach Dang River',
      position: { x: 50, y: 55 },
      description: 'The strategic battlefield chosen by Tran Hung Dao. Its tidal patterns and geography became weapons in Vietnamese hands.',
      strategicLesson: 'Environmental mastery becomes your greatest weapon',
      modernApplication: 'Deep knowledge of your market, industry, and context creates unbeatable advantages'
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
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, battlePhases.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (soundEnabled && audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePhaseSelect = (phaseIndex) => {
    setCurrentPhase(phaseIndex);
    setIsPlaying(false);
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
    setShowDetails(true);
  };

  const currentBattlePhase = battlePhases[currentPhase];

  return (
    <div className="enhanced-interactive-map">
      <div className="battle-header">
        <h2>🗺️ Interactive Battle of Bach Dang 1288</h2>
        <p>Experience Tran Hung Dao's strategic masterpiece through multiple perspectives</p>
        
        <div className="view-controls">
          <button 
            className={`view-button ${viewMode === 'battle' ? 'active' : ''}`}
            onClick={() => setViewMode('battle')}
          >
            ⚔️ Battle View
          </button>
          <button 
            className={`view-button ${viewMode === 'strategy' ? 'active' : ''}`}
            onClick={() => setViewMode('strategy')}
          >
            🧠 Strategy View
          </button>
          <button 
            className={`view-button ${viewMode === 'modern' ? 'active' : ''}`}
            onClick={() => setViewMode('modern')}
          >
            💼 Modern Applications
          </button>
        </div>
      </div>

      <div className="battle-container">
        <div className="map-section">
          <div className="battle-map">
            <svg viewBox="0 0 100 100" className="battle-svg">
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
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
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
                  {[...Array(20)].map((_, i) => (
                    <g key={i} className="stake-group" onClick={() => handleElementClick(interactiveElements[0])}>
                      <line
                        x1={25 + (i % 8) * 6}
                        y1={45 + Math.floor(i / 8) * 4}
                        x2={25 + (i % 8) * 6}
                        y2={40 + Math.floor(i / 8) * 4}
                        stroke="#8B4513"
                        strokeWidth="0.8"
                        className="stake animate-stake"
                        style={{ animationDelay: `${i * 0.1}s` }}
                        filter="url(#glow)"
                      />
                      <circle
                        cx={25 + (i % 8) * 6}
                        cy={40 + Math.floor(i / 8) * 4}
                        r="0.4"
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
                className="mongol-fleet interactive-element"
                transform={`translate(${currentBattlePhase.mongolFleetPosition.x}, ${currentBattlePhase.mongolFleetPosition.y})`}
                onClick={() => handleElementClick(interactiveElements[1])}
              >
                {[...Array(8)].map((_, i) => (
                  <g key={i} className="mongol-ship">
                    <ellipse
                      cx={i * 2.5}
                      cy={i * 1.2}
                      rx="2.5"
                      ry="1.2"
                      fill="#8B0000"
                      stroke="#4A0000"
                      strokeWidth="0.3"
                      className={currentPhase >= 3 ? 'ship-trapped' : 'ship-moving'}
                      filter={currentPhase >= 3 ? "url(#glow)" : "none"}
                    />
                    <polygon
                      points={`${i * 2.5 - 0.8},${i * 1.2 - 1.2} ${i * 2.5},${i * 1.2 - 2.5} ${i * 2.5 + 0.8},${i * 1.2 - 1.2}`}
                      fill="#654321"
                      className="ship-sail"
                    />
                    {currentPhase >= 3 && (
                      <circle
                        cx={i * 2.5}
                        cy={i * 1.2}
                        r="0.5"
                        fill="#FF6B35"
                        className="damage-indicator"
                      />
                    )}
                  </g>
                ))}
              </g>

              {/* Vietnamese Fleet */}
              <g 
                className="vietnamese-fleet interactive-element"
                transform={`translate(${currentBattlePhase.vietnameseFleetPosition.x}, ${currentBattlePhase.vietnameseFleetPosition.y})`}
                onClick={() => handleElementClick(interactiveElements[2])}
              >
                {[...Array(5)].map((_, i) => (
                  <g key={i} className="vietnamese-ship">
                    <ellipse
                      cx={i * 2}
                      cy={i * 1}
                      rx="1.8"
                      ry="1"
                      fill="#228B22"
                      stroke="#006400"
                      strokeWidth="0.3"
                      className="ship-moving"
                    />
                    <polygon
                      points={`${i * 2 - 0.5},${i * 1 - 1} ${i * 2},${i * 1 - 2} ${i * 2 + 0.5},${i * 1 - 1}`}
                      fill="#8B4513"
                      className="ship-sail"
                    />
                  </g>
                ))}
              </g>

              {/* Coastlines */}
              <path
                d="M0,0 L100,0 L100,35 Q75,30 50,35 Q25,40 0,35 Z"
                fill="#90EE90"
                stroke="#228B22"
                strokeWidth="0.5"
                className="coastline north interactive-element"
                onClick={() => handleElementClick(interactiveElements[3])}
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
                  {[...Array(12)].map((_, i) => (
                    <circle
                      key={i}
                      cx={50 + (i % 4) * 8 - 12}
                      cy={48 + Math.floor(i / 4) * 3}
                      r="0.8"
                      fill="#FF6B35"
                      className="explosion-effect"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </g>
              )}

              {/* Interactive Hotspots */}
              {interactiveElements.map((element, index) => (
                <circle
                  key={element.id}
                  cx={element.position.x}
                  cy={element.position.y}
                  r="2"
                  fill="rgba(255, 255, 255, 0.8)"
                  stroke="#4A90E2"
                  strokeWidth="2"
                  className="hotspot"
                  onClick={() => handleElementClick(element)}
                >
                  <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite"/>
                </circle>
              ))}
            </svg>

            {/* Enhanced Legend */}
            <div className="enhanced-legend">
              <h4>Interactive Elements</h4>
              <div className="legend-grid">
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
                <div className="legend-item">
                  <div className="legend-color hotspot"></div>
                  <span>Click to explore</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="phase-info">
            <h3>{currentBattlePhase.title}</h3>
            <h4>{currentBattlePhase.subtitle}</h4>
            <p>{currentBattlePhase.description}</p>
            
            {viewMode === 'strategy' && (
              <div className="strategic-insight">
                <h5>🎯 Strategic Insight</h5>
                <p>{currentBattlePhase.strategicInsight}</p>
              </div>
            )}
            
            {viewMode === 'modern' && (
              <div className="modern-application">
                <h5>💼 Modern Application</h5>
                <p>{currentBattlePhase.modernParallel}</p>
              </div>
            )}
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
        <div className="main-controls">
          <button 
            className={`play-button ${isPlaying ? 'playing' : ''}`}
            onClick={handlePlayPause}
          >
            {isPlaying ? '⏸️ Pause Battle' : '▶️ Play Battle'}
          </button>
          
          <button 
            className="sound-button"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>

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

        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentPhase + 1) / battlePhases.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetails && selectedElement && (
        <div className="detail-modal" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowDetails(false)}>×</button>
            <h3>{selectedElement.name}</h3>
            <p>{selectedElement.description}</p>
            <div className="strategic-lesson">
              <h4>Strategic Lesson</h4>
              <p>{selectedElement.strategicLesson}</p>
            </div>
            <div className="modern-application">
              <h4>Modern Application</h4>
              <p>{selectedElement.modernApplication}</p>
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} preload="auto">
        <source src="/battle-sounds.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default EnhancedInteractiveMap;

