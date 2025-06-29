import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ui/theme-toggle';
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
    <div className="min-h-screen w-full content-bg flex flex-col theme-transition">
      {/* Sticky Header */}
      <header className="header-bg sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">myarchery.id</span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground p-2 hover-bg">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Back</span>
            </Button>
            
            <ThemeToggle />
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Pro Archery</span>
            </div>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground p-2 hover:text-destructive transition-colors hover-bg">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-[73px] z-40 w-full bg-primary">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px]">
          <div className="flex space-x-0 overflow-x-auto">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  tab.active || activeTab === tab.id
                    ? 'bg-primary/80 text-primary-foreground border-b-2 border-primary-foreground'
                    : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary/80'
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
            className="text-primary border-primary hover:bg-primary/10 hover-bg"
          >
            Unduh Semua No. Bantalan Peserta
          </Button>
        </div>

        {/* Info Alert */}
        <div className="mb-6">
          <div className="flex items-start space-x-3 bg-primary/5 border border-primary/20 rounded-lg p-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              Pengaturan aktif apabila pendaftaran lomba telah ditutup
            </p>
          </div>
        </div>

        {/* Form Section */}
        <Card className="mb-6 shadow-theme">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Date Input */}
              <div className="flex-1 max-w-xs">
                <Label htmlFor="bertandingTanggal" className="block text-sm font-medium text-foreground mb-2">
                  Tanggal Bertanding
                </Label>
                <Input
                  id="bertandingTanggal"
                  type="text"
                  value={bertandingTanggal}
                  onChange={(e) => setBertandingTanggal(e.target.value)}
                  className="w-full theme-transition"
                />
              </div>

              {/* Download Button */}
              <Button 
                variant="outline"
                className="text-primary border-primary hover:bg-primary/10 hover-bg"
              >
                Unduh No. Bantalan Peserta
              </Button>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/10 hover-bg"
                >
                  Ubah Bantalan Peserta
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Terapkan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="shadow-theme">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-4 px-6 text-sm font-medium text-foreground">
                      Kategori
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-foreground">
                      Awal Bantalan
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-foreground">
                      Akhir Bantalan
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-foreground">
                      Target Face
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-foreground">
                      Total Peserta
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bantalanData.map((data) => (
                    <tr key={data.kategori} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="text-sm text-foreground font-medium">
                          Kategori
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {data.kategori}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Input
                          type="number"
                          value={data.awalBantalan}
                          onChange={(e) => handleAwalBantalanChange(data.kategori, parseInt(e.target.value) || 0)}
                          className="w-full theme-transition"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Input
                          type="number"
                          value={data.akhirBantalan}
                          onChange={(e) => handleAkhirBantalanChange(data.kategori, parseInt(e.target.value) || 0)}
                          className="w-full theme-transition"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Input
                          type="number"
                          value={data.targetFace}
                          onChange={(e) => handleTargetFaceChange(data.kategori, parseInt(e.target.value) || 0)}
                          className="w-full theme-transition"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-medium text-foreground">
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
      <footer className="w-full bg-card border-t border-border py-4 sm:py-6 mt-auto theme-transition">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            2025 © MyArchery. Designed & Developed by Reka Cipta Digital
          </p>
        </div>
      </footer>
    </div>
  );
}