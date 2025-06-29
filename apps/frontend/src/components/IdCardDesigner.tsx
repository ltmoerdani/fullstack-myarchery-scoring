import { useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Target,
  User,
  LogOut,
  Home,
  Settings,
  CreditCard,
  Info,
  Upload,
  X,
  Move,
  ChevronLeft
} from 'lucide-react';

interface IdCardDesignerProps {
  onBack: () => void;
}

interface DraggableField {
  id: string;
  type: 'text' | 'image';
  label: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontWeight: string;
  color: string;
  isDragging: boolean;
}

interface FontSettings {
  fontSize: number;
  fontWeight: string;
  color: string;
}

export function IdCardDesigner({ onBack }: Readonly<IdCardDesignerProps>) {
  const [activeTab, setActiveTab] = useState('id-card');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState<DraggableField[]>([
    {
      id: 'nama-peserta',
      type: 'text',
      label: 'Nama Peserta',
      content: 'Nama Peserta',
      x: 100,
      y: 80,
      width: 200,
      height: 30,
      fontSize: 16,
      fontWeight: 'normal',
      color: '#000000',
      isDragging: false
    },
    {
      id: 'asal-klub',
      type: 'text',
      label: 'Asal Klub',
      content: 'Asal Klub',
      x: 100,
      y: 120,
      width: 200,
      height: 30,
      fontSize: 14,
      fontWeight: 'normal',
      color: '#000000',
      isDragging: false
    },
    {
      id: 'kategori-pertandingan',
      type: 'text',
      label: 'Kategori Pertandingan',
      content: 'Kategori Pertandingan',
      x: 100,
      y: 160,
      width: 200,
      height: 30,
      fontSize: 14,
      fontWeight: 'normal',
      color: '#000000',
      isDragging: false
    },
    {
      id: 'nomor-bantalan',
      type: 'text',
      label: 'Nomor Bantalan',
      content: 'Nomor Bantalan',
      x: 100,
      y: 200,
      width: 200,
      height: 60,
      fontSize: 48,
      fontWeight: 'bold',
      color: '#000000',
      isDragging: false
    }
  ]);

  const [availableData] = useState([
    { id: 'nama-peserta', label: 'Nama Peserta', selected: true },
    { id: 'kategori-pertandingan', label: 'Kategori Pertandingan', selected: true },
    { id: 'asal-klub', label: 'Asal Klub', selected: true },
    { id: 'nomor-bantalan', label: 'Nomor Bantalan', selected: true }
  ]);

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'bantalan', label: 'Bantalan', icon: Settings },
    { id: 'id-card', label: 'ID Card', icon: CreditCard, active: true }
  ];

  const handleFieldClick = (fieldId: string) => {
    setSelectedField(fieldId);
  };

  const handleFieldDrag = useCallback((fieldId: string, deltaX: number, deltaY: number) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId 
        ? { ...field, x: Math.max(0, field.x + deltaX), y: Math.max(0, field.y + deltaY) }
        : field
    ));
  }, []);

  const handleMouseDown = (e: React.MouseEvent, fieldId: string) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      handleFieldDrag(fieldId, deltaX, deltaY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const updateFieldFont = (fieldId: string, settings: Partial<FontSettings>) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId 
        ? { ...field, ...settings }
        : field
    ));
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedFieldData = selectedField ? fields.find(f => f.id === selectedField) : null;

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
                onClick={() => setActiveTab(tab.id)}
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
        {/* Action Buttons */}
        <div className="flex justify-end mb-6 space-x-3">
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            Pratinjau
          </Button>
          <Button variant="secondary" className="bg-gray-300 text-gray-700">
            Simpan
          </Button>
        </div>

        {/* Info Alert */}
        <div className="mb-6">
          <div className="flex items-start space-x-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Geser keterangan yang ada di dalam ID Card sesuai yang Anda inginkan
            </p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Canvas ID Card</h3>
                
                {/* Canvas */}
                <div 
                  ref={canvasRef}
                  className="relative w-full h-96 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
                  style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* ID Card Preview */}
                  <div className="absolute inset-4 bg-white rounded-lg shadow-lg overflow-hidden">
                    {fields.map((field) => (
                      <button
                        key={field.id}
                        className={`absolute cursor-move select-none border-2 transition-colors ${
                          selectedField === field.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-transparent hover:border-blue-300'
                        }`}
                        style={{
                          left: field.x,
                          top: field.y,
                          width: field.width,
                          height: field.height,
                          fontSize: field.fontSize,
                          fontWeight: field.fontWeight,
                          color: field.color,
                          padding: '4px',
                          textAlign: 'left',
                          background: 'transparent'
                        }}
                        onClick={() => handleFieldClick(field.id)}
                        onMouseDown={(e) => handleMouseDown(e, field.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleFieldClick(field.id);
                          }
                          // Arrow key navigation for moving the field
                          const MOVE_STEP = 5;
                          if (e.key.startsWith('Arrow')) {
                            e.preventDefault();
                            const newField = { ...field };
                            switch (e.key) {
                              case 'ArrowUp':
                                newField.y = Math.max(0, field.y - MOVE_STEP);
                                break;
                              case 'ArrowDown':
                                newField.y = field.y + MOVE_STEP;
                                break;
                              case 'ArrowLeft':
                                newField.x = Math.max(0, field.x - MOVE_STEP);
                                break;
                              case 'ArrowRight':
                                newField.x = field.x + MOVE_STEP;
                                break;
                            }
                            setFields(fields.map(f => f.id === field.id ? newField : f));
                          }
                        }}
                        aria-pressed={selectedField === field.id}
                        aria-label={`${field.label} field, draggable`}
                      >
                        {selectedField === field.id && (
                          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1" aria-hidden="true">
                            <Move className="w-3 h-3" />
                            <span>{field.label}</span>
                          </div>
                        )}
                        {field.content}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Background Upload */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Latar</h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center space-x-2 h-20 border-dashed"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="text-sm">Unggah Latar</span>
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 text-center">
                    Unggah gambar sesuai ukuran kertas cetak dengan besar file maks 5MB, format PNG/JPEG
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Print Settings */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Ukuran Cetak</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm">
                      <option>A5 (14,8 cm x 21 cm)</option>
                      <option>A4 (21 cm x 29,7 cm)</option>
                      <option>A3 (29,7 cm x 42 cm)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Orientasi</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm">
                      <option>Portrait</option>
                      <option>Landscape</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Fields */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Data</h4>
                <div className="space-y-2">
                  {availableData.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <span className="text-sm">{item.label}</span>
                      {item.selected && (
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Font Settings */}
            {selectedFieldData && (
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Pengaturan Font</h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Ukuran Font</Label>
                      <Input
                        type="number"
                        value={selectedFieldData.fontSize}
                        onChange={(e) => updateFieldFont(selectedField!, { fontSize: parseInt(e.target.value) || 12 })}
                        className="mt-1"
                        min="8"
                        max="72"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Ketebalan Font</Label>
                      <select 
                        value={selectedFieldData.fontWeight}
                        onChange={(e) => updateFieldFont(selectedField!, { fontWeight: e.target.value })}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="lighter">Light</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Warna Font</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="color"
                          value={selectedFieldData.color}
                          onChange={(e) => updateFieldFont(selectedField!, { color: e.target.value })}
                          className="w-8 h-8 border border-gray-300 rounded"
                        />
                        <Input
                          type="text"
                          value={selectedFieldData.color}
                          onChange={(e) => updateFieldFont(selectedField!, { color: e.target.value })}
                          className="flex-1"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Text Settings */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Teks</h4>
                <p className="text-sm text-gray-500 text-center py-4">
                  Belum ada teks terseleksi
                </p>
              </CardContent>
            </Card>
          </div>
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