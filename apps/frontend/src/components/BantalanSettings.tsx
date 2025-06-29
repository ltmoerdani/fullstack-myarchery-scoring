import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Target,
  User,
  LogOut,
  Home,
  Settings,
  CreditCard,
  Info,
  ChevronLeft
} from 'lucide-react';

interface BantalanSettingsProps {
  onIdCardClick?: () => void;
  onBack: () => void;
}

interface BantalanData {
  kategori: string;
  awalBantalan: number;
  akhirBantalan: number;
  targetFace: number;
  totalPeserta: number;
}

export function BantalanSettings({ onIdCardClick, onBack }: Readonly<BantalanSettingsProps>) {
  const [bertandingTanggal, setBertandingTanggal] = useState('27/06/2025');
  const [activeTab, setActiveTab] = useState('bantalan');
  
  const [bantalanData, setBantalanData] = useState<BantalanData[]>([
    {
      kategori: 'Barebow - Master - 20m - Individu Putri',
      awalBantalan: 1,
      akhirBantalan: 2,
      targetFace: 4,
      totalPeserta: 8
    },
    {
      kategori: 'Barebow - Master - 20m - Individu Putra',
      awalBantalan: 3,
      akhirBantalan: 14,
      targetFace: 4,
      totalPeserta: 44
    },
    {
      kategori: 'Compound - Master - 30m - Individu Putri',
      awalBantalan: 15,
      akhirBantalan: 16,
      targetFace: 4,
      totalPeserta: 4
    },
    {
      kategori: 'Compound - Master - 30m - Individu Putra',
      awalBantalan: 17,
      akhirBantalan: 19,
      targetFace: 4,
      totalPeserta: 9
    }
  ]);

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'bantalan', label: 'Bantalan', icon: Settings, active: true },
    { id: 'id-card', label: 'ID Card', icon: CreditCard }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'id-card' && onIdCardClick) {
      onIdCardClick();
    }
  };

  const handleUnduhNoBantalan = () => {
    console.log('Unduh No. Bantalan Peserta');
  };

  const handleUnduhSemuaNoBantalan = () => {
    console.log('Unduh Semua No. Bantalan Peserta');
  };

  const handleUbahBantalanPeserta = () => {
    console.log('Ubah Bantalan Peserta');
  };

  const handleTerapkan = () => {
    console.log('Terapkan perubahan');
  };

  // Untuk update array, gunakan map dan update berdasarkan kategori
  const handleAwalBantalanChange = (kategori: string, value: number) => {
    setBantalanData((prev) => prev.map((item) =>
      item.kategori === kategori ? { ...item, awalBantalan: value } : item
    ));
  };
  const handleAkhirBantalanChange = (kategori: string, value: number) => {
    setBantalanData((prev) => prev.map((item) =>
      item.kategori === kategori ? { ...item, akhirBantalan: value } : item
    ));
  };
  const handleTargetFaceChange = (kategori: string, value: number) => {
    setBantalanData((prev) => prev.map((item) =>
      item.kategori === kategori ? { ...item, targetFace: value } : item
    ));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">myarchery.id</span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 p-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Back</span>
            </Button>
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Pro Archery</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-600 p-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full bg-blue-700">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px]">
          <div className="flex space-x-0 overflow-x-auto">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  tab.active || activeTab === tab.id
                    ? 'bg-blue-600 text-white border-b-2 border-white'
                    : 'text-blue-100 hover:text-white hover:bg-blue-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        {/* Action Buttons - Top Right */}
        <div className="flex justify-end mb-6 space-x-3">
          <Button 
            variant="outline" 
            onClick={handleUnduhSemuaNoBantalan}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Unduh Semua No. Bantalan Peserta
          </Button>
        </div>

        {/* Info Alert */}
        <div className="mb-6">
          <div className="flex items-start space-x-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Pengaturan aktif apabila pendaftaran lomba telah ditutup
            </p>
          </div>
        </div>

        {/* Form Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Date Input */}
              <div className="flex-1 max-w-xs">
                <label htmlFor="bertandingTanggal" className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Bertanding
                </label>
                <Input
                  id="bertandingTanggal"
                  type="text"
                  value={bertandingTanggal}
                  onChange={(e) => setBertandingTanggal(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Download Button */}
              <Button 
                variant="outline"
                onClick={handleUnduhNoBantalan}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Unduh No. Bantalan Peserta
              </Button>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  variant="outline"
                  onClick={handleUbahBantalanPeserta}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Ubah Bantalan Peserta
                </Button>
                <Button 
                  onClick={handleTerapkan}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Terapkan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                      Kategori
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-700">
                      Awal Bantalan
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-700">
                      Akhir Bantalan
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-700">
                      Target Face
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-700">
                      Total Peserta
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bantalanData.map((data) => (
                    <tr key={data.kategori} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-900 font-medium">
                          Kategori
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {data.kategori}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Input
                          id="awalBantalan"
                          type="number"
                          value={data.awalBantalan}
                          onChange={(e) => handleAwalBantalanChange(data.kategori, parseInt(e.target.value) || 0)}
                          className="w-full"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Input
                          id="akhirBantalan"
                          type="number"
                          value={data.akhirBantalan}
                          onChange={(e) => handleAkhirBantalanChange(data.kategori, parseInt(e.target.value) || 0)}
                          className="w-full"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Input
                          id="targetFace"
                          type="number"
                          value={data.targetFace}
                          onChange={(e) => handleTargetFaceChange(data.kategori, parseInt(e.target.value) || 0)}
                          className="w-full"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-medium text-gray-900">
                          {data.totalPeserta}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 sm:py-6 mt-auto">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            2025 © MyArchery. Designed & Developed by Reka Cipta Digital
          </p>
        </div>
      </footer>
    </div>
  );
}