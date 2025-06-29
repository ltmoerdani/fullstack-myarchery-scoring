import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  Target,
  ChevronLeft,
  Calendar,
  Clock,
  Settings,
  Users,
  Trophy,
  Plus,
  Minus,
  Info
} from 'lucide-react';

// Import common components
import { PageHeader } from '@/components/common/PageHeader';
import { PageFooter } from '@/components/common/PageFooter';

const createEventSchema = z.object({
  eventName: z.string().min(1, 'Nama event wajib diisi').max(100, 'Nama terlalu panjang'),
  startDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
  startTime: z.string().min(1, 'Waktu mulai wajib diisi'),
  endDate: z.string().min(1, 'Tanggal selesai wajib diisi'),
  endTime: z.string().min(1, 'Waktu selesai wajib diisi'),
  bookingCloseDate: z.string().min(1, 'Tanggal tutup booking wajib diisi'),
  bookingCloseTime: z.string().min(1, 'Waktu tutup booking wajib diisi'),
  delegationType: z.enum(['open', 'selected']),
  selectType: z.string().optional(),
});

type CreateEventFormData = z.infer<typeof createEventSchema>;

interface Category {
  id: string;
  category: string;
  typeClass: string;
  className: string;
  distance: string;
}

interface CreateEventPageProps {
  onBack: () => void;
  onLogout?: () => void;
  onDashboard?: () => void;
}

export function CreateEventPage({ 
  onBack, 
  onLogout, 
  onDashboard 
}: Readonly<CreateEventPageProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      category: 'Compound',
      typeClass: 'Master',
      className: 'Master',
      distance: '30 Meter'
    },
    {
      id: '2',
      category: 'Barebow',
      typeClass: 'Master',
      className: 'Master',
      distance: '20 Meter'
    }
  ]);
  const [delegationType, setDelegationType] = useState<'open' | 'selected'>('selected');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      eventName: '',
      startDate: '2025-06-27',
      startTime: '07:30',
      endDate: '2025-06-27',
      endTime: '17:00',
      bookingCloseDate: '2025-06-24',
      bookingCloseTime: '23:59',
      delegationType: 'selected',
      selectType: 'Club/Team',
    },
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

  const handleFormSubmit = async (data: CreateEventFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Event data:', {
        ...data,
        categories,
        delegationType
      });

      toast({
        title: "Event Berhasil Dibuat",
        description: "Event baru telah berhasil dibuat dan disimpan.",
      });

      // Navigate back to dashboard or event list
      onBack();
    } catch (error) {
      console.error('Failed to create event:', error);
      toast({
        variant: "destructive",
        title: "Gagal Membuat Event",
        description: "Terjadi kesalahan saat membuat event. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      category: 'Compound',
      typeClass: 'Master',
      className: 'Master',
      distance: '30 Meter'
    };
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (id: string) => {
    if (categories.length > 1) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const updateCategory = (id: string, field: keyof Category, value: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  return (
    <div className="min-h-screen w-full content-bg flex flex-col theme-transition">
      {/* Header */}
      <PageHeader 
        title="Tambah Event Baru" 
        showBackButton 
        onBack={onBack}
        onLogoClick={handleLogoClick}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Event Basic Information */}
          <Card className="shadow-theme">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Informasi Event</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Event Name */}
              <div className="space-y-2">
                <Label htmlFor="eventName" className="text-sm font-medium">
                  Nama Event *
                </Label>
                <Input
                  id="eventName"
                  type="text"
                  placeholder="Masukkan nama event"
                  className={`theme-transition ${errors.eventName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  {...register('eventName')}
                  disabled={isSubmitting}
                />
                {errors.eventName && (
                  <p className="text-sm text-destructive">{errors.eventName.message}</p>
                )}
              </div>

              {/* Event Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date & Time */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-medium">
                      Start Date *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startDate"
                        type="date"
                        className={`pl-10 theme-transition ${errors.startDate ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        {...register('startDate')}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.startDate && (
                      <p className="text-sm text-destructive">{errors.startDate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-sm font-medium">
                      Start Time *
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startTime"
                        type="time"
                        className={`pl-10 theme-transition ${errors.startTime ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        {...register('startTime')}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.startTime && (
                      <p className="text-sm text-destructive">{errors.startTime.message}</p>
                    )}
                  </div>
                </div>

                {/* End Date & Time */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-medium">
                      End Date *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endDate"
                        type="date"
                        className={`pl-10 theme-transition ${errors.endDate ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        {...register('endDate')}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.endDate && (
                      <p className="text-sm text-destructive">{errors.endDate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-sm font-medium">
                      End Time *
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endTime"
                        type="time"
                        className={`pl-10 theme-transition ${errors.endTime ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        {...register('endTime')}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.endTime && (
                      <p className="text-sm text-destructive">{errors.endTime.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Booking Close Settings */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-4">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground">
                    <p className="font-medium mb-1">Booking Close Settings</p>
                    <p>Set custom booking close date/time. If left empty, booking will close when the event starts.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bookingCloseDate" className="text-sm font-medium">
                      Booking Close Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="bookingCloseDate"
                        type="date"
                        className={`pl-10 theme-transition ${errors.bookingCloseDate ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        {...register('bookingCloseDate')}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.bookingCloseDate && (
                      <p className="text-sm text-destructive">{errors.bookingCloseDate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bookingCloseTime" className="text-sm font-medium">
                      Booking Close Time
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="bookingCloseTime"
                        type="time"
                        className={`pl-10 theme-transition ${errors.bookingCloseTime ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        {...register('bookingCloseTime')}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.bookingCloseTime && (
                      <p className="text-sm text-destructive">{errors.bookingCloseTime.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Set Category */}
          <Card className="shadow-theme">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Set Category *</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCategory}
                  className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Category Table Header */}
                <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 rounded-lg text-sm font-medium text-foreground">
                  <div className="col-span-3">Category</div>
                  <div className="col-span-2">Type Class</div>
                  <div className="col-span-3">Class Name</div>
                  <div className="col-span-3">Distance</div>
                  <div className="col-span-1 text-center">Action</div>
                </div>

                {/* Category Rows */}
                {categories.map((category) => (
                  <div key={category.id} className="grid grid-cols-12 gap-4 p-3 border border-border rounded-lg">
                    {/* Category */}
                    <div className="col-span-3">
                      <Select 
                        value={category.category} 
                        onValueChange={(value) => updateCategory(category.id, 'category', value)}
                      >
                        <SelectTrigger className="theme-transition">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Compound">Compound</SelectItem>
                          <SelectItem value="Barebow">Barebow</SelectItem>
                          <SelectItem value="Recurve">Recurve</SelectItem>
                          <SelectItem value="Nasional">Nasional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Type Class */}
                    <div className="col-span-2">
                      <Select 
                        value={category.typeClass} 
                        onValueChange={(value) => updateCategory(category.id, 'typeClass', value)}
                      >
                        <SelectTrigger className="theme-transition">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Master">Master</SelectItem>
                          <SelectItem value="Umum">Umum</SelectItem>
                          <SelectItem value="U-15">U-15</SelectItem>
                          <SelectItem value="U-18">U-18</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Class Name */}
                    <div className="col-span-3">
                      <Select 
                        value={category.className} 
                        onValueChange={(value) => updateCategory(category.id, 'className', value)}
                      >
                        <SelectTrigger className="theme-transition">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Master">Master</SelectItem>
                          <SelectItem value="Pemula">Pemula</SelectItem>
                          <SelectItem value="Mahir">Mahir</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Distance */}
                    <div className="col-span-3">
                      <Select 
                        value={category.distance} 
                        onValueChange={(value) => updateCategory(category.id, 'distance', value)}
                      >
                        <SelectTrigger className="theme-transition">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20 Meter">20 Meter</SelectItem>
                          <SelectItem value="30 Meter">30 Meter</SelectItem>
                          <SelectItem value="50 Meter">50 Meter</SelectItem>
                          <SelectItem value="70 Meter">70 Meter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Action */}
                    <div className="col-span-1 flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeCategory(category.id)}
                        disabled={categories.length <= 1}
                        className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 p-2"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delegation Type */}
          <Card className="shadow-theme">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Delegation Type *</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Delegation Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setDelegationType('open');
                    setValue('delegationType', 'open');
                  }}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    delegationType === 'open'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-border/80 bg-background'
                  }`}
                >
                  <div className="font-medium">Open</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Participants can freely enter names
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDelegationType('selected');
                    setValue('delegationType', 'selected');
                  }}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    delegationType === 'selected'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-border/80 bg-background'
                  }`}
                >
                  <div className="font-medium">Selected</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Choose from predefined options
                  </div>
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  *You can set the content type to 'Open', allowing participants to freely enter names like country, club, or school, 
                  or 'Selected', where participants choose from predefined options such as a specific club or schools.
                </p>
              </div>

              {/* Select Type (only show when Selected is chosen) */}
              {delegationType === 'selected' && (
                <div className="space-y-2">
                  <Label htmlFor="selectType" className="text-sm font-medium">
                    Tipe Seleksi
                  </Label>
                  <Select value={watch('selectType')} onValueChange={(value) => setValue('selectType', value)}>
                    <SelectTrigger className="theme-transition">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Club/Team">Club/Team</SelectItem>
                      <SelectItem value="Individual">Individual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Competition Rules */}
          <Card className="shadow-theme">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Aturan Pertandingan & Pemeringkatan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Competition Rules */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Aturan Pertandingan Panahan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Jenis Pertandingan</Label>
                    <Select defaultValue="kualifikasi-eliminasi">
                      <SelectTrigger className="theme-transition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kualifikasi-eliminasi">Kualifikasi + Eliminasi</SelectItem>
                        <SelectItem value="kualifikasi-only">Kualifikasi Saja</SelectItem>
                        <SelectItem value="eliminasi-only">Eliminasi Saja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Jumlah Arrow per End</Label>
                    <Select defaultValue="6">
                      <SelectTrigger className="theme-transition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Arrow</SelectItem>
                        <SelectItem value="6">6 Arrow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Jumlah End Kualifikasi</Label>
                    <Select defaultValue="12">
                      <SelectTrigger className="theme-transition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 End</SelectItem>
                        <SelectItem value="12">12 End</SelectItem>
                        <SelectItem value="18">18 End</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Target Face</Label>
                    <Select defaultValue="10-ring">
                      <SelectTrigger className="theme-transition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-ring">10 Ring</SelectItem>
                        <SelectItem value="6-ring">6 Ring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Club Ranking Rules */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Aturan Pemeringkatan Klub</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Sistem Pemeringkatan</Label>
                    <Select defaultValue="medal-count">
                      <SelectTrigger className="theme-transition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medal-count">Berdasarkan Jumlah Medali</SelectItem>
                        <SelectItem value="point-system">Sistem Poin</SelectItem>
                        <SelectItem value="best-score">Skor Terbaik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Minimum Peserta per Klub</Label>
                    <Select defaultValue="3">
                      <SelectTrigger className="theme-transition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Peserta</SelectItem>
                        <SelectItem value="3">3 Peserta</SelectItem>
                        <SelectItem value="5">5 Peserta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
              className="px-6 hover-bg"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Event
                </>
              )}
            </Button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <PageFooter />
    </div>
  );
}