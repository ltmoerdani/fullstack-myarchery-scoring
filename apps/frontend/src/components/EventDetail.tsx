import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  ArrowRight,
  Target,
  User,
  LogOut,
  Copy,
  Users,
  FileText,
  Award,
  UserPlus,
  CheckCircle,
  Crosshair,
  Settings
} from 'lucide-react';

interface EventDetailProps {
  onBack: () => void;
  onPengaturanAcaraClick?: () => void;
  onPesertaIndividuClick?: () => void;
  onPertandinganClick?: () => void;
  onSertifikatClick?: () => void;
}

export function EventDetail({ 
  onBack, 
  onPengaturanAcaraClick, 
  onPesertaIndividuClick, 
  onPertandinganClick,
  onSertifikatClick 
}: EventDetailProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText('https://myarchery.id/event/pro-master-games');
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleMenuClick = (menuId: string) => {
    if (menuId === 'pengaturan-acara' && onPengaturanAcaraClick) {
      onPengaturanAcaraClick();
    } else if (menuId === 'peserta-individu' && onPesertaIndividuClick) {
      onPesertaIndividuClick();
    } else if (menuId === 'pertandingan' && onPertandinganClick) {
      onPertandinganClick();
    } else if (menuId === 'sertifikat' && onSertifikatClick) {
      onSertifikatClick();
    }
  };

  const menuItems = [
    {
      id: 'acara',
      title: 'Acara',
      description: 'Mengatur jenis pertandingan, kategori, jadwal, kuota, biaya registrasi, dan lainnya',
      icon: Target,
      status: 'published',
      statusText: 'Terpublikasi',
      statusColor: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      id: 'pengaturan-acara',
      title: 'Pengaturan Acara',
      description: 'Bantalan, Run Down, BIB, Dokumen (ID Card dan Sertifikat), FAQ',
      icon: Settings,
      status: null,
      statusText: null,
      statusColor: null
    },
    {
      id: 'peserta-individu',
      title: 'Peserta Individu',
      description: 'Melihat data peserta, mengubah kategori, status pembayaran, dan lainnya',
      icon: User,
      status: 'count',
      statusText: 'Peserta Individu:65',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 'peserta-beregu',
      title: 'Peserta Beregu',
      description: 'Melihat data peserta, mengubah kategori, status pembayaran, dan lainnya',
      icon: Users,
      status: 'count',
      statusText: 'Peserta Beregu:0',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 'pertandingan',
      title: 'Pertandingan',
      description: 'Input skor, hasil skor babak kualifikasi dan eliminasi',
      icon: Crosshair,
      status: null,
      statusText: null,
      statusColor: null
    },
    {
      id: 'laporan',
      title: 'Laporan',
      description: 'Laporan jumlah peserta, laporan keuangan, laporan pertandingan',
      icon: FileText,
      status: null,
      statusText: null,
      statusColor: null
    },
    {
      id: 'sertifikat',
      title: 'Sertifikat',
      description: 'Master e-sertifikat',
      icon: Award,
      status: null,
      statusText: null,
      statusColor: null
    },
    {
      id: 'users',
      title: 'Users',
      description: 'Mengatur pengguna pengelola event',
      icon: UserPlus,
      status: null,
      statusText: null,
      statusColor: null
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">myarchery.id</span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
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

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">PRO MASTER GAMES</h1>
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Ke Beranda</span>
            </Button>
          </div>

          {/* URL Section */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 max-w-md">
              <span className="text-sm text-gray-600 truncate">https://myarchery.id/event/pro-master-games</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyUrl}
                className="p-1 h-auto"
              >
                {copiedUrl ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500" />
                )}
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-sm">
                Ke Halaman DOS
              </Button>
              <Button variant="outline" size="sm" className="text-sm">
                Ke Live Score
              </Button>
            </div>
          </div>
        </div>

        {/* Menu Grid - Responsive with Consistent Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {menuItems.map((item) => (
            <Card 
              key={item.id}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group h-full"
              onClick={() => handleMenuClick(item.id)}
            >
              <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                {/* Header with status badge */}
                <div className="flex items-start justify-between mb-4 min-h-[24px]">
                  {item.status && (
                    <Badge 
                      variant="outline"
                      className={`text-xs px-2 sm:px-3 py-1 font-medium border ${item.statusColor}`}
                    >
                      {item.statusText}
                    </Badge>
                  )}
                  {!item.status && <div></div>}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 flex-1 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Footer with arrow */}
                <div className="flex justify-end mt-auto">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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