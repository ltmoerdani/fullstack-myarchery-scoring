import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target,
  Home,
  Download,
  Settings
} from 'lucide-react';

// Import new components
import { PageHeader } from '@/components/common/PageHeader';
import { NavigationTabs } from '@/components/common/NavigationTabs';
import { FilterSection, FilterButton } from '@/components/common/FilterSection';
import { PageFooter } from '@/components/common/PageFooter';
import { EliminationTable } from '@/components/scoring/EliminationTable';

interface ScoringEliminasiProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
  onDashboard?: () => void;
}

interface EliminationMatch {
  id: string;
  leftPlayer: {
    rank: number;
    name: string;
    scores: number[];
  } | null;
  rightPlayer: {
    rank: number;
    name: string;
    scores: number[];
  } | null;
  winner?: 'left' | 'right';
  status: 'pending' | 'determined' | 'completed';
}

export function ScoringEliminasi({ 
  onBack, 
  onNavigate, 
  onLogout, 
  onDashboard 
}: Readonly<ScoringEliminasiProps>) {
  const [activeTab, setActiveTab] = useState('recurve');
  const [selectedKelas, setSelectedKelas] = useState('Umum - 70m');
  const [selectedJenisRegu, setSelectedJenisRegu] = useState('Individu Putra');
  const [selectedRound, setSelectedRound] = useState('16 Besar');
  const [activeNavTab, setActiveNavTab] = useState('scoring-eliminasi');

  // Sample elimination matches data
  const [eliminationMatches, setEliminationMatches] = useState<EliminationMatch[]>([
    {
      id: '16-besar-1',
      leftPlayer: {
        rank: 1,
        name: 'Riguna A. Fazar',
        scores: [6, 0]
      },
      rightPlayer: {
        rank: 16,
        name: 'Erwin Arief Wibowo',
        scores: [0, 2]
      },
      status: 'completed',
      winner: 'left'
    },
    {
      id: '16-besar-2',
      leftPlayer: {
        rank: 9,
        name: 'Satrio wibowo',
        scores: [0, 0]
      },
      rightPlayer: {
        rank: 8,
        name: 'Reza Holyus Perdana',
        scores: [0, 0]
      },
      status: 'pending'
    },
    {
      id: '16-besar-3',
      leftPlayer: {
        rank: 5,
        name: 'abuza',
        scores: [5, 0]
      },
      rightPlayer: {
        rank: 12,
        name: 'M Yusuf',
        scores: [0, 6]
      },
      status: 'completed',
      winner: 'right'
    },
    {
      id: '16-besar-4',
      leftPlayer: {
        rank: 13,
        name: 'Muhammad Irfan Ilmi',
        scores: [3, 0]
      },
      rightPlayer: {
        rank: 4,
        name: 'Andreas Aris Susanto',
        scores: [0, 7]
      },
      status: 'completed',
      winner: 'right'
    },
    {
      id: '16-besar-5',
      leftPlayer: {
        rank: 3,
        name: 'Wiwit Widodo',
        scores: [6, 0]
      },
      rightPlayer: {
        rank: 14,
        name: 'dwijo Siswoyo',
        scores: [0, 0]
      },
      status: 'completed',
      winner: 'left'
    },
    {
      id: '16-besar-6',
      leftPlayer: {
        rank: 11,
        name: 'TRI SUSANTO',
        scores: [2, 0]
      },
      rightPlayer: {
        rank: 6,
        name: 'LUKMAN HAKIM',
        scores: [0, 6]
      },
      status: 'completed',
      winner: 'right'
    },
    {
      id: '16-besar-7',
      leftPlayer: {
        rank: 7,
        name: 'Erdiyansyah alim',
        scores: [6, 0]
      },
      rightPlayer: {
        rank: 10,
        name: 'Abu Gaza',
        scores: [0, 4]
      },
      status: 'completed',
      winner: 'left'
    },
    {
      id: '16-besar-8',
      leftPlayer: {
        rank: 15,
        name: 'TRI HARTANTO',
        scores: [3, 0]
      },
      rightPlayer: {
        rank: 2,
        name: 'Rangga Ganzar Noegraha',
        scores: [0, 7]
      },
      status: 'completed',
      winner: 'right'
    }
  ]);

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'scoring-kualifikasi', label: 'Scoring Kualifikasi', icon: Target },
    { id: 'scoring-eliminasi', label: 'Scoring Eliminasi', icon: Settings },
    { id: 'dokumen', label: 'Dokumen', icon: Download }
  ];

  const handleNavigationTabClick = (tabId: string) => {
    setActiveNavTab(tabId);
    
    switch (tabId) {
      case 'dashboard':
        // Navigate back to event detail page (PRO MASTER GAMES)
        if (onBack) {
          onBack();
        }
        break;
      case 'scoring-kualifikasi':
        // Navigate to scoring qualification page
        if (onNavigate) {
          onNavigate('scoring-kualifikasi');
        }
        break;
      case 'scoring-eliminasi':
        // Stay on current page
        break;
      case 'dokumen':
        // Navigate to documents page
        if (onNavigate) {
          onNavigate('dokumen');
        }
        break;
      default:
        break;
    }
  };

  const handleLogoClick = () => {
    // Navigate to main dashboard (after login)
    if (onDashboard) {
      onDashboard();
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleMatchAction = (matchId: string, action: 'determine' | 'cancel') => {
    setEliminationMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, status: action === 'determine' ? 'determined' : 'pending' }
        : match
    ));
  };

  const handleScoreChange = (matchId: string, player: 'left' | 'right', scoreIndex: number, value: string) => {
    setEliminationMatches(prev => prev.map(match => {
      if (match.id === matchId && match[`${player}Player`]) {
        const newScores = [...match[`${player}Player`]!.scores];
        newScores[scoreIndex] = parseInt(value) || 0;
        return {
          ...match,
          [`${player}Player`]: {
            ...match[`${player}Player`]!,
            scores: newScores
          }
        };
      }
      return match;
    }));
  };

  const handleEditMatch = (match: EliminationMatch) => {
    console.log('Edit match:', match);
    // TODO: Implement scoresheet modal
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <PageHeader 
        title="Scoring Eliminasi" 
        showBackButton 
        onBack={onBack}
        onLogoClick={handleLogoClick}
        onLogout={handleLogout}
      />

      {/* Navigation Tabs */}
      <NavigationTabs 
        tabs={navigationTabs} 
        onTabClick={handleNavigationTabClick}
        activeTabId={activeNavTab}
      />

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        {/* Category Tabs */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="recurve">Recurve</TabsTrigger>
              <TabsTrigger value="compound">Compound</TabsTrigger>
              <TabsTrigger value="nasional">Nasional</TabsTrigger>
              <TabsTrigger value="barebow">Barebow</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Filters and Controls */}
        <FilterSection
          groups={[
            {
              label: 'Kelas',
              children: (
                <>
                  {['Umum - 70m', 'U-15 - 50m', 'Master - 70m'].map((kelas) => (
                    <FilterButton
                      key={kelas}
                      active={selectedKelas === kelas}
                      onClick={() => setSelectedKelas(kelas)}
                    >
                      {kelas}
                    </FilterButton>
                  ))}
                </>
              )
            },
            {
              label: 'Jenis Regu',
              children: (
                <>
                  {['Individu Putra', 'Individu Putri', 'Beregu Putra', 'Beregu Putri', 'Beregu Campuran'].map((jenis) => (
                    <FilterButton
                      key={jenis}
                      active={selectedJenisRegu === jenis}
                      onClick={() => setSelectedJenisRegu(jenis)}
                    >
                      {jenis}
                    </FilterButton>
                  ))}
                </>
              )
            }
          ]}
          actions={
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <Download className="w-4 h-4 mr-2" />
                Cetak Bagan
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <span className="mr-2">👁</span>Lihat Bagan
              </Button>
            </div>
          }
        />

        {/* Elimination Rounds Navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              {['16 Besar', '8 Besar', 'Semi-Final', 'Final', '3rd Place'].map((round) => (
                <button
                  key={`round-${round.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedRound(round)}
                  className={`text-sm font-medium transition-colors ${
                    selectedRound === round
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-2'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {round}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Cetak Scoresheet Kosong
              </Button>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Unduh Semua Scoresheet
              </Button>
            </div>
          </div>
        </div>

        {/* Elimination Bracket */}
        <EliminationTable
          matches={eliminationMatches}
          onMatchAction={handleMatchAction}
          onScoreChange={handleScoreChange}
          onEditMatch={handleEditMatch}
        />
      </main>

      {/* Footer */}
      <PageFooter />
    </div>
  );
}