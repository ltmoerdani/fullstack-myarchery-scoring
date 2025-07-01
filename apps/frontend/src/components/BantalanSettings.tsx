import TargetSettingsPage from "@/components/TargetSettingsPage";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Target, User, LogOut, ChevronLeft } from "lucide-react";

export interface BantalanSettingsProps {
  onBack: () => void;
  onIdCardClick?: () => void; // kept for compatibility but unused
}

export function BantalanSettings({ onBack }: BantalanSettingsProps) {
  return (
    <div className="min-h-screen w-full content-bg flex flex-col theme-transition">
      {/* Sticky Header – konsisten dengan halaman lain */}
      <header className="header-bg sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">myarchery.id</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground p-2 hover-bg">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Back</span>
            </Button>

            <ThemeToggle />

            <div className="flex items-center space-x-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Pro Archery</span>
            </div>

            <Button variant="ghost" size="sm" className="text-muted-foreground p-2 hover:text-destructive transition-colors hover-bg">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content dengan margin default aplikasi */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        <TargetSettingsPage onBack={onBack} />
      </main>
    </div>
  );
} 