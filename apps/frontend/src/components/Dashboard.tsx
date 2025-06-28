import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Users, 
  Plus, 
  ArrowRight, 
  MapPin, 
  Calendar,
  MoreHorizontal,
  Target,
  LogOut
} from 'lucide-react';
import { AddEventForm } from './AddEventForm';

interface Event {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'published' | 'draft';
}

export function Dashboard() {
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'PRO MASTER GAMES',
      location: 'KOTA JAKARTA TIMUR',
      startDate: '27/06/2025',
      endDate: '27/06/2025',
      status: 'published'
    },
    {
      id: '2',
      title: 'Pro Archery Selection (IRAT)',
      location: 'KOTA JAKARTA UTARA',
      startDate: '12/03/2023',
      endDate: '12/03/2023',
      status: 'published'
    },
    {
      id: '3',
      title: 'Pro Archery Scoring Day (Internal Event)',
      location: 'KOTA BEKASI',
      startDate: '19/06/2022',
      endDate: '19/06/2022',
      status: 'published'
    }
  ]);

  const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString()
    };
    setEvents(prev => [newEvent, ...prev]);
    setShowAddEventForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">myarchery.id</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-4 h-4" />
              <span className="text-sm">Pro Archery</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Atur akun & eventmu di sini</p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pro Archery Profile Card */}
          <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/api/placeholder/64/64" alt="Pro Archery" />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                      PA
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Pro Archery</h3>
                    <div className="text-sm text-gray-600">
                      <p className="mb-1">Email</p>
                      <p>proarchery.red@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-3">
                  <Button variant="outline" size="sm">
                    Edit Profil
                  </Button>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Management Card */}
          <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Users</h3>
                    <p className="text-sm text-gray-600">
                      Mengatur pengguna seperti manager event
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Terbaru</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Add New Event Card */}
            <Card 
              className="border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer group"
              onClick={() => setShowAddEventForm(true)}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center h-48">
                <div className="w-12 h-12 bg-gray-200 group-hover:bg-blue-200 rounded-full flex items-center justify-center mb-3 transition-colors">
                  <Plus className="w-6 h-6 text-gray-500 group-hover:text-blue-600" />
                </div>
                <p className="text-gray-600 group-hover:text-blue-600 font-medium transition-colors">
                  Tambah Event Baru
                </p>
              </CardContent>
            </Card>

            {/* Event Cards */}
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge 
                      variant={event.status === 'published' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      Terpublikasi
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{event.startDate} - {event.endDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Events Link */}
        <div className="text-center">
          <Button variant="link" className="text-blue-600 hover:text-blue-700">
            Lihat Semua Event
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            2025 © MyArchery. Designed & Developed by Reka Cipta Digital
          </p>
        </div>
      </footer>

      {/* Add Event Form Modal */}
      {showAddEventForm && (
        <AddEventForm
          onSubmit={handleAddEvent}
          onCancel={() => setShowAddEventForm(false)}
        />
      )}
    </div>
  );
}