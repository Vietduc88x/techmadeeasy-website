import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { X, Info, Zap, Settings, Cable, Anchor, Wind, Play, Pause, Power, Home, Waves } from 'lucide-react'
import diagramImage from '/offshore-wind-diagram.png'
import './App.css'

const systemComponents = {
  floating_wtg: {
    id: 'floating_wtg',
    title: 'Floating Wind Turbine',
    description: 'Turbine gió nổi cho vùng nước sâu',
    details: [
      'Thiết kế nổi cho vùng nước sâu (>60m)',
      'Foundation nổi với hệ thống neo và cáp neo',
      'Công suất 8-15 MW, phù hợp cho gió mạnh',
      'Kết nối cáp linh hoạt, có thể di chuyển theo sóng',
      'Chi phí cao nhưng tiềm năng lớn cho tương lai'
    ],
    scope: 'WTG Supply, Mechanical Completion, Testing & Commissioning',
    color: '#ff69b4',
    glowColor: '#ff69b4',
    icon: Wind,
    position: { x: 15, y: 35 }
  },
  jacket_wtg: {
    id: 'jacket_wtg',
    title: 'Jacket Wind Turbine',
    description: 'Turbine gió với foundation jacket',
    details: [
      'Foundation jacket cho vùng nước trung bình (30-60m)',
      'Cấu trúc thép chống ăn mòn với thiết kế chữ A',
      'Công suất 6-12 MW, ổn định trong điều kiện khắc nghiệt',
      'Độ ổn định cao, chịu được sóng lớn và gió mạnh',
      'Chi phí trung bình, phù hợp cho nhiều dự án'
    ],
    scope: 'WTG Supply, Mechanical Completion, Testing & Commissioning',
    color: '#ff69b4',
    glowColor: '#ff69b4',
    icon: Wind,
    position: { x: 32, y: 28 }
  },
  monopile_wtg: {
    id: 'monopile_wtg',
    title: 'Monopile Wind Turbine',
    description: 'Turbine gió với foundation monopile',
    details: [
      'Foundation monopile cho vùng nước nông (<30m)',
      'Cọc thép đơn đóng sâu 20-30m xuống đáy biển',
      'Công suất 3-8 MW, thiết kế đơn giản hiệu quả',
      'Chi phí thấp nhất, lắp đặt nhanh chóng',
      'Phổ biến nhất trong các dự án offshore wind hiện tại'
    ],
    scope: 'WTG Supply, Mechanical Completion, Testing & Commissioning',
    color: '#ff69b4',
    glowColor: '#ff69b4',
    icon: Wind,
    position: { x: 38, y: 15 }
  },
  offshore_substation: {
    id: 'offshore_substation',
    title: 'Offshore Substation',
    description: 'Trạm biến áp ngoài khơi',
    details: [
      'Thu thập điện từ tất cả các turbine trong farm',
      'Biến áp từ 33kV lên 132kV hoặc 220kV',
      'Hệ thống SCADA tự động giám sát và điều khiển',
      'Platform chống sóng lớn với helipad',
      'Thiết bị bảo vệ và chuyển mạch tự động',
      'Phòng điều khiển có người vận hành 24/7'
    ],
    scope: 'Offshore Transformer Station (OSS) EPCI',
    color: '#00ff88',
    glowColor: '#00ff88',
    icon: Zap,
    position: { x: 55, y: 35 }
  },
  power_cables: {
    id: 'power_cables',
    title: 'Power Cables System',
    description: 'Hệ thống cáp điện kết nối',
    details: [
      'Array cables: Cáp 33kV kết nối turbine với OSS',
      'Export cables: Cáp 132-220kV truyền điện về bờ',
      'Chôn dưới đáy biển 1-3m để bảo vệ',
      'Chống ăn mòn biển với lớp cách điện đặc biệt',
      'Hệ thống giám sát tích hợp phát hiện sự cố',
      'Chiều dài có thể lên đến 100km cho export cable'
    ],
    scope: 'BoP: Infield cables EPCI, Export cable EPCI',
    color: '#0080ff',
    glowColor: '#0080ff',
    icon: Cable,
    position: { x: 45, y: 55 }
  },
  onshore_substation: {
    id: 'onshore_substation',
    title: 'Onshore Substation',
    description: 'Trạm biến áp trên bờ',
    details: [
      'Nhận điện từ export cable qua landing point',
      'Biến áp lên 400kV để kết nối lưới điện',
      'Hệ thống điều khiển và bảo vệ hiện đại',
      'Thiết bị đo lường và giám sát chất lượng điện',
      'Kết nối với trung tâm điều độ quốc gia',
      'Hệ thống dự phòng đảm bảo vận hành liên tục'
    ],
    scope: 'Onshore Substation (ONSS) EPCI',
    color: '#8000ff',
    glowColor: '#8000ff',
    icon: Power,
    position: { x: 78, y: 35 }
  },
  power_grid: {
    id: 'power_grid',
    title: 'Power Grid Connection',
    description: 'Kết nối lưới điện quốc gia',
    details: [
      'Truyền tải điện đến người tiêu dùng',
      'Lưới điện 400kV backbone transmission',
      'Hệ thống phân phối đến các khu vực',
      'Giám sát và điều độ tự động real-time',
      'Cân bằng cung cầu điện năng',
      'Tích hợp với các nguồn năng lượng khác'
    ],
    scope: 'Transmission system operator (TSO)',
    color: '#c080ff',
    glowColor: '#c080ff',
    icon: Home,
    position: { x: 88, y: 25 }
  }
}

const scopeColors = {
  'Employer': '#ff0000',
  'WTG Supply, Mechanical Completion, Testing & Commissioning': '#ff69b4',
  'BoP: Foundations EPCI, Infield cables EPCI, Export cable EPCI, OSS T&I, WTG T&I(I)': '#0080ff',
  'Offshore Transformer Station (OSS) EPCI': '#00ff88',
  'Onshore Substation (ONSS) EPCI': '#8000ff',
  'Transmission system operator (TSO)': '#c080ff'
}

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [hoveredComponent, setHoveredComponent] = useState(null)
  const [isAutoTour, setIsAutoTour] = useState(false)
  const [tourIndex, setTourIndex] = useState(0)

  const componentIds = Object.keys(systemComponents)

  useEffect(() => {
    let interval
    if (isAutoTour) {
      interval = setInterval(() => {
        setTourIndex((prev) => {
          const nextIndex = (prev + 1) % componentIds.length
          setSelectedComponent(componentIds[nextIndex])
          return nextIndex
        })
      }, 4000)
    }
    return () => clearInterval(interval)
  }, [isAutoTour, componentIds])

  const handleComponentClick = (componentId) => {
    setIsAutoTour(false)
    setSelectedComponent(componentId === selectedComponent ? null : componentId)
  }

  const handleCloseModal = () => {
    setSelectedComponent(null)
    setIsAutoTour(false)
  }

  const toggleAutoTour = () => {
    setIsAutoTour(!isAutoTour)
    if (!isAutoTour) {
      setTourIndex(0)
      setSelectedComponent(componentIds[0])
    } else {
      setSelectedComponent(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-4 animate-pulse">
            Interactive Offshore Wind Farm
          </h1>
          <p className="text-xl text-blue-200 mb-6">
            Khám phá hệ thống điện gió ngoài khơi từ turbine đến lưới điện
          </p>
          <Button 
            onClick={toggleAutoTour}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isAutoTour ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isAutoTour ? 'Dừng Tour' : 'Bắt đầu Auto Tour'}
          </Button>
        </header>

        {/* Enhanced Legend */}
        <Card className="mb-6 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Info className="w-5 h-5 text-blue-400" />
              SCOPE & Parties Involved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(scopeColors).map(([scope, color]) => (
                <div key={scope} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div 
                    className="w-4 h-4 rounded-full shadow-lg"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}50`
                    }}
                  ></div>
                  <span className="text-sm text-gray-200">{scope}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Diagram with Background Image */}
        <div className="relative bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          
          {/* Background Image */}
          <div className="relative">
            <img 
              src={diagramImage} 
              alt="Offshore Wind Farm Diagram"
              className="w-full h-auto relative z-10"
            />
            
            {/* Interactive Hotspots Overlay */}
            <div className="absolute inset-0 z-20">
              {Object.values(systemComponents).map((component) => {
                const Icon = component.icon
                const isActive = selectedComponent === component.id
                const isHovered = hoveredComponent === component.id
                const isTourActive = isAutoTour && selectedComponent === component.id
                
                return (
                  <button
                    key={component.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 
                      w-12 h-12 rounded-full border-2 border-white/70 shadow-2xl
                      transition-all duration-500 hover:scale-125 hover:shadow-xl
                      ${isHovered || isActive || isTourActive ? 'scale-125 shadow-xl' : ''}
                      ${isActive || isTourActive ? 'ring-4 ring-white/60' : ''}
                      backdrop-blur-sm
                      animate-pulse hover:animate-none
                      group relative
                    `}
                    style={{
                      left: `${component.position.x}%`,
                      top: `${component.position.y}%`,
                      backgroundColor: component.color,
                      boxShadow: `0 0 25px ${component.glowColor}80, 0 0 50px ${component.glowColor}40`,
                      animation: isTourActive ? 'pulse 1s infinite' : undefined
                    }}
                    onClick={() => handleComponentClick(component.id)}
                    onMouseEnter={() => setHoveredComponent(component.id)}
                    onMouseLeave={() => setHoveredComponent(null)}
                    title={component.title}
                  >
                    <Icon className="w-6 h-6 text-white mx-auto drop-shadow-lg" />
                    
                    {/* Enhanced Ripple Effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-0 group-hover:opacity-100"></div>
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse opacity-0 group-hover:opacity-100"></div>
                    
                    {/* Enhanced Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap backdrop-blur-sm border border-white/20 shadow-xl">
                      {component.title}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Component Details Modal */}
        {selectedComponent && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <Card className="max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-white/10 backdrop-blur-md border-white/20 shadow-2xl animate-in slide-in-from-bottom duration-500">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                <div className="flex items-center gap-4">
                  {(() => {
                    const Icon = systemComponents[selectedComponent].icon
                    return (
                      <div 
                        className="p-3 rounded-full"
                        style={{ 
                          backgroundColor: systemComponents[selectedComponent].color,
                          boxShadow: `0 0 25px ${systemComponents[selectedComponent].glowColor}50`
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    )
                  })()}
                  <div>
                    <CardTitle className="text-white text-2xl">{systemComponents[selectedComponent].title}</CardTitle>
                    <CardDescription className="text-blue-200 text-lg">{systemComponents[selectedComponent].description}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleCloseModal} className="text-white hover:bg-white/20">
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-white text-xl flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-400" />
                      Chi tiết kỹ thuật:
                    </h4>
                    <ul className="space-y-3">
                      {systemComponents[selectedComponent].details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-4 text-gray-200 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-1.5 flex-shrink-0"></div>
                          <span className="text-base leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-white text-xl flex items-center gap-2">
                      <Settings className="w-5 h-5 text-green-400" />
                      Phạm vi trách nhiệm:
                    </h4>
                    <Badge 
                      variant="outline" 
                      className="text-base px-6 py-3 rounded-full font-medium"
                      style={{ 
                        borderColor: systemComponents[selectedComponent].color,
                        color: systemComponents[selectedComponent].color,
                        backgroundColor: `${systemComponents[selectedComponent].color}20`,
                        boxShadow: `0 0 15px ${systemComponents[selectedComponent].glowColor}30`
                      }}
                    >
                      {systemComponents[selectedComponent].scope}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Instructions */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-blue-200 text-lg">
                <Info className="w-5 h-5 inline mr-2 text-blue-400" />
                Click vào các biểu tượng trên sơ đồ để xem thông tin chi tiết hoặc sử dụng Auto Tour để khám phá từ turbine đến lưới điện
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-pink-400" />
                  Wind Turbines
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  Offshore Substation
                </span>
                <span className="flex items-center gap-2">
                  <Cable className="w-4 h-4 text-blue-400" />
                  Power Cables
                </span>
                <span className="flex items-center gap-2">
                  <Power className="w-4 h-4 text-purple-400" />
                  Onshore Substation
                </span>
                <span className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-indigo-400" />
                  Power Grid
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

