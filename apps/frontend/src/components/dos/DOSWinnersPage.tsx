import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target,
  Download,
  Trophy,
  Medal,
  Award
} from 'lucide-react';

// Import existing components
import { PageHeader } from '@/components/common/PageHeader';
import { NavigationTabs } from '@/components/common/NavigationTabs';
import { FilterSection, FilterButton } from '@/components/common/FilterSection';
import { PageFooter } from '@/components/common/PageFooter';
import { DOSWinnersTable } from './DOSWinnersTable';

interface Winner {
  readonly kategori: string;
  readonly medali: 'gold' | 'silver' | 'bronze';
  readonly nama: string;
  readonly klub: string;
  readonly skor?: number;
  readonly type: 'kualifikasi' | 'eliminasi';
}

export function DOSWinnersPage() {
  const [activeNavTab, setActiveNavTab] = useState('pemenang');
  const [activeTab, setActiveTab] = useState<'kualifikasi' | 'eliminasi'>('kualifikasi');
  const [selectedHari, setSelectedHari] = useState('Jumat, 04 Maret 2022');
  const [selectedKategori, setSelectedKategori] = useState('Semua');

  // Sample winners data based on the screenshot
  const winnersData: Winner[] = [
    // Kualifikasi Winners
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putra',
      medali: 'gold',
      nama: 'Ahmad Fahmi Alfarizi',
      klub: 'FAST KODAMAR',
      skor: 850,
      type: 'kualifikasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putra',
      medali: 'silver',
      nama: 'Zaki Malique',
      klub: 'FAST KODAMAR',
      skor: 845,
      type: 'kualifikasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putra',
      medali: 'bronze',
      nama: 'Ghaisan Nabiel Rahman',
      klub: 'FAST KODAMAR',
      skor: 840,
      type: 'kualifikasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putra',
      medali: 'gold',
      nama: 'Azaria Kinaura Anagatria',
      klub: 'Blue Feather Archery',
      skor: 835,
      type: 'kualifikasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putri',
      medali: 'gold',
      nama: 'Azka Naira Hanifah',
      klub: 'FAST KODAMAR',
      skor: 820,
      type: 'kualifikasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putri',
      medali: 'silver',
      nama: 'TALITA AZMI EL ABBASY',
      klub: 'FAST KODAMAR',
      skor: 815,
      type: 'kualifikasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Mix Team',
      medali: 'gold',
      nama: 'FAST KODAMAR 1',
      klub: 'FAST KODAMAR',
      type: 'kualifikasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Mix Team',
      medali: 'silver',
      nama: 'FAST KODAMAR 2',
      klub: 'FAST KODAMAR',
      type: 'kualifikasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Mix Team',
      medali: 'bronze',
      nama: 'Blue Feather Archery 1',
      klub: 'Blue Feather Archery',
      type: 'kualifikasi'
    },

    // Eliminasi Winners
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putra',
      medali: 'gold',
      nama: 'Ahmad Fahmi Alfarizi',
      klub: 'FAST KODAMAR',
      type: 'eliminasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putra',
      medali: 'silver',
      nama: 'Zaki Malique',
      klub: 'FAST KODAMAR',
      type: 'eliminasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putra',
      medali: 'bronze',
      nama: 'Aurel Dastra',
      klub: 'Blue Feather Archery',
      type: 'eliminasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putri',
      medali: 'gold',
      nama: 'Maritza Nindya Putri',
      klub: 'Power Archery',
      type: 'eliminasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putri',
      medali: 'silver',
      nama: 'Meischa Leora Adhilea',
      klub: 'FAST KODAMAR',
      type: 'eliminasi'
    },
    {
      kategori: 'Umum - Nasional - 50m,40m,30m - Individu Putri',
      medali: 'bronze',
      nama: 'TALITA AZMI EL ABBASY',
      klub: 'FAST KODAMAR',
      type: 'eliminasi'
    },
    {
      kategori: 'U-15 - Nasional - 30m - Individu Putri',
      medali: 'gold',
      nama: 'FAVIAN ARIO JAYALAKSANA',
      klub: 'Education Archery Club',
      type: 'eliminasi'
    },
    {
      kategori: 'U-15 - Nasional - 30m - Individu Putri',
      medali: 'silver',
      nama: 'RADIKA ABIY BAGASKORO',
      klub: 'Education Archery Club',
      type: 'eliminasi'
    },
    {
      kategori: 'U-15 - Nasional - 30m - Individu Putri',
      medali: 'bronze',
      nama: 'Muhammad Azka Ghaisan',
      klub: 'KINGS ARCHERY',
      type: 'eliminasi'
    }
  ];

  const navigationTabs = [
    { id: 'scoring-kualifikasi', label: 'Scoring Kualifikasi', icon: Target },
    { id: 'scoring-eliminasi', label: 'Scoring Eliminasi', icon: Target },
    { id: 'pemenang', label: 'Pemenang Kategori', icon: Trophy }
  ];

  const handleNavigationTabClick = (tabId: string) => {
    setActiveNavTab(tabId);
    
    // Navigate to parent DOS page with specific tab
    if (tabId !== 'pemenang') {
      const dosUrl = `/dos?tab=${tabId}`;
      window.location.href = dosUrl;
    }
  };

  const getFilteredWinners = () => {
    return winnersData.filter(winner => {
      const matchesType = winner.type === activeTab;
      const matchesKategori = selectedKategori === 'Semua' || winner.kategori.includes(selectedKategori);
      return matchesType && matchesKategori;
    });
  };

  const filteredWinners = getFilteredWinners();

  // Get unique categories for filter
  const categories = ['Semua', 'Umum - Nasional', 'U-15 - Nasional'];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <PageHeader title="DOS - Pemenang Kategori" />

      {/* Event Info Banner */}
      <div className="w-full bg-blue-600 text-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">JAKARTA SERIES I ARCHERY COMPETITION 2022</h1>
              <p className="text-blue-100 text-sm sm:text-base">Pemenang Kategori</p>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center space-x-2">
              <Badge className="bg-green-500 text-white">
                <Trophy className="w-3 h-3 mr-1" />
                Final Results
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
        {/* Date Selection */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <span className="font-medium">Hari:</span>
            <div className="flex space-x-2">
              {['Jumat, 04 Maret 2022', 'Sabtu, 05 Maret 2022', 'Minggu, 06 Maret 2022'].map((hari) => (
                <FilterButton
                  key={hari}
                  active={selectedHari === hari}
                  onClick={() => setSelectedHari(hari)}
                >
                  {hari.split(', ')[0]}
                </FilterButton>
              ))}
            </div>
          </div>
        </div>

        {/* Competition Type Tabs */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
              <TabsTrigger value="kualifikasi" className="flex items-center space-x-2">
                <Medal className="w-4 h-4" />
                <span>Kualifikasi</span>
              </TabsTrigger>
              <TabsTrigger value="eliminasi" className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Eliminasi</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Filters and Actions */}
        <FilterSection
          groups={[
            {
              label: 'Kategori',
              children: (
                <>
                  {categories.map((kategori) => (
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
                Unduh Daftar Pemenang
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Trophy className="w-4 h-4 mr-2" />
                Cetak Sertifikat
              </Button>
            </div>
          }
        />

        {/* Winners Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Medali Emas</p>
                <p className="text-2xl font-bold">
                  {filteredWinners.filter(w => w.medali === 'gold').length}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-100" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-100 text-sm">Medali Perak</p>
                <p className="text-2xl font-bold">
                  {filteredWinners.filter(w => w.medali === 'silver').length}
                </p>
              </div>
              <Medal className="w-8 h-8 text-gray-100" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Medali Perunggu</p>
                <p className="text-2xl font-bold">
                  {filteredWinners.filter(w => w.medali === 'bronze').length}
                </p>
              </div>
              <Award className="w-8 h-8 text-orange-100" />
            </div>
          </div>
        </div>

        {/* Winners Table */}
        <DOSWinnersTable 
          winners={filteredWinners} 
          competitionType={activeTab}
        />
      </main>

      {/* Footer */}
      <PageFooter />
    </div>
  );
}