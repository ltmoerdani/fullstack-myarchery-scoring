import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target,
  Home,
  Download,
  Search,
  Settings
} from 'lucide-react';

// Import new components
import { PageHeader } from '@/components/common/PageHeader';
import { NavigationTabs } from '@/components/common/NavigationTabs';
import { FilterSection, FilterButton } from '@/components/common/FilterSection';
import { PageFooter } from '@/components/common/PageFooter';
import { QualificationTable } from '@/components/scoring/QualificationTable';
import { ScoringDetailPanel } from '@/components/scoring/ScoringDetailPanel';

interface ScoringQualificationProps {
  readonly onBack: () => void;
  readonly onNavigate?: (page: string) => void;
  readonly onLogout?: () => void;
  readonly onDashboard?: () => void;
}

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
  readonly scores?: {
    readonly session1: number[];
    readonly session2: number[];
    readonly shootOff?: number[];
  };
}

export function ScoringQualification({ 
  onBack, 
  onNavigate, 
  onLogout, 
  onDashboard 
}: Readonly<ScoringQualificationProps>) {
  const [activeTab, setActiveTab] = useState('barebow');
  const [selectedKelas, setSelectedKelas] = useState('Master - 20m');
  const [selectedJenisRegu, setSelectedJenisRegu] = useState('Individu Putra');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<Set<string>>(new Set());
  const [activeNavTab, setActiveNavTab] = useState('scoring-kualifikasi');

  // Sample data for Barebow
  const barebowParticipants: Participant[] = [
    {
      position: '3A',
      rank: 44,
      name: 'Fitria Yulianto',
      club: 'Kompak DJP',
      sesi1: 0,
      sesi2: 0,
      jumlahPanah: 0,
      total: 0,
      x10: 0,
      x: 0
    },
    {
      position: '3B',
      rank: 7,
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
      position: '3C',
      rank: 26,
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
      position: '3D',
      rank: 9,
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
      position: '4A',
      rank: 8,
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
      position: '4B',
      rank: 14,
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
      position: '4C',
      rank: 35,
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
      position: '4D',
      rank: 30,
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
      position: '5A',
      rank: 18,
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
      position: '5B',
      rank: 10,
      name: 'Abu Gaza',
      club: 'EAST ARCHERY TEAM',
      sesi1: 327,
      sesi2: 326,
      jumlahPanah: 72,
      total: 653,
      x10: 22,
      x: 10
    }
  ];

  // Sample data for Compound
  const compoundParticipants: Participant[] = [
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
    }
  ];

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
        // Stay on current page
        break;
      case 'scoring-eliminasi':
        // Navigate to scoring elimination page
        if (onNavigate) {
          onNavigate('scoring-eliminasi');
        }
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

  const getFilteredParticipants = () => {
    const participants = activeTab === 'barebow' ? barebowParticipants : compoundParticipants;
    
    if (!searchTerm) return participants;
    
    return participants.filter(participant =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.club.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleParticipantClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDetailExpanded(true);
  };

  const handleCloseDetail = () => {
    setIsDetailExpanded(false);
    setSelectedParticipant(null);
  };

  const handleParticipantSelect = (position: string, selected: boolean) => {
    setSelectedParticipants(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(position);
      } else {
        newSet.delete(position);
      }
      return newSet;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allPositions = filteredParticipants.map(p => p.position);
      setSelectedParticipants(new Set(allPositions));
    } else {
      setSelectedParticipants(new Set());
    }
  };

  const filteredParticipants = getFilteredParticipants();

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <PageHeader 
        title="Scoring Kualifikasi" 
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
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
              <TabsTrigger value="barebow">Barebow</TabsTrigger>
              <TabsTrigger value="compound">Compound</TabsTrigger>
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

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari peserta"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-48 text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  <Download className="w-4 h-4 mr-2" />
                  Unduh Dokumen
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                  Batalkan Bagan Eliminasi
                </Button>
              </div>
            </>
          }
        />

        {/* Main Scoring Table */}
        <div className={`grid ${isDetailExpanded ? 'grid-cols-2 gap-6' : 'grid-cols-1'}`}>
          {/* Main Table Column */}
          <div className="w-full">
            <QualificationTable
              participants={filteredParticipants}
              selectedParticipants={selectedParticipants}
              onParticipantSelect={handleParticipantSelect}
              onSelectAll={handleSelectAll}
              onParticipantClick={handleParticipantClick}
              selectedParticipant={selectedParticipant}
            />
          </div>

          {/* Detail Column */}
          {isDetailExpanded && selectedParticipant && (
            <div className="w-full">
              <ScoringDetailPanel
                participant={selectedParticipant}
                onClose={handleCloseDetail}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <PageFooter />
    </div>
  );
}