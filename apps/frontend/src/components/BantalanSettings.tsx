import { Home, Settings, CreditCard } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { NavigationTabs } from "@/components/common/NavigationTabs";
import { PageFooter } from "@/components/common/PageFooter";
import TargetSettingsPage from "@/components/TargetSettingsPage";

export interface BantalanSettingsProps {
  onBack: () => void;
  onIdCardClick?: () => void; // kept for compatibility but unused
}

export function BantalanSettings({ onBack, onIdCardClick }: BantalanSettingsProps) {
  // state untuk tab aktif
  const [activeTab, setActiveTab] = useState("bantalan");

  const navigationTabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "bantalan", label: "Bantalan", icon: Settings, active: true },
    { id: "id-card", label: "ID Card", icon: CreditCard },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "id-card" && onIdCardClick) {
      onIdCardClick();
    } else if (tabId === "dashboard") {
      onBack(); // asumsi back ke dashboard
    }
  };

  return (
    <div className="min-h-screen w-full content-bg flex flex-col theme-transition">
      <PageHeader showBackButton onBack={onBack} />

      <NavigationTabs
        tabs={navigationTabs}
        activeTabId={activeTab}
        onTabClick={handleTabClick}
      />

      {/* Main Content dengan margin default aplikasi */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        <TargetSettingsPage onBack={onBack} />
      </main>

      <PageFooter />
    </div>
  );
} 