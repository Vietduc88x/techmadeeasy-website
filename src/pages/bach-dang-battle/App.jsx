import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Sword, 
  Ship, 
  Crown, 
  Users, 
  MapPin, 
  Calendar, 
  Trophy,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Star,
  Shield,
  Waves
} from 'lucide-react'
import './App.css'

function App() {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const battlePhases = [
    {
      id: 0,
      title: "Preparation Phase",
      date: "1287-1288",
      description: "Tran Hung Dao prepares the strategic trap",
      details: "Over 3,000 iron-tipped wooden stakes were secretly planted in the Bach Dang River during low tide. The stakes were positioned along a 3-mile stretch of the river, invisible when the tide was high.",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      id: 1,
      title: "Yuan Fleet Arrival",
      date: "April 9, 1288",
      description: "Mongol naval forces enter Bach Dang River",
      details: "The massive Yuan fleet, led by General Omar and Sogetu, sailed confidently into Bach Dang River with over 400 warships, believing they would easily defeat the Vietnamese forces.",
      icon: <Ship className="h-6 w-6" />,
      color: "bg-red-500"
    },
    {
      id: 2,
      title: "The Deception",
      date: "High Tide",
      description: "Vietnamese forces feign retreat",
      details: "Tran Hung Dao's smaller Vietnamese fleet engaged the Yuan forces briefly, then appeared to flee in panic. This was a carefully orchestrated retreat to lure the enemy deeper into the trap.",
      icon: <Users className="h-6 w-6" />,
      color: "bg-yellow-500"
    },
    {
      id: 3,
      title: "The Trap Springs",
      date: "Low Tide",
      description: "Stakes revealed, Yuan fleet trapped",
      details: "As the tide receded, the hidden stakes were revealed, piercing the hulls of Yuan warships. The mighty fleet found themselves trapped and helpless, unable to maneuver or escape.",
      icon: <Sword className="h-6 w-6" />,
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "Complete Victory",
      date: "April 9, 1288",
      description: "Yuan forces utterly defeated",
      details: "The Vietnamese forces returned to destroy the trapped fleet. Generals Omar and Sogetu were captured, and the Yuan naval power was completely annihilated, ending their invasion attempts.",
      icon: <Trophy className="h-6 w-6" />,
      color: "bg-purple-500"
    }
  ]

  const keyFigures = [
    {
      name: "Tran Hung Dao",
      title: "Vietnamese Supreme Commander",
      role: "Mastermind of the victory",
      description: "Prince Tran Quoc Tuan, known as Tran Hung Dao, was the brilliant military strategist who devised the stake trap strategy that led to this historic victory."
    },
    {
      name: "Emperor Tran Nhan Tong",
      title: "Vietnamese Emperor",
      role: "Supreme Leader",
      description: "The Vietnamese emperor who supported Tran Hung Dao's strategy and led the resistance against the Yuan invasion."
    },
    {
      name: "General Omar",
      title: "Yuan Naval Commander",
      role: "Enemy commander (captured)",
      description: "One of the Yuan generals who led the naval invasion and was captured during the battle."
    },
    {
      name: "General Sogetu",
      title: "Yuan Military Leader",
      role: "Enemy commander (captured)",
      description: "Another Yuan general who was captured when their fleet was destroyed in the Bach Dang River."
    }
  ]

  const battleStats = [
    { label: "Yuan Warships", value: "400+", icon: <Ship className="h-4 w-4" /> },
    { label: "Wooden Stakes", value: "3,000+", icon: <Sword className="h-4 w-4" /> },
    { label: "River Length", value: "3 miles", icon: <Waves className="h-4 w-4" /> },
    { label: "Battle Duration", value: "1 day", icon: <Calendar className="h-4 w-4" /> }
  ]

  const startAnimation = () => {
    setIsPlaying(true)
    let phase = 0
    const interval = setInterval(() => {
      if (phase < battlePhases.length - 1) {
        phase++
        setCurrentPhase(phase)
      } else {
        setIsPlaying(false)
        clearInterval(interval)
      }
    }, 2000)
  }

  const resetAnimation = () => {
    setCurrentPhase(0)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Battle of Bach Dang
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                The Greatest Naval Victory in Vietnamese History • 1288 AD
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <MapPin className="h-4 w-4 mr-2" />
              Bach Dang River, Vietnam
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="timeline" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timeline">Interactive Timeline</TabsTrigger>
            <TabsTrigger value="strategy">Battle Strategy</TabsTrigger>
            <TabsTrigger value="figures">Key Figures</TabsTrigger>
            <TabsTrigger value="legacy">Historical Impact</TabsTrigger>
          </TabsList>

          {/* Interactive Timeline */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Interactive Battle Timeline
                </CardTitle>
                <CardDescription>
                  Experience the Battle of Bach Dang step by step
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Button 
                    onClick={startAnimation} 
                    disabled={isPlaying}
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? 'Playing...' : 'Start Animation'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetAnimation}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>

                <div className="space-y-4">
                  <Progress value={(currentPhase / (battlePhases.length - 1)) * 100} className="h-2" />
                  
                  <div className="grid gap-4">
                    {battlePhases.map((phase, index) => (
                      <Card 
                        key={phase.id}
                        className={`transition-all duration-500 cursor-pointer ${
                          index === currentPhase 
                            ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                            : index < currentPhase 
                              ? 'opacity-75' 
                              : 'opacity-50'
                        }`}
                        onClick={() => setCurrentPhase(index)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${phase.color} text-white`}>
                              {phase.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">{phase.title}</h3>
                                <Badge variant="outline">{phase.date}</Badge>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-2">
                                {phase.description}
                              </p>
                              {index === currentPhase && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                  {phase.details}
                                </p>
                              )}
                            </div>
                            {index === currentPhase && (
                              <ChevronRight className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Battle Strategy */}
          <TabsContent value="strategy" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Vietnamese Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Terrain Advantage</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Used knowledge of tidal patterns in Bach Dang River
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Deception Tactics</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Feigned retreat to lure enemy into the trap
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Engineering Marvel</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          3,000+ iron-tipped stakes planted underwater
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Battle Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {battleStats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-center mb-2">
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Key Figures */}
          <TabsContent value="figures" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {keyFigures.map((figure, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5" />
                      {figure.name}
                    </CardTitle>
                    <CardDescription>{figure.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="mb-3">
                      {figure.role}
                    </Badge>
                    <p className="text-gray-600 dark:text-gray-300">
                      {figure.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Historical Impact */}
          <TabsContent value="legacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Historical Significance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold mb-2">National Independence</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Secured Vietnamese independence from Mongol invasion
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Sword className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Military Innovation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Demonstrated brilliant use of terrain and naval tactics
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Cultural Legacy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Became a symbol of Vietnamese resilience and ingenuity
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">The Battle's Impact</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The Battle of Bach Dang in 1288 marked the definitive end of Mongol attempts to conquer Vietnam. 
                    This victory not only preserved Vietnamese independence but also demonstrated that superior strategy 
                    and knowledge of local conditions could overcome seemingly insurmountable odds. The battle has 
                    inspired military strategists for centuries and remains a cornerstone of Vietnamese national identity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            Interactive Battle of Bach Dang • A tribute to Vietnamese military genius
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Experience history through interactive storytelling
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

