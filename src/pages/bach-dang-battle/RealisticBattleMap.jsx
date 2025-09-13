import React, { useState, useEffect } from 'react';
import './RealisticBattleMap.css';

const RealisticBattleMap = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const battlePhases = [
    {
      id: 0,
      title: "Preparation Phase",
      subtitle: "March 1288 - The Silent Foundation",
      description: "Vietnamese forces secretly plant over 3,000 iron-tipped wooden stakes across Bach Dang River. Each stake positioned with mathematical precision, invisible at high tide but deadly when exposed.",
      stakesVisible: false,
      mongolFleetPosition: { x: -15, y: 45 },
      vietnameseFleetPosition: { x: 85, y: 55 },
      tideLevel: "high",
      timeOfDay: "night"
    },
    {
      id: 1,
      title: "Yuan Fleet Arrival",
      subtitle: "April 9, 1288 - The Dragon Approaches",
      description: "The mighty Mongol armada enters Bach Dang River - over 400 warships commanded by Admiral Omar and General Sogetu, confident in their naval supremacy.",
      stakesVisible: false,
      mongolFleetPosition: { x: 15, y: 45 },
      vietnameseFleetPosition: { x: 85, y: 55 },
      tideLevel: "high",
      timeOfDay: "morning"
    },
    {
      id: 2,
      title: "The Deception",
      subtitle: "Morning - Strategic Theater",
      description: "Vietnamese junks engage briefly then flee in apparent panic. The Mongols, seeing cowardice, pursue eagerly into the trap. This isn't retreat - it's strategic theater.",
      stakesVisible: false,
      mongolFleetPosition: { x: 45, y: 45 },
      vietnameseFleetPosition: { x: 75, y: 55 },
      tideLevel: "high",
      timeOfDay: "morning"
    },
    {
      id: 3,
      title: "The Trap Springs",
      subtitle: "Midday - Nature's Betrayal",
      description: "The tide recedes with merciless precision. Suddenly, thousands of iron-tipped stakes pierce Mongol hulls. The invincible fleet becomes helpless prey.",
      stakesVisible: true,
      mongolFleetPosition: { x: 55, y: 45 },
      vietnameseFleetPosition: { x: 75, y: 55 },
      tideLevel: "low",
      timeOfDay: "midday"
    },
    {
      id: 4,
      title: "Complete Victory",
      subtitle: "Afternoon - The Dragon's Revenge",
      description: "Vietnamese forces emerge from hiding like dragons from their lairs. The mighty Mongol navy is destroyed. Victory achieved through brilliant strategy, not brute force.",
      stakesVisible: true,
      mongolFleetPosition: { x: 55, y: 45 },
      vietnameseFleetPosition: { x: 65, y: 50 },
      tideLevel: "low",
      timeOfDay: "afternoon"
    }
  ];

  const interactiveElements = [
    {
      id: 'stakes',
      name: 'Iron-Tipped Stakes',
      position: { x: 50, y: 45 },
      description: 'Over 3,000 wooden stakes with iron tips, planted underwater across a 3-mile stretch of Bach Dang River.',
      strategicLesson: 'Hidden capabilities that become decisive at crucial moments',
      details: 'Each stake was 3-4 meters long, sharpened to razor points, and reinforced with iron tips. Planted at precise depths to remain invisible during high tide but deadly during low tide.'
    },
    {
      id: 'mongolFleet',
      name: 'Mongol War Fleet',
      position: { x: 55, y: 45 },
      description: 'Over 400 warships commanded by Admiral Omar and General Sogetu.',
      strategicLesson: 'Superior resources can become weaknesses without proper strategy',
      details: 'Massive Chinese-style war junks with multiple decks, armed with catapults and crossbows. Each ship carried 50-100 soldiers.'
    },
    {
      id: 'vietnameseFleet',
      name: 'Vietnamese Naval Force',
      position: { x: 70, y: 55 },
      description: 'Smaller but more agile Vietnamese junks commanded by Tran Hung Dao.',
      strategicLesson: 'Agility and intelligence can overcome raw power',
      details: 'Traditional Vietnamese river boats, shallow-draft and highly maneuverable. Perfect for hit-and-run tactics in familiar waters.'
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

  // Generate realistic river path
  const generateRiverPath = () => {
    return "M0,35 Q15,30 30,35 Q45,40 60,35 Q75,30 90,35 Q100,40 110,35 L110,55 Q100,60 90,55 Q75,50 60,55 Q45,60 30,55 Q15,50 0,55 Z";
  };

  // Generate realistic stakes pattern
  const generateStakes = () => {
    const stakes = [];
    for (let i = 0; i < 25; i++) {
      const x = 25 + (i % 8) * 6 + Math.random() * 2;
      const y = 40 + Math.floor(i / 8) * 4 + Math.random() * 2;
      stakes.push({ x, y, id: i });
    }
    return stakes;
  };

  const stakes = generateStakes();

  return (
    <div className="realistic-battle-map">
      <div className="battle-header">
        <h2>⚔️ Battle of Bach Dang 1288 - Interactive Historical Recreation</h2>
        <p>Experience Tran Hung Dao's legendary victory through realistic battle visualization</p>
      </div>

      <div className="battle-container">
        <div className="battle-map-container">
          <svg viewBox="0 0 100 80" className="realistic-battle-svg">
            <defs>
              {/* River gradient based on time of day */}
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentBattlePhase.timeOfDay === 'night' ? '#1a365d' : '#2563eb'} />
                <stop offset="50%" stopColor={currentBattlePhase.timeOfDay === 'night' ? '#2d3748' : '#3b82f6'} />
                <stop offset="100%" stopColor={currentBattlePhase.timeOfDay === 'night' ? '#4a5568' : '#60a5fa'} />
              </linearGradient>

              {/* Water texture */}
              <pattern id="waterTexture" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="url(#riverGradient)" />
                <path d="M0,2 Q2,1 4,2" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" fill="none" />
              </pattern>

              {/* Glow effects */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Explosion effect */}
              <filter id="explosion">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feColorMatrix in="coloredBlur" values="1 0 0 0 0  0 0.5 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Sky gradient based on time of day */}
            <rect width="100" height="30" 
                  fill={currentBattlePhase.timeOfDay === 'night' ? 'url(#nightSky)' : 
                        currentBattlePhase.timeOfDay === 'morning' ? 'url(#morningSky)' : 
                        currentBattlePhase.timeOfDay === 'midday' ? 'url(#middaySky)' : 'url(#afternoonSky)'} />

            {/* Mountains in background */}
            <path d="M0,25 L10,15 L20,20 L30,10 L40,18 L50,12 L60,16 L70,8 L80,14 L90,10 L100,18 L100,30 L0,30 Z" 
                  fill="#4a5568" opacity="0.6" />

            {/* Bach Dang River with realistic curves */}
            <path d={generateRiverPath()} 
                  fill="url(#waterTexture)" 
                  className="river-main" />

            {/* River banks with vegetation */}
            <path d="M0,30 Q20,28 40,32 Q60,28 80,32 Q90,30 100,32 L100,35 Q90,33 80,35 Q60,31 40,35 Q20,31 0,35 Z" 
                  fill="#22c55e" className="river-bank north" />
            <path d="M0,55 Q20,57 40,53 Q60,57 80,53 Q90,55 100,53 L100,60 Q90,62 80,58 Q60,62 40,58 Q20,62 0,58 Z" 
                  fill="#22c55e" className="river-bank south" />

            {/* Trees along riverbank */}
            {[...Array(12)].map((_, i) => (
              <g key={i} className="tree-group">
                <circle cx={8 + i * 8} cy={32} r="1.5" fill="#16a34a" />
                <rect x={7.5 + i * 8} y={32} width="1" height="3" fill="#92400e" />
              </g>
            ))}

            {/* Stakes (only visible when tide is low) */}
            {currentBattlePhase.stakesVisible && (
              <g className="stakes-group">
                {stakes.map((stake, i) => (
                  <g key={stake.id} className="stake-group" onClick={() => handleElementClick(interactiveElements[0])}>
                    <line
                      x1={stake.x}
                      y1={stake.y + 3}
                      x2={stake.x}
                      y2={stake.y - 2}
                      stroke="#8b4513"
                      strokeWidth="0.8"
                      className="stake animate-stake"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    />
                    <circle
                      cx={stake.x}
                      cy={stake.y - 2}
                      r="0.4"
                      fill="#dc2626"
                      className="stake-tip animate-stake"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    />
                    {/* Splash effect when stakes appear */}
                    {currentPhase === 3 && (
                      <circle
                        cx={stake.x}
                        cy={stake.y}
                        r="2"
                        fill="rgba(59, 130, 246, 0.3)"
                        className="splash-effect"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      />
                    )}
                  </g>
                ))}
              </g>
            )}

            {/* Mongol Fleet - Detailed war junks */}
            <g className="mongol-fleet" 
               transform={`translate(${currentBattlePhase.mongolFleetPosition.x}, ${currentBattlePhase.mongolFleetPosition.y})`}
               onClick={() => handleElementClick(interactiveElements[1])}>
              {[...Array(8)].map((_, i) => (
                <g key={i} className="mongol-ship">
                  {/* Ship hull */}
                  <ellipse
                    cx={i * 2.5}
                    cy={i * 1.2}
                    rx="3.5"
                    ry="1.8"
                    fill="#8b0000"
                    stroke="#4a0000"
                    strokeWidth="0.3"
                    className={currentPhase >= 3 ? 'ship-trapped' : 'ship-moving'}
                  />
                  {/* Ship deck */}
                  <ellipse
                    cx={i * 2.5}
                    cy={i * 1.2 - 0.3}
                    rx="2.8"
                    ry="1.2"
                    fill="#a52a2a"
                    opacity="0.8"
                  />
                  {/* Main sail */}
                  <polygon
                    points={`${i * 2.5 - 1.5},${i * 1.2 - 1.8} ${i * 2.5},${i * 1.2 - 4} ${i * 2.5 + 1.5},${i * 1.2 - 1.8}`}
                    fill="#654321"
                    className="ship-sail"
                  />
                  {/* Mast */}
                  <line
                    x1={i * 2.5}
                    y1={i * 1.2 - 1.8}
                    x2={i * 2.5}
                    y2={i * 1.2 - 4}
                    stroke="#8b4513"
                    strokeWidth="0.3"
                  />
                  {/* Dragon head (Mongol style) */}
                  <path
                    d={`M${i * 2.5 + 3.5},${i * 1.2} Q${i * 2.5 + 4.5},${i * 1.2 - 0.5} ${i * 2.5 + 4},${i * 1.2 + 0.5}`}
                    fill="#8b0000"
                    stroke="#4a0000"
                    strokeWidth="0.2"
                  />
                  {/* Damage effects when trapped */}
                  {currentPhase >= 3 && (
                    <>
                      <circle
                        cx={i * 2.5}
                        cy={i * 1.2}
                        r="1"
                        fill="#ff4444"
                        opacity="0.6"
                        className="damage-effect"
                      />
                      <path
                        d={`M${i * 2.5 - 1},${i * 1.2} L${i * 2.5 + 1},${i * 1.2 - 2}`}
                        stroke="#ff4444"
                        strokeWidth="0.5"
                        className="crack-effect"
                      />
                    </>
                  )}
                </g>
              ))}
            </g>

            {/* Vietnamese Fleet - Traditional junks */}
            <g className="vietnamese-fleet" 
               transform={`translate(${currentBattlePhase.vietnameseFleetPosition.x}, ${currentBattlePhase.vietnameseFleetPosition.y})`}
               onClick={() => handleElementClick(interactiveElements[2])}>
              {[...Array(6)].map((_, i) => (
                <g key={i} className="vietnamese-ship">
                  {/* Ship hull - more streamlined */}
                  <ellipse
                    cx={i * 2}
                    cy={i * 1}
                    rx="2.5"
                    ry="1.2"
                    fill="#228b22"
                    stroke="#006400"
                    strokeWidth="0.3"
                    className="ship-moving"
                  />
                  {/* Ship deck */}
                  <ellipse
                    cx={i * 2}
                    cy={i * 1 - 0.2}
                    rx="2"
                    ry="0.8"
                    fill="#32cd32"
                    opacity="0.8"
                  />
                  {/* Traditional Vietnamese sail */}
                  <polygon
                    points={`${i * 2 - 1},${i * 1 - 1.5} ${i * 2},${i * 1 - 3} ${i * 2 + 1},${i * 1 - 1.5}`}
                    fill="#daa520"
                    className="ship-sail"
                  />
                  {/* Mast */}
                  <line
                    x1={i * 2}
                    y1={i * 1 - 1.5}
                    x2={i * 2}
                    y2={i * 1 - 3}
                    stroke="#8b4513"
                    strokeWidth="0.2"
                  />
                  {/* Vietnamese flag */}
                  <rect
                    x={i * 2 - 0.5}
                    y={i * 1 - 3.2}
                    width="1"
                    height="0.6"
                    fill="#dc143c"
                  />
                  {/* Wake effect */}
                  <path
                    d={`M${i * 2 - 2.5},${i * 1} Q${i * 2 - 3.5},${i * 1 + 0.5} ${i * 2 - 4},${i * 1}`}
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="0.3"
                    fill="none"
                    className="wake-effect"
                  />
                </g>
              ))}
            </g>

            {/* Interactive Hotspots */}
            {interactiveElements.map((element) => (
              <circle
                key={element.id}
                cx={element.position.x}
                cy={element.position.y}
                r="1.5"
                fill="rgba(255, 255, 255, 0.9)"
                stroke="#3b82f6"
                strokeWidth="2"
                className="hotspot"
                onClick={() => handleElementClick(element)}
              >
                <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite"/>
              </circle>
            ))}

            {/* Tide level indicator */}
            <g className="tide-indicator">
              <rect x="2" y="65" width="15" height="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="0.5" rx="2" />
              <text x="9.5" y="69" textAnchor="middle" fontSize="2" fill="#1e40af">
                Tide: {currentBattlePhase.tideLevel.toUpperCase()}
              </text>
              <rect 
                x="3" 
                y="70" 
                width={currentBattlePhase.tideLevel === 'high' ? "13" : "6"} 
                height="2" 
                fill="#3b82f6" 
                className="tide-level-bar"
              />
            </g>
          </svg>

          <div className="battle-legend">
            <h4>Legend</h4>
            <div className="legend-item">
              <div className="legend-color mongol"></div>
              <span>Mongol War Fleet (400+ ships)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color vietnamese"></div>
              <span>Vietnamese Naval Force</span>
            </div>
            <div className="legend-item">
              <div className="legend-color stakes"></div>
              <span>Iron-tipped Stakes (3,000+)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color river"></div>
              <span>Bach Dang River</span>
            </div>
          </div>
        </div>

        <div className="battle-info">
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
              <span className="stat-label">Time:</span>
              <span className="stat-value">{currentBattlePhase.timeOfDay}</span>
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
          {isPlaying ? '⏸️ Pause Battle' : '▶️ Play Battle'}
        </button>

        <button 
          className={`sound-button ${soundEnabled ? 'enabled' : 'disabled'}`}
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? '🔊' : '🔇'}
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

        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentPhase + 1) / battlePhases.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Enhanced Detail Modal */}
      {showDetails && selectedElement && (
        <div className="detail-modal" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowDetails(false)}>×</button>
            <h3>{selectedElement.name}</h3>
            <p className="description">{selectedElement.description}</p>
            <div className="details-section">
              <h4>Historical Details</h4>
              <p>{selectedElement.details}</p>
            </div>
            <div className="strategic-lesson">
              <h4>Strategic Lesson</h4>
              <p>{selectedElement.strategicLesson}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealisticBattleMap;

