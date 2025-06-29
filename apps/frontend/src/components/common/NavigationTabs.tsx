import { LucideIcon } from 'lucide-react';

interface NavigationTab {
  id: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

interface NavigationTabsProps {
  tabs: NavigationTab[];
  onTabClick?: (tabId: string) => void;
  activeTabId?: string;
}

export function NavigationTabs({ tabs, onTabClick, activeTabId }: NavigationTabsProps) {
  const handleTabClick = (tabId: string) => {
    if (onTabClick) {
      onTabClick(tabId);
    }
  };

  return (
    <nav className="sticky top-[73px] z-40 w-full bg-blue-700">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px]">
        <div className="flex space-x-0 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTabId ? activeTabId === tab.id : tab.active;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white border-b-2 border-white'
                    : 'text-blue-100 hover:text-white hover:bg-blue-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}