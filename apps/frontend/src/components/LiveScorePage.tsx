import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

// Import common components
import { LiveScoreConfigModal } from '@/components/livescore/LiveScoreConfigModal';
import { LiveScoreTable } from '@/components/livescore/LiveScoreTable';

interface LiveScoreParticipant {
  readonly peringkat: number;
  readonly bantalan: string;
  readonly nama: string;
  readonly klub: string;
  readonly sesi1: number;
  readonly sesi2: number;
  readonly total: number;
  readonly x10: number;
  readonly x: number;
}

interface LiveScoreConfig {
  competitionType: 'kualifikasi' | 'eliminasi';
  categories: string[];
  session: 'semua' | 'sesi1' | 'sesi2';
}

export function LiveScorePage() {
  const [showConfigModal, setShowConfigModal] = useState(true);
  const [isLiveRunning, setIsLiveRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [config, setConfig] = useState<LiveScoreConfig>({
    competitionType: 'kualifikasi',
    categories: [],
    session: 'semua'
  });
  const [selectedTeamType, setSelectedTeamType] = useState('Individu Putra');
  const intervalRef = useRef<NodeJS.Timeout>();

  // Sample live score data - extended list for scrolling
  const liveScoreData: LiveScoreParticipant[] = [
    {
      peringkat: 2,
      bantalan: '6C',
      nama: 'Aryaseta Chandra Putra',
      klub: 'PRO ARCHERY CLUB',
      sesi1: 305,
      sesi2: 319,
      total: 624,
      x10: 20,
      x: 7
    },
    {
      peringkat: 3,
      bantalan: '3A',
      nama: 'Raditia Vitho',
      klub: 'PPOP DKI JAKARTA',
      sesi1: 301,
      sesi2: 311,
      total: 612,
      x10: 13,
      x: 4
    },
    {
      peringkat: 4,
      bantalan: '4B',
      nama: 'Agus',
      klub: 'Amfibi archery team',
      sesi1: 290,
      sesi2: 304,
      total: 594,
      x10: 12,
      x: 5
    },
    {
      peringkat: 5,
      bantalan: '1C',
      nama: 'Rizqi Kusuma',
      klub: 'PPLM DKI JAKARTA',
      sesi1: 295,
      sesi2: 298,
      total: 593,
      x10: 13,
      x: 6
    },
    {
      peringkat: 6,
      bantalan: '9B',
      nama: 'Fawwaz Ramsi Nabiha',
      klub: 'DAD Archery Club',
      sesi1: 301,
      sesi2: 289,
      total: 590,
      x10: 9,
      x: 3
    },
    {
      peringkat: 7,
      bantalan: '7B',
      nama: 'Yuki Widiyanto',
      klub: 'FAST KODAMAR',
      sesi1: 302,
      sesi2: 285,
      total: 587,
      x10: 9,
      x: 0
    },
    {
      peringkat: 8,
      bantalan: '1A',
      nama: 'Nucky Nugraha',
      klub: 'PRO ARCHERY CLUB',
      sesi1: 303,
      sesi2: 283,
      total: 586,
      x10: 13,
      x: 5
    },
    {
      peringkat: 9,
      bantalan: '10A',
      nama: 'Hasan Abdul Rohim',
      klub: 'PPLM DKI JAKARTA',
      sesi1: 300,
      sesi2: 280,
      total: 580,
      x10: 7,
      x: 2
    },
    {
      peringkat: 10,
      bantalan: '5C',
      nama: 'Muhammad Fajar',
      klub: 'JAKARTA ARCHERY',
      sesi1: 295,
      sesi2: 275,
      total: 570,
      x10: 8,
      x: 3
    },
    {
      peringkat: 11,
      bantalan: '2A',
      nama: 'Ahmad Rizki Pratama',
      klub: 'PRO ARCHERY CLUB',
      sesi1: 285,
      sesi2: 280,
      total: 565,
      x10: 6,
      x: 2
    },
    {
      peringkat: 12,
      bantalan: '10B',
      nama: 'Muhammad Rasya Tadayon',
      klub: 'DAD Archery Club',
      sesi1: 285,
      sesi2: 291,
      total: 576,
      x10: 10,
      x: 6
    },
    {
      peringkat: 13,
      bantalan: '10C',
      nama: 'Ade rena',
      klub: '-',
      sesi1: 272,
      sesi2: 300,
      total: 572,
      x10: 13,
      x: 3
    },
    {
      peringkat: 14,
      bantalan: '7C',
      nama: 'Rifqi Azhar Maulana',
      klub: 'PRO ARCHERY CLUB',
      sesi1: 267,
      sesi2: 303,
      total: 570,
      x10: 11,
      x: 3
    },
    {
      peringkat: 15,
      bantalan: '13C',
      nama: 'Mikaelwynn Daniswara Nugraha',
      klub: 'X-Speed Jakarta',
      sesi1: 292,
      sesi2: 277,
      total: 569,
      x10: 16,
      x: 5
    },
    {
      peringkat: 16,
      bantalan: '5A',
      nama: 'Renjiro Pacifica Malano',
      klub: 'PPOP DKI JAKARTA',
      sesi1: 268,
      sesi2: 289,
      total: 557,
      x10: 9,
      x: 4
    },
    {
      peringkat: 17,
      bantalan: '5B',
      nama: 'Khasannudin Sanjaya',
      klub: 'Amfibi archery team',
      sesi1: 288,
      sesi2: 265,
      total: 553,
      x10: 6,
      x: 3
    },
    {
      peringkat: 18,
      bantalan: '8B',
      nama: 'Marlon Raffi Ramadhan',
      klub: 'DAD Archery Club',
      sesi1: 290,
      sesi2: 261,
      total: 551,
      x10: 8,
      x: 3
    },
    {
      peringkat: 19,
      bantalan: '11B',
      nama: "Ba'asith dzaki hamzah",
      klub: 'Raja Rumi Archery Club (RR)',
      sesi1: 269,
      sesi2: 279,
      total: 548,
      x10: 11,
      x: 1
    }
  ];

  // Auto-scroll animation
  useEffect(() => {
    if (isLiveRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const nextIndex = prev + 1;
          // Reset to 0 when reaching the end
          if (nextIndex >= liveScoreData.length - 7) { // Show 8 rows, so stop at length - 7
            return 0;
          }
          return nextIndex;
        });
      }, 4000); // Change every 4 seconds for better readability
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLiveRunning, liveScoreData.length]);

  const handleConfigSave = (newConfig: LiveScoreConfig) => {
    setConfig(newConfig);
    setShowConfigModal(false);
    setIsLiveRunning(true);
  };

  const handlePlayPause = () => {
    setIsLiveRunning(!isLiveRunning);
  };

  const handleReset = () => {
    setIsLiveRunning(false);
    setCurrentIndex(0);
  };

  const handleSettings = () => {
    setShowConfigModal(true);
    setIsLiveRunning(false);
  };

  // Get visible participants (show 8 at a time)
  const getVisibleParticipants = () => {
    const visibleCount = 8;
    const participants = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % liveScoreData.length;
      participants.push(liveScoreData[index]);
    }
    
    return participants;
  };

  const visibleParticipants = getVisibleParticipants();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col" style={{ minHeight: '1000px', width: '1600px', margin: '0 auto' }}>
      {/* Header - Optimized for projector */}
      <header className="w-full bg-white border-b-2 border-gray-200">
        <div className="w-full px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo and Event Title */}
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">JAKARTA SERIES I ARCHERY COMPETITION 2022</h1>
                <p className="text-lg text-gray-600 mt-1">
                  {config.competitionType === 'kualifikasi' ? 'Kualifikasi' : 'Eliminasi'} | 
                  Terakhir diperbarui: 29 Juni 2025, 20:32:08
                </p>
              </div>
            </div>

            {/* Live Status and Controls */}
            <div className="flex items-center space-x-4">
              <Badge className={`text-lg px-4 py-2 ${isLiveRunning ? 'bg-red-500' : 'bg-gray-500'} text-white`}>
                <div className={`w-3 h-3 rounded-full mr-3 ${isLiveRunning ? 'bg-white animate-pulse' : 'bg-gray-300'}`} />
                {isLiveRunning ? 'LIVE SCORE KUALIFIKASI SEMUA SESI' : 'STOPPED'}
              </Badge>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSettings}
                className="text-gray-700 border-gray-300 hover:bg-gray-50 px-4 py-2"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Competition Info Bar */}
      <div className="w-full bg-blue-700 text-white">
        <div className="w-full px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Category Info */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold">Kualifikasi</span>
                <span className="text-blue-200">•</span>
                <span className="text-xl text-blue-200">{selectedTeamType}</span>
              </div>
            </div>

            {/* Team Type Buttons */}
            <div className="flex space-x-3">
              {['Individu Putra', 'Individu Putri', 'Beregu Campuran', 'Beregu Putri', 'Beregu Putra'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedTeamType(type)}
                  className={`px-4 py-2 rounded text-lg font-medium transition-colors ${
                    selectedTeamType === type
                      ? 'bg-orange-500 text-white'
                      : 'bg-blue-600 text-blue-200 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Live Score Table */}
      <main className="flex-1 w-full px-8 py-6">
        <LiveScoreTable 
          participants={visibleParticipants}
          isAnimating={isLiveRunning}
          currentIndex={currentIndex}
          totalParticipants={liveScoreData.length}
        />
      </main>

      {/* Hidden Controls for Operator */}
      <div className="fixed bottom-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur rounded-lg p-2 shadow-lg">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          variant={isLiveRunning ? "destructive" : "default"}
          size="sm"
          onClick={handlePlayPause}
          className={isLiveRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
        >
          {isLiveRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && (
        <LiveScoreConfigModal
          onSave={handleConfigSave}
          onCancel={() => setShowConfigModal(false)}
          initialConfig={config}
        />
      )}
    </div>
  );
}