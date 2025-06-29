import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target,
  Download,
  Trophy,
  Medal,
  Award,
  TrendingUp
} from 'lucide-react';

// Import existing components
import { PageHeader } from '@/components/common/PageHeader';
import { NavigationTabs } from '@/components/common/NavigationTabs';
import { FilterSection, FilterButton } from '@/components/common/FilterSection';
import { PageFooter } from '@/components/common/PageFooter';
import { DOSMedalStandingsTable } from './DOSMedalStandingsTable';

interface ClubMedalStanding {
  readonly peringkat: number;
  readonly klub: string;
  readonly logo: string;
  readonly emas: number;
  readonly perak: number;
  readonly perunggu: number;
  readonly total: number;
}

export function DOSMedalStandingsPage() {
  const [selectedKategori, setSelectedKategori] = useState('Semua Kategori');
  const [activeNavTab, setActiveNavTab] = useState('medal-standings');

  // Sample medal standings data based on the screenshot
  const medalStandingsData: ClubMedalStanding[] = [
    {
      peringkat: 1,
      klub: 'FAST KODAMAR',
      logo: '🏹', // Using emoji as placeholder for club logo
      emas: 14,
      perak: 16,
      perunggu: 11,
      total: 41
    },
    {
      peringkat: 2,
      klub: 'KINGS ARCHERY',
      logo: '👑',
      emas: 7,
      perak: 5,
      perunggu: 2,
      total: 14
    },
    {
      peringkat: 3,
      klub: 'PRO ARCHERY CLUB',
      logo: '🎯',
      emas: 6,
      perak: 10,
      perunggu: 7,
      total: 23
    },
    {
      peringkat: 4,
      klub: 'Education Archery Club',
      logo: '🎓',
      emas: 6,
      perak: 6,
      perunggu: 2,
      total: 14
    },
    {
      peringkat: 5,
      klub: 'AR-RIDHO ARCHERY',
      logo: '⭐',
      emas: 6,
      perak: 2,
      perunggu: 3,
      total: 11
    },
    {
      peringkat: 6,
      klub: 'Anugerah Archery Club',
      logo: '🏆',
      emas: 4,
      perak: 4,
      perunggu: 7,
      total: 15
    },
    {
      peringkat: 7,
      klub: 'Focus Archery Center',
      logo: '🎪',
      emas: 3,
      perak: 3,
      perunggu: 3,
      total: 9
    },
    {
      peringkat: 8,
      klub: 'PPOP DKI JAKARTA',
      logo: '🏛️',
      emas: 2,
      perak: 1,
      perunggu: 4,
      total: 7
    },
    {
      peringkat: 9,
      klub: 'JAYA RAYA',
      logo: '#️⃣',
      emas: 2,
      perak: 0,
      perunggu: 2,
      total: 4
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
    
    // Navigate to parent DOS page with specific tab
    if (tabId !== 'medal-standings') {
      const dosUrl = `/dos?tab=${tabId}`;
      window.location.href = dosUrl;
    }
  };

  const getFilteredStandings = () => {
    // For now, return all standings. Can be filtered by category in the future
    return medalStandingsData;
  };

  const filteredStandings = getFilteredStandings();

  // Calculate total medals across all clubs
  const totalMedals = filteredStandings.reduce((acc, club) => ({
    emas: acc.emas + club.emas,
    perak: acc.perak + club.perak,
    perunggu: acc.perunggu + club.perunggu,
    total: acc.total + club.total
  }), { emas: 0, perak: 0, perunggu: 0, total: 0 });

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <PageHeader title="DOS - Perolehan Medali Klub" />

      {/* Event Info Banner */}
      <div className="w-full bg-blue-600 text-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">JAKARTA SERIES I ARCHERY COMPETITION 2022</h1>
              <p className="text-blue-100 text-sm sm:text-base">Perolehan Medali Klub</p>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center space-x-2">
              <Badge className="bg-green-500 text-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                Medal Standings
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
        {/* Filters and Actions */}
        <FilterSection
          groups={[
            {
              label: 'Kategori',
              children: (
                <>
                  {['Semua Kategori', 'Umum - Nasional', 'U-15 - Nasional', 'Mix Team'].map((kategori) => (
                    <FilterButton
                      key={kategori}
                      active={selectedKategori === kategori}
                      onClick={() => setSelectedKategori(kategori)}
                    >
                      {kategori}
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
                Unduh Perolehan Medali
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Cetak Laporan
              </Button>
            </div>
          }
        />

        {/* Medal Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Total Emas</p>
                <p className="text-2xl font-bold">{totalMedals.emas}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-100" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-100 text-sm">Total Perak</p>
                <p className="text-2xl font-bold">{totalMedals.perak}</p>
              </div>
              <Medal className="w-8 h-8 text-gray-100" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Total Perunggu</p>
                <p className="text-2xl font-bold">{totalMedals.perunggu}</p>
              </div>
              <Award className="w-8 h-8 text-orange-100" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Medali</p>
                <p className="text-2xl font-bold">{totalMedals.total}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-100" />
            </div>
          </div>
        </div>

        {/* Medal Standings Table */}
        <DOSMedalStandingsTable standings={filteredStandings} />

        {/* Additional Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Trophy className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Informasi Perolehan Medali</p>
              <p>
                Peringkat ditentukan berdasarkan jumlah medali emas terbanyak, kemudian medali perak, 
                dan terakhir medali perunggu. Total {filteredStandings.length} klub berpartisipasi 
                dalam kompetisi ini dengan total {totalMedals.total} medali yang diperebutkan.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <PageFooter />
    </div>
  );
}