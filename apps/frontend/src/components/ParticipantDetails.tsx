import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target,
  User,
  LogOut,
  ArrowLeft,
  Download
} from 'lucide-react';

interface ParticipantDetailsProps {
  onBack: () => void;
}

interface Participant {
  no: number;
  namaPeserta: string;
  klub: string;
  email: string;
  telepon: string;
  statusPembayaran: 'Lunas' | 'Belum Lunas' | 'Expired' | 'Gagal' | 'Refund' | 'Semua';
}

export function ParticipantDetails({ onBack }: ParticipantDetailsProps) {
  const [activeTab, setActiveTab] = useState<'barebow' | 'compound'>('barebow');
  const [selectedKelas, setSelectedKelas] = useState('Master - 20m');
  const [selectedJenisRegu, setSelectedJenisRegu] = useState('Individu Putra');
  const [selectedStatusPembayaran, setSelectedStatusPembayaran] = useState('Lunas');

  // Sample data for Barebow
  const barebowParticipants: Participant[] = [
    {
      no: 1,
      namaPeserta: 'Didiek Bhudy Prabowo',
      klub: 'PHM Archery Club',
      email: 'didiekbp@yahoo.com',
      telepon: '000000000000',
      statusPembayaran: 'Lunas'
    },
    {
      no: 2,
      namaPeserta: 'Budi Maryono',
      klub: 'Panahan Zona 9',
      email: 'bdmaryono@gmail.com',
      telepon: '000000000000',
      statusPembayaran: 'Lunas'
    },
    {
      no: 3,
      namaPeserta: 'Andreas Aris Susanto',
      klub: 'Pajajaran Archery Centre (P.ArC)',
      email: 'andreasarissusanto@gmail.com',
      telepon: '000000000000',
      statusPembayaran: 'Lunas'
    },
    {
      no: 4,
      namaPeserta: 'Ristiawan, S.kom',
      klub: '-',
      email: 'ristiawan.rizt@gmail.com',
      telepon: '000000000000',
      statusPembayaran: 'Lunas'
    },
    {
      no: 5,
      namaPeserta: 'Ricky',
      klub: 'Pedurenan Archery',
      email: 'ricky@gmail.com',
      telepon: '000000000000',
      statusPembayaran: 'Lunas'
    },
    {
      no: 6,
      namaPeserta: 'Rasiman',
      klub: '-',
      email: 'rushiman2505@gmail.com',
      telepon: '000000000000',
      statusPembayaran: 'Lunas'
    },
    {
      no: 7,
      namaPeserta: 'Nur Gunkids',
      klub: 'Bepeka Archery Indonesia',
      email: 'nurgunkids@gmail.com',
      telepon: '000000000000',
      statusPembayaran: 'Lunas'
    },
    {
      no: 8,
      namaPeserta: 'NOVIANSYAH PAMUNGKAS',
      klub: 'HUB SPORT ACADEMY',
      email: 'noviansyahpamungkas@gmail.com',
      telepon: '000000000000',
      statusPembayaran: 'Lunas'
    },
    {
      no: 9,
      namaPeserta: 'Herawan Y Hardi',
      klub: 'Kompak DJP',
      email: 'hardi.archery2025@gmail.com',
      telepon: '000000000000',
      statusPembayaran: 'Lunas'
    }
  ];

  // Sample data for Compound
  const compoundParticipants: Participant[] = [
    {
      no: 1,
      namaPeserta: 'Syahrul',
      klub: 'Mentari Archery Squad',
      email: 'syahrul021181@gmail.com',
      telepon: '-',
      statusPembayaran: 'Lunas'
    },
    {
      no: 2,
      namaPeserta: 'Ramadhi Wijaya',
      klub: 'Focus Archery Center',
      email: 'ramadhi73@gmail.com',
      telepon: '081380436573',
      statusPembayaran: 'Lunas'
    },
    {
      no: 3,
      namaPeserta: 'MULYADI',
      klub: 'PRO ARCHERY CLUB',
      email: 'vbk162@gmail.com',
      telepon: '082111990162',
      statusPembayaran: 'Lunas'
    },
    {
      no: 4,
      namaPeserta: 'Hari Laksono',
      klub: 'Jabal Amur Archery Club',
      email: 'harisav66@gmail.com',
      telepon: '0811999095',
      statusPembayaran: 'Lunas'
    },
    {
      no: 5,
      namaPeserta: 'Ganjar Gumelar',
      klub: 'Smack Archery',
      email: 'gganjar@ymail.com',
      telepon: '08111012947',
      statusPembayaran: 'Lunas'
    },
    {
      no: 6,
      namaPeserta: 'Deni Eko Setiawan',
      klub: 'Focus Archery Center',
      email: 'deniekosetiawan.des@gmail.com',
      telepon: '087717888877',
      statusPembayaran: 'Lunas'
    },
    {
      no: 7,
      namaPeserta: 'M Rizaldi Mulia Hasibuan',
      klub: 'PRO ARCHERY CLUB',
      email: 'muliahasibuan@gmail.com',
      telepon: '08129926869',
      statusPembayaran: 'Lunas'
    },
    {
      no: 8,
      namaPeserta: 'Tommy Harri Ardana',
      klub: 'Segar Archery',
      email: 'ardana_hafi@yahoo.com',
      telepon: '08128225440',
      statusPembayaran: 'Lunas'
    },
    {
      no: 9,
      namaPeserta: 'Sigit Winarno',
      klub: 'Siliwangi Archery Club Garut',
      email: 'bintang.hamsterz@gmail.com',
      telepon: '-',
      statusPembayaran: 'Lunas'
    }
  ];

  // Filter participants based on selected filters
  const getFilteredParticipants = () => {
    const participants = activeTab === 'barebow' ? barebowParticipants : compoundParticipants;
    
    return participants.filter(participant => {
      if (selectedStatusPembayaran !== 'Semua' && participant.statusPembayaran !== selectedStatusPembayaran) {
        return false;
      }
      return true;
    });
  };

  const filteredParticipants = getFilteredParticipants();

  const handleDownloadIdCard = () => {
    console.log('Download ID Card');
  };

  const handleAturKategori = (participantNo: number) => {
    console.log('Atur Kategori for participant:', participantNo);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Lunas':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Belum Lunas':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Expired':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Gagal':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Refund':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">myarchery.id</span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Pro Archery</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-600 p-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Peserta Individu</h1>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('barebow')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'barebow'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Barebow
              </button>
              <button
                onClick={() => setActiveTab('compound')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'compound'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Compound
              </button>
            </nav>
          </div>
        </div>

        {/* Filters and Download Button - Fixed Layout */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0">
            {/* Filter Controls - Vertical Layout */}
            <div className="space-y-4">
              {/* Kelas Filter */}
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-700 w-20">
                  Kelas:
                </label>
                <select
                  value={selectedKelas}
                  onChange={(e) => setSelectedKelas(e.target.value)}
                  className="px-3 py-1.5 border border-blue-300 rounded-md text-sm bg-white text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
                >
                  <option value="Master - 20m">Master - 20m</option>
                  <option value="Master - 30m">Master - 30m</option>
                  <option value="Senior - 20m">Senior - 20m</option>
                  <option value="Senior - 30m">Senior - 30m</option>
                </select>
              </div>

              {/* Jenis Regu Filter */}
              <div className="flex items-start space-x-3">
                <label className="text-sm font-medium text-gray-700 w-20 pt-1.5">
                  Jenis Regu:
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedJenisRegu('Individu Putra')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      selectedJenisRegu === 'Individu Putra'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Individu Putra
                  </button>
                  <button
                    onClick={() => setSelectedJenisRegu('Individu Putri')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      selectedJenisRegu === 'Individu Putri'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Individu Putri
                  </button>
                </div>
              </div>

              {/* Status Pembayaran Filter */}
              <div className="flex items-start space-x-3">
                <label className="text-sm font-medium text-gray-700 w-20 pt-1.5">
                  Status Pembayaran:
                </label>
                <div className="flex flex-wrap gap-2 max-w-md">
                  {['Lunas', 'Belum Lunas', 'Expired', 'Gagal', 'Refund', 'Semua'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatusPembayaran(status as any)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        selectedStatusPembayaran === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-end lg:justify-start lg:items-start">
              <Button
                onClick={handleDownloadIdCard}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Unduh ID Card</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Participants Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-700 w-16">
                      No.
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-700 min-w-[200px]">
                      Nama Peserta
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-700 min-w-[180px]">
                      Klub
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-700 min-w-[200px]">
                      Email
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-700 min-w-[120px]">
                      Telepon
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-700 min-w-[140px]">
                      Status Pembayaran
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-gray-700 w-32">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.map((participant) => (
                    <tr key={participant.no} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm text-gray-900">
                        {participant.no}.
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                        {participant.namaPeserta}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {participant.klub}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {participant.email}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {participant.telepon}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge 
                          variant="outline"
                          className={`text-xs px-2 py-1 font-medium border ${getStatusBadgeColor(participant.statusPembayaran)}`}
                        >
                          {participant.statusPembayaran}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAturKategori(participant.no)}
                          className="text-blue-600 border-blue-300 hover:bg-blue-50 text-xs px-3 py-1"
                        >
                          Atur Kategori
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredParticipants.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500 text-sm">
                  Tidak ada peserta yang sesuai dengan filter yang dipilih
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 sm:py-6 mt-auto">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            2025 © MyArchery. Designed & Developed by Reka Cipta Digital
          </p>
        </div>
      </footer>
    </div>
  );
}