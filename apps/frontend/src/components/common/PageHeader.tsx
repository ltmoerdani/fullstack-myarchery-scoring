import { Button } from '@/components/ui/button';
import { Target, User, LogOut, ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onLogoClick?: () => void;
  onLogout?: () => void;
}

export function PageHeader({ 
  title, 
  showBackButton = false, 
  onBack, 
  onLogoClick,
  onLogout 
}: PageHeaderProps) {
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">myarchery.id</span>
          </button>
          {title && (
            <>
              <span className="text-gray-400">/</span>
              <span className="text-lg font-medium text-gray-700">{title}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {showBackButton && onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 p-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Back</span>
            </Button>
          )}
          <div className="flex items-center space-x-2 text-gray-600">
            <User className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Pro Archery</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-gray-600 p-2 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline ml-2">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}