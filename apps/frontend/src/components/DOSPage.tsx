import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target,
  Download,
  Trophy,
  TrendingUp
} from 'lucide-react';

// Import components
import { PageHeader } from '@/components/common/PageHeader';
import { NavigationTabs } from '@/components/common/NavigationTabs';
import { FilterSection, FilterButton } from '@/components/common/FilterSection';
import { PageFooter } from '@/components/common/PageFooter';
import { DOSQualificationTable } from '@/components/dos/DOSQualificationTable';
import { DOSEliminationTable } from '@/components/dos/DOSEliminationTable';
import { DOSWinnersPage } from '@/components/dos/DOSWinnersPage';
import { DOSMedalStandingsPage } from '@/components/dos/DOSMedalStandingsPage';

interface Participant {
  readonly position: string;
  readonly rank: number;
  readonly name: string;
  readonly club: string;
  readonly sesi1: number;
  readonly sesi2: number;
  readonly jumlahPanah: number;
  readonly total: number;
  readonly x10: number;
  readonly x: number;
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

export function DOSPage() {
  const [activeTab, setActiveTab] = useState('barebow');
  const [selectedKelas, setSelectedKelas] = useState('Master - 20m');
  const [selectedJenisRegu, setSelectedJenisRegu] = useState('Individu Putra');
  const [selectedRound, setSelectedRound] = useState('16 Besar');
  const [activeNavTab, setActiveNavTab] = useState('scoring-kualifikasi');

  // Check URL parameters for initial tab
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['scoring-kualifikasi', 'scoring-eliminasi', 'pemenang', 'medal-standings'].includes(tabParam)) {
      setActiveNavTab(tabParam);
    }
  }, []);

  // Sample data for Barebow - sorted by rank
  const barebowParticipants: Participant[] = [
    {
      position: '4B',
      rank: 1,
      name: 'Erdiyansyah alim',
      club: 'Target Archery',
      sesi1: 330,
      sesi2: 326,
      jumlahPanah: 72,
      total: 656,
      x10: 23,
      x: 4
    },
    {
      position: '4A',
      rank: 2,
      name: 'Reza Holyus Perdana',
      club: 'Kompak DJP',
      sesi1: 324,
      sesi2: 330,
      jumlahPanah: 72,
      total: 654,
      x10: 19,
      x: 4
    },
    {
      position: '3D',
      rank: 3,
      name: 'Satrio wibowo',
      club: 'Raja Rumi Archery Club (RR)',
      sesi1: 338,
      sesi2: 316,
      jumlahPanah: 72,
      total: 654,
      x10: 24,
      x: 10
    },
    {
      position: '5B',
      rank: 4,
      name: 'Abu Gaza',
      club: 'EAST ARCHERY TEAM',
      sesi1: 327,
      sesi2: 326,
      jumlahPanah: 72,
      total: 653,
      x10: 22,
      x: 10
    },
    {
      position: '4B',
      rank: 5,
      name: 'dwijo Siswoyo',
      club: 'EAST ARCHERY TEAM',
      sesi1: 323,
      sesi2: 309,
      jumlahPanah: 72,
      total: 632,
      x10: 18,
      x: 5
    },
    {
      position: '5A',
      rank: 6,
      name: 'Sandy Zulfadli',
      club: 'Kompak DJP',
      sesi1: 316,
      sesi2: 313,
      jumlahPanah: 72,
      total: 629,
      x10: 19,
      x: 6
    },
    {
      position: '3C',
      rank: 7,
      name: 'Tri Wantoro',
      club: 'FOCUS ARCHERY CENTER KOOPSUDNAS',
      sesi1: 296,
      sesi2: 308,
      jumlahPanah: 72,
      total: 604,
      x10: 13,
      x: 3
    },
    {
      position: '4D',
      rank: 8,
      name: 'Didiek Bhudy Prabowo',
      club: 'PHM Archery Club',
      sesi1: 294,
      sesi2: 297,
      jumlahPanah: 72,
      total: 591,
      x10: 13,
      x: 4
    },
    {
      position: '4C',
      rank: 9,
      name: 'F.Ferdinando',
      club: 'FOCUS ARCHERY CENTER KOOPSUDNAS',
      sesi1: 275,
      sesi2: 304,
      jumlahPanah: 72,
      total: 579,
      x10: 10,
      x: 3
    },
    {
      position: '3A',
      rank: 10,
      name: 'Fitria Yulianto',
      club: 'Kompak DJP',
      sesi1: 0,
      sesi2: 0,
      jumlahPanah: 0,
      total: 0,
      x10: 0,
      x: 0
    }
  ];

  // Sample data for Compound - sorted by rank
  const compoundParticipants: Participant[] = [
    {
      position: '18A',
      rank: 1,
      name: 'Sigit Winarno',
      club: 'Siliwangi Archery Club Garut',
      sesi1: 353,
      sesi2: 350,
      jumlahPanah: 72,
      total: 703,
      x10: 57,
      x: 20
    },
    {
      position: '16C',
      rank: 2,
      name: 'Deni Eko Setiawan',
      club: 'Focus Archery Center',
      sesi1: 351,
      sesi2: 339,
      jumlahPanah: 72,
      total: 690,
      x10: 43,
      x: 16
    },
    {
      position: '16A',
      rank: 3,
      name: 'M Rizaldi Mulia Hasibuan',
      club: 'PRO ARCHERY CLUB',
      sesi1: 349,
      sesi2: 340,
      jumlahPanah: 72,
      total: 689,
      x10: 46,
      x: 22
    },
    {
      position: '18B',
      rank: 4,
      name: 'Syahrul',
      club: 'Mentari Archery Squad',
      sesi1: 338,
      sesi2: 340,
      jumlahPanah: 72,
      total: 678,
      x10: 36,
      x: 9
    },
    {
      position: '17C',
      rank: 5,
      name: 'Ramadhi Wijaya',
      club: 'Focus Archery Center',
      sesi1: 332,
      sesi2: 341,
      jumlahPanah: 72,
      total: 673,
      x10: 32,
      x: 12
    },
    {
      position: '18C',
      rank: 6,
      name: 'Tommy Harri Ardana',
      club: 'Segar Archery',
      sesi1: 319,
      sesi2: 340,
      jumlahPanah: 72,
      total: 659,
      x10: 33,
      x: 5
    },
    {
      position: '17A',
      rank: 7,
      name: 'MULYADI',
      club: 'PRO ARCHERY CLUB',
      sesi1: 317,
      sesi2: 291,
      jumlahPanah: 72,
      total: 608,
      x10: 11,
      x: 2
    },
    {
      position: '17B',
      rank: 8,
      name: 'Hari Laksono',
      club: 'Jabal Annur Archery Club',
      sesi1: 314,
      sesi2: 0,
      jumlahPanah: 72,
      total: 314,
      x10: 7,
      x: 4
    },
    {
      position: '16B',
      rank: 9,
      name: 'Ganjar Gumelar',
      club: 'Smack Archery',
      sesi1: 0,
      sesi2: 0,
      jumlahPanah: 0,
      total: 0,
      x10: 0,
      x: 0
    }
  ];

  // Sample elimination matches data
  const eliminationMatches: EliminationMatch[] = [
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
        scores: [2, 4]
      },
      rightPlayer: {
        rank: 8,
        name: 'Reza Holyus Perdana',
        scores: [6, 2]
      },
      status: 'completed',
      winner: 'right'
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
    }
  ];

  const navigationTabs = [
    { id: 'scoring-kualifikasi', label: 'Scoring Kualifikasi', icon: Target },
    { id: 'scoring-eliminasi', label: 'Scoring Eliminasi', icon: Target },
    { id: 'pemenang', label: 'Pemenang Kategori', icon: Trophy },
    { id: 'medal-standings', label: 'Perolehan Medali Klub', icon: TrendingUp }
  ];

  const handleNavigationTabClick = (tabId: string) => {
    setActiveNavTab(tabId);
    
    // Update URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    window.history.replaceState({}, '', url.toString());
  };

  const getFilteredParticipants = () => {
    const participants = activeTab === 'barebow' ? barebowParticipants : compoundParticipants;
    return participants; // Already sorted by rank
  };

  const filteredParticipants = getFilteredParticipants();

  // Show Winners Page if pemenang tab is active
  if (activeNavTab === 'pemenang') {
    return <DOSWinnersPage />;
  }

  // Show Medal Standings Page if medal-standings tab is active
  if (activeNavTab === 'medal-standings') {
    return <DOSMedalStandingsPage />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <PageHeader title="DOS - Director of Shooting" />

      {/* Event Info Banner */}
      <div className="w-full bg-blue-600 text-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">PRO MASTER GAMES</h1>
              <p className="text-blue-100 text-sm sm:text-base">Jakarta Timur • 27 Juni 2025</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <Badge className="bg-green-500 text-white">
                Live Event
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs 
        tabs={navigationTabs} 
        onTabClick={handleNavigationTabClick}
        activeTabId={activeNavTab}
      />

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        {activeNavTab === 'scoring-kualifikasi' ? (
          <>
            {/* Category Tabs */}
            <div className="mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
                  <TabsTrigger value="barebow">Barebow</TabsTrigger>
                  <TabsTrigger value="compound">Compound</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Filters */}
            <FilterSection
              groups={[
                {
                  label: 'Kelas',
                  children: (
                    <>
                      {['Master - 20m', 'Master - 30m'].map((kelas) => (
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
                <>
                  {/* Babak Eliminasi Status */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Babak Eliminasi</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      ✓ 8 Besar (1...)
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      <Download className="w-4 h-4 mr-2" />
                      Unduh Dokumen
                    </Button>
                  </div>
                </>
              }
            />

            {/* Qualification Table */}
            <DOSQualificationTable participants={filteredParticipants} />
          </>
        ) : (
          <>
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

            {/* Filters */}
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
                    Cetak Scoresheet
                  </Button>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    Unduh Scoresheet
                  </Button>
                </div>
              </div>
            </div>

            {/* Elimination Table */}
            <DOSEliminationTable matches={eliminationMatches} />
          </>
        )}
      </main>

      {/* Footer */}
      <PageFooter />
    </div>
  );
}