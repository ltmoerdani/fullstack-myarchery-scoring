import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  User, 
  Users, 
  Plus, 
  ArrowRight, 
  MapPin, 
  Calendar,
  MoreHorizontal,
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

interface DashboardProps {
  onEventClick?: () => void;
  onCreateEventClick?: () => void;
  onLogout?: () => void;
}

export function Dashboard(props: Readonly<DashboardProps>) {
  const { onEventClick, onCreateEventClick, onLogout } = props;
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

  const handleEventClick = () => {
    if (onEventClick) {
      onEventClick();
    }
  };

  const handleCreateEventClick = () => {
    if (onCreateEventClick) {
      onCreateEventClick();
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen w-full content-bg flex flex-col theme-transition">
      {/* Sticky Header */}
      <header className="header-bg sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <img 
                src="/logo_myarchery.svg" 
                alt="MyArchery Logo" 
                className="w-full h-full object-contain cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {}} // Already on dashboard, no action needed
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Pro Archery</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-muted-foreground p-2 hover:text-destructive transition-colors hover-bg"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Atur akun & eventmu di sini</p>
        </div>

        {/* Top Cards Section - 2 Column Grid for Desktop */}
        <div className="mb-8 sm:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pro Archery Profile Card - Horizontal Layout */}
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group card-hover shadow-theme">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  {/* Avatar */}
                  <Avatar className="w-20 h-20 flex-shrink-0">
                    <AvatarImage src="/api/placeholder/80/80" alt="Pro Archery" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                      PA
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-2 lg:mb-3">Pro Archery</h3>
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-1">Email</p>
                      <p className="font-medium text-foreground">proarchery.rcd@gmail.com</p>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button variant="outline" size="sm" className="px-4 lg:px-6 hover-bg">
                      Edit Profil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Management Card - Vertical Layout */}
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group card-hover shadow-theme">
              <CardContent className="p-6 h-full flex flex-col">
                {/* Icon at the top */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-muted rounded-full flex items-center justify-center mb-4 lg:mb-6">
                  <Users className="w-8 h-8 lg:w-10 lg:h-10 text-muted-foreground" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-2 lg:mb-3">Users</h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 lg:mb-6 flex-1">
                  Mengatur pengguna seperti manager event
                </p>
                
                {/* Footer with arrow */}
                <div className="flex justify-end mt-auto">
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Events Section */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Event Terbaru</h2>
          
          {/* Events Grid - 4 Column Layout for Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {/* Add New Event Card */}
            <Card 
              className="border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer group h-[280px]"
              onClick={handleCreateEventClick}
            >
              <CardContent className="p-4 sm:p-6 h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted group-hover:bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-colors">
                  <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground group-hover:text-primary" />
                </div>
                <p className="text-muted-foreground group-hover:text-primary font-medium transition-colors text-center text-sm sm:text-base">
                  Tambah Event
                </p>
              </CardContent>
            </Card>

            {/* Event Cards */}
            {events.map((event) => (
              <Card 
                key={event.id} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group h-[280px] card-hover shadow-theme"
                onClick={() => handleEventClick()}
              >
                <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                  {/* Header with status and menu */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <Badge 
                      variant="outline"
                      className="text-xs px-2 sm:px-3 py-1 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      Terpublikasi
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover-bg">
                      <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                  
                  {/* Event Title */}
                  <h3 className="font-semibold text-foreground mb-3 sm:mb-4 line-clamp-2 leading-tight text-sm sm:text-base">
                    {event.title}
                  </h3>
                  
                  {/* Event Details */}
                  <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 flex-1">
                    <div className="flex items-start text-xs sm:text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{event.location}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="truncate">{event.startDate} - {event.endDate}</span>
                    </div>
                  </div>
                  
                  {/* Footer with arrow */}
                  <div className="flex justify-end mt-auto">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary/80 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Events Link */}
        <div className="text-center">
          <Button variant="link" className="text-primary hover:text-primary/80 text-sm sm:text-base">
            Lihat Semua Event
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-card border-t border-border py-4 sm:py-6 mt-auto theme-transition">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
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