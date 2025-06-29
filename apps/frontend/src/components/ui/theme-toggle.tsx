import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

export function ThemeToggle({ 
  variant = 'ghost', 
  size = 'icon',
  showLabel = false 
}: ThemeToggleProps) {
  const { theme, actualTheme, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'system':
        return 'System theme';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className="transition-all duration-200 hover:scale-105"
      aria-label={getLabel()}
      title={getLabel()}
    >
      <div className="relative">
        {getIcon()}
        {actualTheme === 'dark' && theme === 'system' && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        )}
      </div>
      {showLabel && (
        <span className="ml-2 hidden sm:inline">
          {getLabel()}
        </span>
      )}
    </Button>
  );
}

interface ThemeMenuProps {
  onSelect?: (theme: 'light' | 'dark' | 'system') => void;
}

export function ThemeMenu({ onSelect }: ThemeMenuProps) {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  const handleSelect = (selectedTheme: 'light' | 'dark' | 'system') => {
    setTheme(selectedTheme);
    onSelect?.(selectedTheme);
  };

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => handleSelect(value)}
          className={`
            flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200
            hover:bg-accent hover:text-accent-foreground
            ${theme === value 
              ? 'border-primary bg-primary/10 text-primary' 
              : 'border-border bg-background'
            }
          `}
        >
          <Icon className="h-4 w-4" />
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}