import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload,
  Trash2
} from 'lucide-react';

// Import common components
import { PageHeader } from '@/components/common/PageHeader';
import { PageFooter } from '@/components/common/PageFooter';

interface CertificatePageProps {
  onBack: () => void;
  onLogout?: () => void;
  onDashboard?: () => void;
}

interface CertificateSettings {
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  bold: boolean;
  backgroundImage: string | null;
}

export function CertificatePage({ 
  onBack, 
  onLogout, 
  onDashboard 
}: Readonly<CertificatePageProps>) {
  const [selectedParticipant, setSelectedParticipant] = useState('Peserta');
  const [certificateSettings, setCertificateSettings] = useState<CertificateSettings>({
    fontFamily: 'DejaVu Sans',
    fontSize: 60,
    fontColor: '#000000',
    bold: false,
    backgroundImage: null
  });

  const handleLogoClick = () => {
    if (onDashboard) {
      onDashboard();
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCertificateSettings(prev => ({
          ...prev,
          backgroundImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = () => {
    setCertificateSettings(prev => ({
      ...prev,
      backgroundImage: null
    }));
  };

  const handleSettingChange = (key: keyof CertificateSettings, value: any) => {
    setCertificateSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving certificate settings:', certificateSettings);
    // TODO: Implement save functionality
  };

  const handlePreview = () => {
    console.log('Opening certificate preview');
    // TODO: Implement preview functionality
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <PageHeader 
        title="Sertifikat Event" 
        showBackButton 
        onBack={onBack}
        onLogoClick={handleLogoClick}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        {/* Page Title and Description */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Sertifikat Event</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Klik untuk mengubah jenis dan ukuran teks. Geser untuk mengatur komposisi sertifikat.
          </p>
        </div>

        {/* Controls Section */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Participant Selector */}
          <div className="flex items-center space-x-3">
            <Label htmlFor="participant-select" className="text-sm font-medium text-gray-700">
              Peserta:
            </Label>
            <Select value={selectedParticipant} onValueChange={setSelectedParticipant}>
              <SelectTrigger className="w-48" placeholder="Pilih peserta">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Peserta">Peserta</SelectItem>
                <SelectItem value="M Rizaldi Mulia Hasibuan">M Rizaldi Mulia Hasibuan</SelectItem>
                <SelectItem value="Deni Eko Setiawan">Deni Eko Setiawan</SelectItem>
                <SelectItem value="Sigit Winarno">Sigit Winarno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handlePreview}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Pratinjau
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Simpan
            </Button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Certificate Preview - Left Side (3 columns) */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Preview Sertifikat</h3>
                
                {/* Certificate Canvas */}
                <div className="relative w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                  {/* Certificate Background */}
                  <div 
                    className="relative w-full h-96 bg-white shadow-lg"
                    style={{
                      backgroundImage: certificateSettings.backgroundImage ? `url(${certificateSettings.backgroundImage})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Default Certificate Layout */}
                    {!certificateSettings.backgroundImage && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                        {/* Event Logo */}
                        <div className="mb-6">
                          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <span className="text-white font-bold text-lg">PRO</span>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-800">MASTER GAMES</h2>
                        </div>

                        {/* Certificate Title */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">SERTIFIKAT PRESTASI</h1>

                        {/* Certificate Number */}
                        <div className="text-right w-full mb-4">
                          <p className="text-sm text-gray-600">NO. /ST/PROMASTER/VI/2025</p>
                        </div>

                        {/* Certificate Content */}
                        <div className="space-y-4 text-gray-800">
                          <p className="text-lg">Kepada</p>
                          <div 
                            className="text-2xl font-bold border-b-2 border-gray-800 pb-2 px-4"
                            style={{
                              fontFamily: certificateSettings.fontFamily,
                              fontSize: `${certificateSettings.fontSize}px`,
                              color: certificateSettings.fontColor,
                              fontWeight: certificateSettings.bold ? 'bold' : 'normal'
                            }}
                          >
                            «member_name»
                          </div>
                          <p className="text-lg">Sebagai</p>
                          <p className="text-xl">«category_name»</p>
                        </div>

                        {/* Event Details */}
                        <div className="mt-6 text-center">
                          <h3 className="text-xl font-bold text-red-600">PRO MASTER GAMES</h3>
                          <p className="text-sm text-gray-600">PRO Archery Center - LRT Cibubur</p>
                          <p className="text-sm text-gray-600">Jakarta, 27 Juni 2025</p>
                        </div>

                        {/* Signature Section */}
                        <div className="mt-6 text-right">
                          <p className="text-sm text-gray-600">Ketua Umum</p>
                          <p className="text-sm text-gray-600">PERPANI Pengkot Jakarta Timur</p>
                          <div className="mt-8">
                            <p className="text-sm font-medium">M. Rizaldi Mulia Hasibuan</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Custom Background Image */}
                    {certificateSettings.backgroundImage && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white bg-black bg-opacity-50 px-4 py-2 rounded">
                          Certificate with custom background
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Panel - Right Side (1 column) */}
          <div className="space-y-6">
            {/* Background Settings */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Latar Belakang</h4>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundUpload}
                      className="hidden"
                      id="background-upload"
                    />
                    <label
                      htmlFor="background-upload"
                      className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                        <span className="text-sm text-gray-600">Ganti Background</span>
                      </div>
                    </label>
                  </div>
                  
                  {certificateSettings.backgroundImage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveBackground}
                      className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus Background
                    </Button>
                  )}
                  
                  <p className="text-xs text-gray-500 text-center">
                    Format PNG/JPEG, maksimal 5MB
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Font Settings */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Pengaturan Font</h4>
                <div className="space-y-4">
                  {/* Font Family */}
                  <div>
                    <Label className="text-sm font-medium">Font family:</Label>
                    <Select 
                      value={certificateSettings.fontFamily} 
                      onValueChange={(value) => handleSettingChange('fontFamily', value)}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DejaVu Sans">DejaVu Sans</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Font Size */}
                  <div>
                    <Label className="text-sm font-medium">Font size:</Label>
                    <Input
                      type="number"
                      value={certificateSettings.fontSize}
                      onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value) || 60)}
                      className="mt-1"
                      min="12"
                      max="100"
                    />
                  </div>

                  {/* Font Color */}
                  <div>
                    <Label className="text-sm font-medium">Font color:</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        type="color"
                        value={certificateSettings.fontColor}
                        onChange={(e) => handleSettingChange('fontColor', e.target.value)}
                        className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={certificateSettings.fontColor}
                        onChange={(e) => handleSettingChange('fontColor', e.target.value)}
                        className="flex-1"
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  {/* Bold Toggle */}
                  <div>
                    <Label className="text-sm font-medium">Bold?</Label>
                    <Select 
                      value={certificateSettings.bold ? 'B' : 'A'} 
                      onValueChange={(value) => handleSettingChange('bold', value === 'B')}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A (Normal)</SelectItem>
                        <SelectItem value="B">B (Bold)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificate Info */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Informasi Sertifikat</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Event:</strong> PRO MASTER GAMES</p>
                  <p><strong>Tanggal:</strong> 27 Juni 2025</p>
                  <p><strong>Lokasi:</strong> Jakarta Timur</p>
                  <p><strong>Penyelenggara:</strong> PRO Archery Center</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <PageFooter />
    </div>
  );
}