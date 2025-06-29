import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { User, LogOut, ChevronLeft } from 'lucide-react';

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
    <header className="header-bg sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 theme-transition">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleLogoClick}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <img 
                src="/logo_myarchery.svg" 
                alt="MyArchery Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </button>
          {title && (
            <>
              <span className="text-muted-foreground">/</span>
              <span className="text-lg font-medium text-foreground">{title}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {showBackButton && onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground p-2 hover-bg">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Back</span>
            </Button>
          )}
          
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
  );
}