import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { X, Calendar, MapPin, Type, Save } from 'lucide-react';

const addEventSchema = z.object({
  title: z.string().min(1, 'Judul event wajib diisi').max(100, 'Judul terlalu panjang'),
  location: z.string().min(1, 'Lokasi event wajib diisi').max(100, 'Lokasi terlalu panjang'),
  startDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
  endDate: z.string().min(1, 'Tanggal selesai wajib diisi'),
});

type AddEventFormData = z.infer<typeof addEventSchema>;

interface AddEventFormProps {
  readonly onSubmit: (data: AddEventFormData & { status: 'published' | 'draft' }) => void;
  readonly onCancel: () => void;
}

export function AddEventForm({ onSubmit, onCancel }: Readonly<AddEventFormProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddEventFormData>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      title: '',
      location: '',
      startDate: '',
      endDate: '',
    },
  });

  const handleFormSubmit = async (data: AddEventFormData) => {
    setIsSubmitting(true);
    try {
      // Format dates to match the display format
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      };

      const eventData = {
        ...data,
        startDate: formatDate(data.startDate),
        endDate: formatDate(data.endDate),
        status: 'published' as const,
      };

      onSubmit(eventData);
      reset();
      toast({
        title: "Event Berhasil Ditambahkan",
        description: "Event baru telah berhasil dibuat dan dipublikasikan.",
      });
    } catch (error) {
      // eslint-disable-next-line no-console
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Tambah Event Baru</span>
            </CardTitle>
            <button
              type="button"
              onClick={onCancel}
              className="h-8 w-8 p-0 bg-transparent border-none flex items-center justify-center"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Event Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Judul Event
              </Label>
              <div className="relative">
                <Type className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="title"
                  type="text"
                  placeholder="Masukkan judul event"
                  className={`pl-10 ${errors.title ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  {...register('title')}
                  disabled={isSubmitting}
                />
              </div>
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Lokasi Event
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Masukkan lokasi event"
                  className={`pl-10 ${errors.location ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  {...register('location')}
                  disabled={isSubmitting}
                />
              </div>
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium">
                Tanggal Mulai
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startDate"
                  type="date"
                  className={`pl-10 ${errors.startDate ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  {...register('startDate')}
                  disabled={isSubmitting}
                />
              </div>
              {errors.startDate && (
                <p className="text-sm text-destructive">{errors.startDate.message}</p>
              )}
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium">
                Tanggal Selesai
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="endDate"
                  type="date"
                  className={`pl-10 ${errors.endDate ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  {...register('endDate')}
                  disabled={isSubmitting}
                />
              </div>
              {errors.endDate && (
                <p className="text-sm text-destructive">{errors.endDate.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium"
              >
                Batal
              </button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Menyimpan...' : 'Simpan Event'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}