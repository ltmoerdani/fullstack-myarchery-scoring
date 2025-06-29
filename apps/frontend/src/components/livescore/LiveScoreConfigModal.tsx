import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Settings,
  X,
  Play,
  Info
} from 'lucide-react';

interface LiveScoreConfig {
  competitionType: 'kualifikasi' | 'eliminasi';
  categories: string[];
  session: 'semua' | 'sesi1' | 'sesi2';
}

interface LiveScoreConfigModalProps {
  onSave: (config: LiveScoreConfig) => void;
  onCancel: () => void;
  initialConfig: LiveScoreConfig;
}

export function LiveScoreConfigModal({ 
  onSave, 
  onCancel, 
  initialConfig 
}: LiveScoreConfigModalProps) {
  const [competitionType, setCompetitionType] = useState<'kualifikasi' | 'eliminasi'>(
    initialConfig.competitionType
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialConfig.categories.length > 0 ? initialConfig.categories : ['Recurve - Umum - 70m']
  );
  const [session, setSession] = useState(initialConfig.session);

  // Available categories
  const availableCategories = [
    'Recurve - Umum - 70m',
    'Compound - Umum - 50m',
    'Recurve - U-15 - 50m',
    'Recurve - Master - 70m',
    'Compound - U-15 - 40m',
    'Compound - Master - 50m',
    'Nasional - Umum - 50m,40m,30m',
    'Nasional - U-15 - 30m',
    'Nasional - U-12 - 15m',
    'Nasional - U-9 - 10m',
    'Barebow - Umum - 50m'
  ];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        // Don't allow removing if it's the last category
        if (prev.length === 1) return prev;
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSave = () => {
    const config: LiveScoreConfig = {
      competitionType,
      categories: selectedCategories,
      session
    };
    onSave(config);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <CardHeader className="pb-4 bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <Settings className="h-6 w-6" />
              <span className="text-xl">Pengaturan Live Score</span>
            </CardTitle>
            <button
              type="button"
              onClick={onCancel}
              className="h-8 w-8 p-0 bg-transparent border-none flex items-center justify-center hover:bg-blue-500 rounded text-white"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-blue-100 mt-2">
            Pengaturan Live Score yang Ditampilkan untuk Streaming pada Layar Televisi.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8 p-6">
          {/* Competition Type Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-gray-900">Jenis Kompetisi</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setCompetitionType('kualifikasi')}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                  competitionType === 'kualifikasi'
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 ${
                  competitionType === 'kualifikasi' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {competitionType === 'kualifikasi' && (
                    <div className="w-3 h-3 bg-white rounded-full m-0.5" />
                  )}
                </div>
                <span className="text-lg font-medium">Kualifikasi</span>
              </button>
              
              <button
                type="button"
                onClick={() => setCompetitionType('eliminasi')}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                  competitionType === 'eliminasi'
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 ${
                  competitionType === 'eliminasi' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {competitionType === 'eliminasi' && (
                    <div className="w-3 h-3 bg-white rounded-full m-0.5" />
                  )}
                </div>
                <span className="text-lg font-medium">Eliminasi</span>
              </button>
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-gray-900">Kategori</Label>
            <div className="border-2 border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto bg-gray-50">
              <div className="grid grid-cols-1 gap-3">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-3 p-2 bg-white rounded border">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-base text-gray-700 cursor-pointer flex-1 font-medium"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Selected Categories Display */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Kategori Terpilih:</p>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="text-sm px-3 py-1 bg-blue-100 text-blue-800 border-blue-200"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                      disabled={selectedCategories.length === 1}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Anda dapat memilih lebih dari satu kategori untuk ditampilkan di TV secara bergantian.
              </p>
            </div>
          </div>

          {/* Session Selection */}
          <div className="space-y-4">
            <Label htmlFor="session-select" className="text-lg font-semibold text-gray-900">
              Sesi
            </Label>
            <Select<'semua' | 'sesi1' | 'sesi2'> value={session} onValueChange={setSession}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih sesi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Sesi</SelectItem>
                <SelectItem value="sesi1">Sesi 1</SelectItem>
                <SelectItem value="sesi2">Sesi 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-2">Informasi Live Score</p>
                <ul className="space-y-1">
                  <li>• Live score akan menampilkan data secara real-time dengan font besar untuk proyektor</li>
                  <li>• Data akan bergulir otomatis setiap 4 detik untuk menampilkan semua peserta</li>
                  <li>• Resolusi optimal: 1600x1000 pixels untuk proyektor</li>
                  <li>• Konfigurasi dapat diubah kapan saja selama live score berjalan</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-8 py-3 text-base"
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="px-8 py-3 text-base bg-blue-600 hover:bg-blue-700"
              disabled={selectedCategories.length === 0}
            >
              <Play className="mr-2 h-5 w-5" />
              Terapkan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}