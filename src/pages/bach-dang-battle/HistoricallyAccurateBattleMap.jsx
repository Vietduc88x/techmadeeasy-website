import React, { useState, useEffect } from 'react';
import './HistoricallyAccurateBattleMap.css';

const HistoricallyAccurateBattleMap = () => {
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
      description: "Vietnamese forces secretly plant over 3,000 iron-tipped wooden stakes across Bach Dang River in strategic rows, invisible at high tide but deadly when exposed.",
      stakesVisible: false,
      mongolFleetPosition: { x: 5, y: 30 },
      vietnameseFleetPosition: { x: 85, y: 45 },
      tideLevel: "high",
      timeOfDay: "night",
      mongolFormation: "approaching"
    },
    {
      id: 1,
      title: "Yuan Fleet Arrival",
      subtitle: "April 9, 1288 - The Dragon Enters",
      description: "The massive Mongol armada enters Bach Dang River in battle formation - over 400 warships in organized columns, confident in their overwhelming naval superiority.",
      stakesVisible: false,
      mongolFleetPosition: { x: 25, y: 30 },
      vietnameseFleetPosition: { x: 75, y: 45 },
      tideLevel: "high",
      timeOfDay: "morning",
      mongolFormation: "battle_formation"
    },
    {
      id: 2,
      title: "The Deception",
      subtitle: "Morning - Strategic Theater",
      description: "Vietnamese junks engage briefly then flee upstream in apparent panic. The Mongols, seeing weakness, pursue eagerly into the narrowing river channels.",
      stakesVisible: false,
      mongolFleetPosition: { x: 45, y: 35 },
      vietnameseFleetPosition: { x: 65, y: 50 },
      tideLevel: "high",
      timeOfDay: "morning",
      mongolFormation: "pursuing"
    },
    {
      id: 3,
      title: "The Trap Springs",
      subtitle: "Midday - Nature's Betrayal",
      description: "The tide recedes with deadly precision. Thousands of iron-tipped stakes pierce through Mongol hulls in perfect rows. The mighty fleet becomes helpless prey.",
      stakesVisible: true,
      mongolFleetPosition: { x: 50, y: 35 },
      vietnameseFleetPosition: { x: 65, y: 50 },
      tideLevel: "low",
      timeOfDay: "midday",
      mongolFormation: "trapped"
    },
    {
      id: 4,
      title: "Complete Victory",
      subtitle: "Afternoon - The Dragon's Revenge",
      description: "Vietnamese forces emerge from all directions like dragons from their lairs. The trapped Mongol navy is systematically destroyed. Victory through brilliant strategy.",
      stakesVisible: true,
      mongolFleetPosition: { x: 50, y: 35 },
      vietnameseFleetPosition: { x: 60, y: 45 },
      tideLevel: "low",
      timeOfDay: "afternoon",
      mongolFormation: "destroyed"
    }
  ];

  const interactiveElements = [
    {
      id: 'stakes',
      name: 'Iron-Tipped Stakes Formation',
      position: { x: 50, y: 40 },
      description: 'Over 3,000 wooden stakes with iron tips, planted in strategic rows across the river channel.',
      strategicLesson: 'Hidden preparation and environmental advantages can overcome superior numbers',
      details: 'Stakes were planted in multiple rows, each 3-4 meters long with razor-sharp iron tips. Positioned at precise depths to remain invisible during high tide but deadly during low tide.'
    },
    {
      id: 'mongolFleet',
      name: 'Mongol War Armada',
      position: { x: 50, y: 35 },
      description: 'Over 400 warships in organized battle formation, commanded by Admiral Omar and General Sogetu.',
      strategicLesson: 'Rigid formations can become vulnerabilities in unfamiliar terrain',
      details: 'Massive Chinese-style war junks arranged in columns. Each ship carried 50-100 soldiers with catapults, crossbows, and siege equipment.'
    },
    {
      id: 'vietnameseFleet',
      name: 'Vietnamese Naval Force',
      position: { x: 65, y: 50 },
      description: 'Agile Vietnamese junks using hit-and-run tactics, commanded by Tran Hung Dao.',
      strategicLesson: 'Mobility and local knowledge can defeat superior firepower',
      details: 'Traditional Vietnamese river boats, shallow-draft and highly maneuverable. Perfect for guerrilla naval tactics in familiar waters.'
    },
    {
      id: 'commanders',
      name: 'Battle Commanders',
      position: { x: 15, y: 20 },
      description: 'Key leaders: Tran Hung Dao (Vietnamese) vs Omar & Sogetu (Mongol)',
      strategicLesson: 'Leadership vision and strategic thinking determine victory',
      details: 'Tran Hung Dao: Master strategist who understood that true strength lies in preparation and timing. Omar & Sogetu: Experienced but overconfident commanders.'
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

  // Generate historically accurate river path based on video
  const generateBachDangRiver = () => {
    return "M0,25 Q20,20 35,30 Q50,40 65,35 Q80,25 100,30 L100,50 Q85,55 70,50 Q55,45 40,50 Q25,55 10,50 Q5,45 0,40 Z";
  };

  // Generate small islands and sandbars
  const generateIslands = () => {
    return [
      { x: 30, y: 42, width: 8, height: 4 },
      { x: 60, y: 38, width: 6, height: 3 },
      { x: 75, y: 48, width: 5, height: 2 }
    ];
  };

  // Generate stakes in historical formation (multiple rows)
  const generateHistoricalStakes = () => {
    const stakes = [];
    // First row of stakes
    for (let i = 0; i < 15; i++) {
      stakes.push({ x: 35 + i * 2, y: 38, id: `row1_${i}` });
    }
    // Second row of stakes
    for (let i = 0; i < 12; i++) {
      stakes.push({ x: 37 + i * 2.2, y: 41, id: `row2_${i}` });
    }
    // Third row of stakes
    for (let i = 0; i < 10; i++) {
      stakes.push({ x: 39 + i * 2.5, y: 44, id: `row3_${i}` });
    }
    return stakes;
  };

  const stakes = generateHistoricalStakes();
  const islands = generateIslands();

  // Generate Mongol fleet in historical formation
  const generateMongolFleet = () => {
    const ships = [];
    const baseX = currentBattlePhase.mongolFleetPosition.x;
    const baseY = currentBattlePhase.mongolFleetPosition.y;
    
    // Main battle formation - 5 columns, 8 rows
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 8; row++) {
        ships.push({
          x: baseX + col * 3,
          y: baseY + row * 2,
          id: `mongol_${col}_${row}`,
          type: 'war_junk',
          size: 'large'
        });
      }
    }
    return ships;
  };

  // Generate Vietnamese fleet in guerrilla formation
  const generateVietnameseFleet = () => {
    const ships = [];
    const baseX = currentBattlePhase.vietnameseFleetPosition.x;
    const baseY = currentBattlePhase.vietnameseFleetPosition.y;
    
    // Scattered guerrilla formation
    for (let i = 0; i < 12; i++) {
      ships.push({
        x: baseX + (i % 4) * 2.5 + Math.random() * 1,
        y: baseY + Math.floor(i / 4) * 3 + Math.random() * 1,
        id: `vietnamese_${i}`,
        type: 'river_junk',
        size: 'small'
      });
    }
    return ships;
  };

  const mongolFleet = generateMongolFleet();
  const vietnameseFleet = generateVietnameseFleet();

  return (
    <div className="historically-accurate-battle-map">
      <div className="battle-header">
        <h2>⚔️ Battle of Bach Dang 1288 - Historically Accurate Recreation</h2>
      </div>

      <div className="battle-container">
        <div className="battle-map-container">
          <svg viewBox="0 0 100 70" className="historical-battle-svg">
            <defs>
              {/* River gradient based on time of day */}
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentBattlePhase.timeOfDay === 'night' ? '#1a365d' : '#2563eb'} />
                <stop offset="50%" stopColor={currentBattlePhase.timeOfDay === 'night' ? '#2d3748' : '#3b82f6'} />
                <stop offset="100%" stopColor={currentBattlePhase.timeOfDay === 'night' ? '#4a5568' : '#60a5fa'} />
              </linearGradient>

              {/* Water texture with waves */}
              <pattern id="waterTexture" patternUnits="userSpaceOnUse" width="6" height="6">
                <rect width="6" height="6" fill="url(#riverGradient)" />
                <path d="M0,3 Q3,2 6,3" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" fill="none" />
                <path d="M0,4 Q3,3 6,4" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" fill="none" />
              </pattern>

              {/* Glow effects */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Explosion effect for trapped ships */}
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
            <rect width="100" height="25" 
                  fill={currentBattlePhase.timeOfDay === 'night' ? '#1a202c' : 
                        currentBattlePhase.timeOfDay === 'morning' ? '#fef3c7' : 
                        currentBattlePhase.timeOfDay === 'midday' ? '#dbeafe' : '#fed7aa'} />

            {/* Mountains in background */}
            <path d="M0,20 L8,12 L15,16 L25,8 L35,14 L45,10 L55,12 L65,6 L75,10 L85,8 L95,12 L100,15 L100,25 L0,25 Z" 
                  fill="#4a5568" opacity="0.7" />

            {/* Bach Dang River with historically accurate curves */}
            <path d={generateBachDangRiver()} 
                  fill="url(#waterTexture)" 
                  className="bach-dang-river" />

            {/* River banks with realistic vegetation */}
            <path d="M0,20 Q15,18 30,22 Q45,18 60,22 Q75,18 90,22 Q95,20 100,22 L100,25 Q95,23 90,25 Q75,21 60,25 Q45,21 30,25 Q15,23 0,25 Z" 
                  fill="#22c55e" className="river-bank north" />
            <path d="M0,50 Q15,52 30,48 Q45,52 60,48 Q75,52 90,48 Q95,50 100,48 L100,55 Q95,57 90,53 Q75,57 60,53 Q45,57 30,53 Q15,57 0,53 Z" 
                  fill="#16a34a" className="river-bank south" />

            {/* Small islands and sandbars */}
            {islands.map((island, i) => (
              <ellipse
                key={i}
                cx={island.x}
                cy={island.y}
                rx={island.width / 2}
                ry={island.height / 2}
                fill="#d2b48c"
                stroke="#8b7355"
                strokeWidth="0.3"
                className="island"
              />
            ))}

            {/* Trees along riverbank */}
            {[...Array(20)].map((_, i) => (
              <g key={i} className="tree-group">
                <circle cx={5 + i * 4.5} cy={22} r="1" fill="#16a34a" />
                <rect x={4.5 + i * 4.5} y={22} width="1" height="2.5" fill="#92400e" />
              </g>
            ))}

            {/* Historical stakes formation (only visible when tide is low) */}
            {currentBattlePhase.stakesVisible && (
              <g className="stakes-formation">
                {stakes.map((stake, i) => (
                  <g key={stake.id} className="stake-group" onClick={() => handleElementClick(interactiveElements[0])}>
                    <line
                      x1={stake.x}
                      y1={stake.y + 2}
                      x2={stake.x}
                      y2={stake.y - 1.5}
                      stroke="#8b4513"
                      strokeWidth="0.6"
                      className="stake animate-stake"
                      style={{ animationDelay: `${i * 0.02}s` }}
                    />
                    <circle
                      cx={stake.x}
                      cy={stake.y - 1.5}
                      r="0.3"
                      fill="#dc2626"
                      className="stake-tip animate-stake"
                      style={{ animationDelay: `${i * 0.02}s` }}
                    />
                    {/* Splash effect when stakes appear */}
                    {currentPhase === 3 && (
                      <circle
                        cx={stake.x}
                        cy={stake.y}
                        r="1.5"
                        fill="rgba(59, 130, 246, 0.4)"
                        className="splash-effect"
                        style={{ animationDelay: `${i * 0.02}s` }}
                      />
                    )}
                  </g>
                ))}
              </g>
            )}

            {/* Mongol Fleet - Historical formation */}
            <g className="mongol-fleet-formation" onClick={() => handleElementClick(interactiveElements[1])}>
              {mongolFleet.map((ship, i) => (
                <g key={ship.id} className="mongol-war-ship">
                  {/* Large war junk hull */}
                  <ellipse
                    cx={ship.x}
                    cy={ship.y}
                    rx="2.5"
                    ry="1.2"
                    fill="#8b0000"
                    stroke="#4a0000"
                    strokeWidth="0.2"
                    className={currentBattlePhase.mongolFormation === 'trapped' || currentBattlePhase.mongolFormation === 'destroyed' ? 'ship-trapped' : 'ship-moving'}
                  />
                  {/* Ship deck */}
                  <ellipse
                    cx={ship.x}
                    cy={ship.y - 0.2}
                    rx="2"
                    ry="0.8"
                    fill="#a52a2a"
                    opacity="0.9"
                  />
                  {/* Main sail */}
                  <polygon
                    points={`${ship.x - 1},${ship.y - 1.5} ${ship.x},${ship.y - 3} ${ship.x + 1},${ship.y - 1.5}`}
                    fill="#654321"
                    className="ship-sail"
                  />
                  {/* Mast */}
                  <line
                    x1={ship.x}
                    y1={ship.y - 1.5}
                    x2={ship.x}
                    y2={ship.y - 3}
                    stroke="#8b4513"
                    strokeWidth="0.2"
                  />
                  {/* Mongol flag */}
                  <rect
                    x={ship.x - 0.4}
                    y={ship.y - 3.2}
                    width="0.8"
                    height="0.5"
                    fill="#8b0000"
                  />
                  {/* Dragon head (Mongol style) */}
                  <path
                    d={`M${ship.x + 2.5},${ship.y} Q${ship.x + 3.2},${ship.y - 0.3} ${ship.x + 3},${ship.y + 0.3}`}
                    fill="#8b0000"
                    stroke="#4a0000"
                    strokeWidth="0.1"
                  />
                  {/* Damage effects when trapped */}
                  {(currentBattlePhase.mongolFormation === 'trapped' || currentBattlePhase.mongolFormation === 'destroyed') && (
                    <>
                      <circle
                        cx={ship.x}
                        cy={ship.y}
                        r="0.8"
                        fill="#ff4444"
                        opacity="0.7"
                        className="damage-effect"
                      />
                      <path
                        d={`M${ship.x - 0.8},${ship.y} L${ship.x + 0.8},${ship.y - 1.5}`}
                        stroke="#ff4444"
                        strokeWidth="0.3"
                        className="crack-effect"
                      />
                    </>
                  )}
                </g>
              ))}
            </g>

            {/* Vietnamese Fleet - Guerrilla formation */}
            <g className="vietnamese-fleet-formation" onClick={() => handleElementClick(interactiveElements[2])}>
              {vietnameseFleet.map((ship, i) => (
                <g key={ship.id} className="vietnamese-river-ship">
                  {/* Smaller, agile river junk hull */}
                  <ellipse
                    cx={ship.x}
                    cy={ship.y}
                    rx="1.8"
                    ry="0.9"
                    fill="#228b22"
                    stroke="#006400"
                    strokeWidth="0.2"
                    className="ship-moving"
                  />
                  {/* Ship deck */}
                  <ellipse
                    cx={ship.x}
                    cy={ship.y - 0.1}
                    rx="1.4"
                    ry="0.6"
                    fill="#32cd32"
                    opacity="0.9"
                  />
                  {/* Traditional Vietnamese sail */}
                  <polygon
                    points={`${ship.x - 0.7},${ship.y - 1.2} ${ship.x},${ship.y - 2.2} ${ship.x + 0.7},${ship.y - 1.2}`}
                    fill="#daa520"
                    className="ship-sail"
                  />
                  {/* Mast */}
                  <line
                    x1={ship.x}
                    y1={ship.y - 1.2}
                    x2={ship.x}
                    y2={ship.y - 2.2}
                    stroke="#8b4513"
                    strokeWidth="0.15"
                  />
                  {/* Vietnamese flag */}
                  <rect
                    x={ship.x - 0.3}
                    y={ship.y - 2.4}
                    width="0.6"
                    height="0.4"
                    fill="#dc143c"
                  />
                  {/* Wake effect */}
                  <path
                    d={`M${ship.x - 1.8},${ship.y} Q${ship.x - 2.5},${ship.y + 0.3} ${ship.x - 3},${ship.y}`}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="0.2"
                    fill="none"
                    className="wake-effect"
                  />
                </g>
              ))}
            </g>

            {/* Commander portraits */}
            <g className="commanders-section" onClick={() => handleElementClick(interactiveElements[3])}>
              {/* Tran Hung Dao portrait */}
              <rect x="5" y="5" width="12" height="8" fill="rgba(255,255,255,0.95)" stroke="#1e40af" strokeWidth="0.3" rx="1" />
              <text x="11" y="7.5" textAnchor="middle" fontSize="1.2" fill="#1e40af" fontWeight="bold">Trần Hưng Đạo</text>
              <text x="11" y="9" textAnchor="middle" fontSize="0.8" fill="#374151">Vietnamese Commander</text>
              <text x="11" y="10.5" textAnchor="middle" fontSize="0.8" fill="#374151">Master Strategist</text>
              
              {/* Mongol commanders */}
              <rect x="83" y="5" width="12" height="8" fill="rgba(255,255,255,0.95)" stroke="#dc2626" strokeWidth="0.3" rx="1" />
              <text x="89" y="7.5" textAnchor="middle" fontSize="1.2" fill="#dc2626" fontWeight="bold">Omar & Sogetu</text>
              <text x="89" y="9" textAnchor="middle" fontSize="0.8" fill="#374151">Mongol Admirals</text>
              <text x="89" y="10.5" textAnchor="middle" fontSize="0.8" fill="#374151">Naval Commanders</text>
            </g>

            {/* Interactive Hotspots */}
            {interactiveElements.map((element) => (
              <circle
                key={element.id}
                cx={element.position.x}
                cy={element.position.y}
                r="1.2"
                fill="rgba(255, 255, 255, 0.9)"
                stroke="#3b82f6"
                strokeWidth="2"
                className="hotspot"
                onClick={() => handleElementClick(element)}
              >
                <animate attributeName="r" values="1.2;2;1.2" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite"/>
              </circle>
            ))}

            {/* Tide level indicator */}
            <g className="tide-indicator">
              <rect x="2" y="60" width="18" height="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="0.5" rx="2" />
              <text x="11" y="64" textAnchor="middle" fontSize="1.8" fill="#1e40af" fontWeight="bold">
                Tide: {currentBattlePhase.tideLevel.toUpperCase()}
              </text>
              <rect 
                x="3" 
                y="65.5" 
                width={currentBattlePhase.tideLevel === 'high' ? "16" : "8"} 
                height="1.5" 
                fill="#3b82f6" 
                className="tide-level-bar"
              />
            </g>
          </svg>

          <div className="battle-legend">
            <h4>Historical Legend</h4>
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
            <div className="legend-item">
              <div className="legend-color islands"></div>
              <span>Islands & Sandbars</span>
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
            <div className="stat-item">
              <span className="stat-label">Formation:</span>
              <span className="stat-value">{currentBattlePhase.mongolFormation.replace('_', ' ').toUpperCase()}</span>
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
              <h4>Strategic Lesson for Modern Leaders</h4>
              <p>{selectedElement.strategicLesson}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricallyAccurateBattleMap;

