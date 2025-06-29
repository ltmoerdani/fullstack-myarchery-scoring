import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Target,
  Home,
  Settings,
  Download,
  Award,
  FileText
} from 'lucide-react';

// Import common components
import { PageHeader } from '@/components/common/PageHeader';
import { NavigationTabs } from '@/components/common/NavigationTabs';
import { PageFooter } from '@/components/common/PageFooter';

interface DocumentsPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
  onDashboard?: () => void;
}

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  status: 'generated' | 'pending';
  generatedDate?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function DocumentsPage({ 
  onBack, 
  onNavigate, 
  onLogout, 
  onDashboard 
}: Readonly<DocumentsPageProps>) {
  const [activeNavTab, setActiveNavTab] = useState('dokumen');

  const documents: DocumentItem[] = [
    {
      id: 'laporan-upp',
      title: 'Laporan UPP',
      description: 'Download laporan PDF untuk UPP',
      status: 'generated',
      generatedDate: '27 Juni 2025',
      icon: Award
    },
    {
      id: 'laporan-pertandingan',
      title: 'Laporan Pertandingan',
      description: 'Laporan hasil akhir pertandingan',
      status: 'generated',
      generatedDate: '27 Juni 2025',
      icon: Award
    },
    {
      id: 'laporan-rekapitulasi',
      title: 'Laporan rekapitulasi medali',
      description: 'Download laporan rekapitulasi medali',
      status: 'generated',
      generatedDate: '27 Juni 2025',
      icon: Award
    }
  ];

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'scoring-kualifikasi', label: 'Scoring Kualifikasi', icon: Target },
    { id: 'scoring-eliminasi', label: 'Scoring Eliminasi', icon: Settings },
    { id: 'dokumen', label: 'Dokumen', icon: Download }
  ];

  const handleNavigationTabClick = (tabId: string) => {
    setActiveNavTab(tabId);
    
    switch (tabId) {
      case 'dashboard':
        // Navigate back to event detail page (PRO MASTER GAMES)
        if (onBack) {
          onBack();
        }
        break;
      case 'scoring-kualifikasi':
        // Navigate to scoring qualification page
        if (onNavigate) {
          onNavigate('scoring-kualifikasi');
        }
        break;
      case 'scoring-eliminasi':
        // Navigate to scoring elimination page
        if (onNavigate) {
          onNavigate('scoring-eliminasi');
        }
        break;
      case 'dokumen':
        // Stay on current page
        break;
      default:
        break;
    }
  };

  const handleLogoClick = () => {
    // Navigate to main dashboard (after login)
    if (onDashboard) {
      onDashboard();
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleDownloadDocument = (documentId: string) => {
    console.log(`Downloading document: ${documentId}`);
    // TODO: Implement document download functionality
  };

  const getStatusBadge = (status: string, generatedDate?: string) => {
    if (status === 'generated' && generatedDate) {
      return (
        <div className="text-blue-600 text-sm">
          Sudah di-generate pada tanggal {generatedDate}
        </div>
      );
    }
    return (
      <div className="text-gray-500 text-sm">
        Belum di-generate
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <PageHeader 
        title="Dokumen" 
        showBackButton 
        onBack={onBack}
        onLogoClick={handleLogoClick}
        onLogout={handleLogout}
      />

      {/* Navigation Tabs */}
      <NavigationTabs 
        tabs={navigationTabs} 
        onTabClick={handleNavigationTabClick}
        activeTabId={activeNavTab}
      />

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        {/* Documents List */}
        <div className="space-y-6">
          {documents.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {/* Document Info */}
                  <div className="flex items-center space-x-4">
                    {/* Document Icon */}
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <document.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    
                    {/* Document Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {document.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {document.description}
                      </p>
                      {getStatusBadge(document.status, document.generatedDate)}
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="flex-shrink-0">
                    <Button
                      onClick={() => handleDownloadDocument(document.id)}
                      disabled={document.status !== 'generated'}
                      className={`flex items-center space-x-2 ${
                        document.status === 'generated'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh Dokumen</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no documents) */}
        {documents.length === 0 && (
          <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Dokumen</h3>
            <p className="text-gray-600">
              Dokumen akan tersedia setelah pertandingan selesai dan data telah diproses.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <PageFooter />
    </div>
  );
}