import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Target,
  User,
  LogOut,
  Home,
  Download,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  Settings
} from 'lucide-react';

interface ScoringQualificationProps {
  readonly onBack: () => void;
}

interface Participant {
  readonly position: string;
  readonly rank: number;
  readonly name: string;
  readonly club: string;
  readonly sesi1: number;
  readonly sesi2: number;
  readonly jumlahPanah: number;
  readonly total: number;
  readonly x10: number;
  readonly x: number;
  readonly scores?: {
    readonly session1: number[];
    readonly session2: number[];
    readonly shootOff?: number[];
  };
}

interface ScoringDetail {
  readonly end: number;
  readonly shot: string;
  readonly arrows: readonly (number | string)[];
  readonly total: number;
}

export function ScoringQualification({ onBack }: Readonly<ScoringQualificationProps>) {
  const [activeTab, setActiveTab] = useState<'barebow' | 'compound'>('barebow');
  const [selectedKelas, setSelectedKelas] = useState('Master - 20m');
  const [selectedJenisRegu, setSelectedJenisRegu] = useState('Individu Putra');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  const [activeSession, setActiveSession] = useState<'session1' | 'session2' | 'shootoff'>('session1');
  const [selectedParticipants, setSelectedParticipants] = useState<Set<string>>(new Set());

  // Sample data for Barebow
  const barebowParticipants: Participant[] = [
    {
      position: '3A',
      rank: 44,
      name: 'Fitria Yulianto',
      club: 'Kompak DJP',
      sesi1: 0,
      sesi2: 0,
      jumlahPanah: 0,
      total: 0,
      x10: 0,
      x: 0
    },
    {
      position: '3B',
      rank: 7,
      name: 'Erdiyansyah alim',
      club: 'Target Archery',
      sesi1: 330,
      sesi2: 326,
      jumlahPanah: 72,
      total: 656,
      x10: 23,
      x: 4
    },
    {
      position: '3C',
      rank: 26,
      name: 'Tri Wantoro',
      club: 'FOCUS ARCHERY CENTER KOOPSUDNAS',
      sesi1: 296,
      sesi2: 308,
      jumlahPanah: 72,
      total: 604,
      x10: 13,
      x: 3
    },
    {
      position: '3D',
      rank: 9,
      name: 'Satrio wibowo',
      club: 'Raja Rumi Archery Club (RR)',
      sesi1: 338,
      sesi2: 316,
      jumlahPanah: 72,
      total: 654,
      x10: 24,
      x: 10
    },
    {
      position: '4A',
      rank: 8,
      name: 'Reza Holyus Perdana',
      club: 'Kompak DJP',
      sesi1: 324,
      sesi2: 330,
      jumlahPanah: 72,
      total: 654,
      x10: 19,
      x: 4
    },
    {
      position: '4B',
      rank: 14,
      name: 'dwijo Siswoyo',
      club: 'EAST ARCHERY TEAM',
      sesi1: 323,
      sesi2: 309,
      jumlahPanah: 72,
      total: 632,
      x10: 18,
      x: 5
    },
    {
      position: '4C',
      rank: 35,
      name: 'F.Ferdinando',
      club: 'FOCUS ARCHERY CENTER KOOPSUDNAS',
      sesi1: 275,
      sesi2: 304,
      jumlahPanah: 72,
      total: 579,
      x10: 10,
      x: 3
    },
    {
      position: '4D',
      rank: 30,
      name: 'Didiek Bhudy Prabowo',
      club: 'PHM Archery Club',
      sesi1: 294,
      sesi2: 297,
      jumlahPanah: 72,
      total: 591,
      x10: 13,
      x: 4
    },
    {
      position: '5A',
      rank: 18,
      name: 'Sandy Zulfadli',
      club: 'Kompak DJP',
      sesi1: 316,
      sesi2: 313,
      jumlahPanah: 72,
      total: 629,
      x10: 19,
      x: 6
    },
    {
      position: '5B',
      rank: 10,
      name: 'Abu Gaza',
      club: 'EAST ARCHERY TEAM',
      sesi1: 327,
      sesi2: 326,
      jumlahPanah: 72,
      total: 653,
      x10: 22,
      x: 10
    }
  ];

  // Sample data for Compound
  const compoundParticipants: Participant[] = [
    {
      position: '16A',
      rank: 3,
      name: 'M Rizaldi Mulia Hasibuan',
      club: 'PRO ARCHERY CLUB',
      sesi1: 349,
      sesi2: 340,
      jumlahPanah: 72,
      total: 689,
      x10: 46,
      x: 22
    },
    {
      position: '16B',
      rank: 9,
      name: 'Ganjar Gumelar',
      club: 'Smack Archery',
      sesi1: 0,
      sesi2: 0,
      jumlahPanah: 0,
      total: 0,
      x10: 0,
      x: 0
    },
    {
      position: '16C',
      rank: 2,
      name: 'Deni Eko Setiawan',
      club: 'Focus Archery Center',
      sesi1: 351,
      sesi2: 339,
      jumlahPanah: 72,
      total: 690,
      x10: 43,
      x: 16
    },
    {
      position: '17A',
      rank: 7,
      name: 'MULYADI',
      club: 'PRO ARCHERY CLUB',
      sesi1: 317,
      sesi2: 291,
      jumlahPanah: 72,
      total: 608,
      x10: 11,
      x: 2
    },
    {
      position: '17B',
      rank: 8,
      name: 'Hari Laksono',
      club: 'Jabal Annur Archery Club',
      sesi1: 314,
      sesi2: 0,
      jumlahPanah: 72,
      total: 314,
      x10: 7,
      x: 4
    },
    {
      position: '17C',
      rank: 5,
      name: 'Ramadhi Wijaya',
      club: 'Focus Archery Center',
      sesi1: 332,
      sesi2: 341,
      jumlahPanah: 72,
      total: 673,
      x10: 32,
      x: 12
    },
    {
      position: '18A',
      rank: 1,
      name: 'Sigit Winarno',
      club: 'Siliwangi Archery Club Garut',
      sesi1: 353,
      sesi2: 350,
      jumlahPanah: 72,
      total: 703,
      x10: 57,
      x: 20
    },
    {
      position: '18B',
      rank: 4,
      name: 'Syahrul',
      club: 'Mentari Archery Squad',
      sesi1: 338,
      sesi2: 340,
      jumlahPanah: 72,
      total: 678,
      x10: 36,
      x: 9
    },
    {
      position: '18C',
      rank: 6,
      name: 'Tommy Harri Ardana',
      club: 'Segar Archery',
      sesi1: 319,
      sesi2: 340,
      jumlahPanah: 72,
      total: 659,
      x10: 33,
      x: 5
    }
  ];

  // Sample scoring detail data
  const scoringDetails: ScoringDetail[] = [
    { end: 1, shot: 'X', arrows: ['X', 10, 10, 10, 9, 9], total: 58 },
    { end: 2, shot: 'X', arrows: ['X', 10, 10, 10, 9, 9], total: 58 },
    { end: 3, shot: 'X', arrows: ['X', 'X', 'X', 'X', 'X', 8], total: 58 },
    { end: 4, shot: 'X', arrows: ['X', 'X', 10, 9, 9, 8], total: 56 },
    { end: 5, shot: 'X', arrows: ['X', 'X', 'X', 'X', 10, 10], total: 60 },
    { end: 6, shot: 'X', arrows: ['X', 'X', 10, 10, 10, 9], total: 59 }
  ];

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'scoring-kualifikasi', label: 'Scoring Kualifikasi', icon: Target, active: true },
    { id: 'scoring-eliminasi', label: 'Scoring Eliminasi', icon: Settings },
    { id: 'dokumen', label: 'Dokumen', icon: Download }
  ];

  const getFilteredParticipants = () => {
    const participants = activeTab === 'barebow' ? barebowParticipants : compoundParticipants;
    
    if (!searchTerm) return participants;
    
    return participants.filter(participant =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.club.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleParticipantClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDetailExpanded(true);
  };

  const handleCloseDetail = () => {
    setIsDetailExpanded(false);
    setSelectedParticipant(null);
  };

  const handleScoreInput = (endIndex: number, arrowIndex: number, value: string) => {
    // Handle score input logic here
    console.log(`Score input: End ${endIndex + 1}, Arrow ${arrowIndex + 1}, Value: ${value}`);
  };

  // Base state management functions
  const handleSelectAllParticipants = () => {
    const allPositions = filteredParticipants.map(p => p.position);
    setSelectedParticipants(new Set(allPositions));
  };

  const handleUnselectAllParticipants = () => {
    setSelectedParticipants(new Set());
  };

  const handleAddParticipant = (position: string) => {
    setSelectedParticipants(prev => new Set([...prev, position]));
  };

  const handleRemoveParticipant = (position: string) => {
    setSelectedParticipants(prev => {
      const newSet = new Set(prev);
      newSet.delete(position);
      return newSet;
    });
  };

  // Checkbox event handlers
  const onSelectAllChecked = () => {
    handleSelectAllParticipants();
  };

  const onSelectAllUnchecked = () => {
    handleUnselectAllParticipants();
  };

  const onParticipantChecked = (position: string) => () => {
    handleAddParticipant(position);
  };

  const onParticipantUnchecked = (position: string) => () => {
    handleRemoveParticipant(position);
  };

  const filteredParticipants = getFilteredParticipants();
  const isAllSelected = filteredParticipants.length > 0 && filteredParticipants.every(p => selectedParticipants.has(p.position));
  const isIndeterminate = selectedParticipants.size > 0 && !isAllSelected;

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
            <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 p-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Back</span>
            </Button>
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

      {/* Navigation Tabs */}
      <nav className="w-full bg-blue-700">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px]">
          <div className="flex space-x-0 overflow-x-auto">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  tab.active
                    ? 'bg-blue-600 text-white border-b-2 border-white'
                    : 'text-blue-100 hover:text-white hover:bg-blue-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
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

        {/* Filters and Controls - Fixed Vertical Layout */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0">
            {/* Filter Controls - Vertical Layout */}
            <div className="space-y-4">
              {/* Kelas Filter */}
              <div className="flex items-center space-x-3">
                <label htmlFor="kelas-select" className="text-sm font-medium text-gray-700 w-20">
                  Kelas:
                </label>
                <select
                  id="kelas-select"
                  value={selectedKelas}
                  onChange={(e) => setSelectedKelas(e.target.value)}
                  className="px-3 py-1.5 border border-blue-300 rounded-md text-sm bg-white text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
                >
                  <option value="Master - 20m">Master - 20m</option>
                  <option value="Master - 30m">Master - 30m</option>
                </select>
              </div>

              {/* Jenis Regu Filter */}
              <fieldset className="flex items-start space-x-3">
                <legend className="text-sm font-medium text-gray-700 w-20 pt-1.5">
                  Jenis Regu:
                </legend>
                <div className="flex flex-wrap gap-2 max-w-md">
                  {['Individu Putra', 'Individu Putri', 'Beregu Putra', 'Beregu Putri', 'Beregu Campuran'].map((jenis) => (
                    <label
                      key={jenis}
                      className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                        selectedJenisRegu === jenis
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="jenis-regu"
                        value={jenis}
                        checked={selectedJenisRegu === jenis}
                        onChange={() => setSelectedJenisRegu(jenis)}
                        className="sr-only"
                      />
                      {jenis}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Right Side - Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Babak Eliminasi Status */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Babak Eliminasi</span>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  ✓ 8 Besar (1...)
                </Badge>
              </div>

              {/* Search */}
              <div className="relative">
                <label htmlFor="search-input" className="sr-only">Cari peserta</label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search-input"
                  type="text"
                  placeholder="Cari peserta"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-48 text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  <Download className="w-4 h-4 mr-2" />
                  Unduh Dokumen
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                  Batalkan Bagan Eliminasi
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Scoring Table */}
        <div className={`grid ${isDetailExpanded ? 'grid-cols-2 gap-6' : 'grid-cols-1'}`}>
          {/* Main Table Column */}
          <div className="w-full">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-700 w-8">🎯</th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-700 w-8">🏆</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-700 min-w-[150px]">Nama Peserta</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-700 min-w-[120px]">Klub</th>
                        <th className="text-center py-3 px-3 text-xs font-medium text-gray-700 w-16">Sesi 1</th>
                        <th className="text-center py-3 px-3 text-xs font-medium text-gray-700 w-16">Sesi 2</th>
                        <th className="text-center py-3 px-3 text-xs font-medium text-gray-700 w-20">Jumlah Panah</th>
                        <th className="text-center py-3 px-3 text-xs font-medium text-gray-700 w-16">Total</th>
                        <th className="text-center py-3 px-3 text-xs font-medium text-gray-700 w-16">X+10</th>
                        <th className="text-center py-3 px-3 text-xs font-medium text-gray-700 w-12">X</th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-700 w-12">
                          <input
                            type="checkbox"
                            checked={isAllSelected}
                            ref={checkbox => {
                              if (checkbox) checkbox.indeterminate = isIndeterminate;
                            }}
                            onChange={(e) => e.target.checked ? onSelectAllChecked() : onSelectAllUnchecked()}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-700 w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredParticipants.map((participant) => (
                        <tr 
                          key={participant.position} 
                          className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            selectedParticipant?.position === participant.position ? 'bg-blue-50' : ''
                          }`}
                        >
                          <td className="py-3 px-2 text-center text-xs text-gray-600">
                            {participant.position}
                          </td>
                          <td className="py-3 px-2 text-center text-xs font-medium text-gray-900">
                            {participant.rank}
                          </td>
                          <td 
                            className="py-3 px-4 text-xs font-medium text-gray-900 cursor-pointer"
                            onClick={() => handleParticipantClick(participant)}
                          >
                            {participant.name}
                          </td>
                          <td 
                            className="py-3 px-4 text-xs text-gray-600 cursor-pointer"
                            onClick={() => handleParticipantClick(participant)}
                          >
                            {participant.club}
                          </td>
                          <td 
                            className="py-3 px-3 text-center text-xs text-gray-900 cursor-pointer"
                            onClick={() => handleParticipantClick(participant)}
                          >
                            {participant.sesi1}
                          </td>
                          <td 
                            className="py-3 px-3 text-center text-xs text-gray-900 cursor-pointer"
                            onClick={() => handleParticipantClick(participant)}
                          >
                            {participant.sesi2}
                          </td>
                          <td 
                            className="py-3 px-3 text-center text-xs text-gray-900 cursor-pointer"
                            onClick={() => handleParticipantClick(participant)}
                          >
                            {participant.jumlahPanah}
                          </td>
                          <td 
                            className="py-3 px-3 text-center text-xs font-medium text-gray-900 cursor-pointer"
                            onClick={() => handleParticipantClick(participant)}
                          >
                            {participant.total}
                          </td>
                          <td 
                            className="py-3 px-3 text-center text-xs text-gray-900 cursor-pointer"
                            onClick={() => handleParticipantClick(participant)}
                          >
                            {participant.x10}
                          </td>
                          <td 
                            className="py-3 px-3 text-center text-xs text-gray-900 cursor-pointer"
                            onClick={() => handleParticipantClick(participant)}
                          >
                            {participant.x}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedParticipants.has(participant.position)}
                              onChange={(e) => e.target.checked 
                                ? onParticipantChecked(participant.position)() 
                                : onParticipantUnchecked(participant.position)()}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td className="py-3 px-2 text-center">
                            <button
                              onClick={() => handleParticipantClick(participant)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              aria-label={selectedParticipant?.position === participant.position ? "Close details" : "View details"}
                            >
                              {selectedParticipant?.position === participant.position ? (
                                <X className="w-4 h-4 text-blue-600" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detail Column */}
          {isDetailExpanded && selectedParticipant && (
            <div className="w-full">
              <Card>
                <CardContent className="p-0">
                  {/* Detail Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedParticipant.name}</h3>
                        <p className="text-sm text-gray-600">{selectedParticipant.club}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">Total</span>
                          <span className="text-sm text-gray-600">Akumulasi Skor</span>
                          <span className="text-lg font-bold text-blue-600">{selectedParticipant.total}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCloseDetail}
                        className="p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Session Tabs */}
                  <div className="border-b border-gray-200">
                    <nav className="flex">
                      {[
                        { id: 'session1', label: 'Sesi 1' },
                        { id: 'session2', label: 'Sesi 2' },
                        { id: 'shootoff', label: 'Shoot-off' }
                      ].map((session) => (
                        <button
                          key={session.id}
                          onClick={() => setActiveSession(session.id as any)}
                          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeSession === session.id
                              ? 'border-blue-500 text-blue-600 bg-blue-50'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {session.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Scoring Detail */}
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-center py-2 px-2 text-xs font-medium text-gray-700 w-12">End</th>
                            <th className="text-center py-2 px-2 text-xs font-medium text-gray-700 w-12">Shot</th>
                            <th className="text-center py-2 px-2 text-xs font-medium text-gray-700 w-8">1</th>
                            <th className="text-center py-2 px-2 text-xs font-medium text-gray-700 w-8">2</th>
                            <th className="text-center py-2 px-2 text-xs font-medium text-gray-700 w-8">3</th>
                            <th className="text-center py-2 px-2 text-xs font-medium text-gray-700 w-8">4</th>
                            <th className="text-center py-2 px-2 text-xs font-medium text-gray-700 w-8">5</th>
                            <th className="text-center py-2 px-2 text-xs font-medium text-gray-700 w-8">6</th>
                            <th className="text-center py-2 px-2 text-xs font-medium text-gray-700 w-16">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scoringDetails.map((detail, index) => (
                            <tr key={`${detail.end}-${detail.shot}`} className="border-b border-gray-100">
                              <td className="py-2 px-2 text-center text-xs text-gray-900">
                                {detail.end}
                              </td>
                              <td className="py-2 px-2 text-center text-xs font-medium text-blue-600">
                                {detail.shot}
                              </td>
                              {detail.arrows.map((arrow, arrowIndex) => (
                                <td key={`${detail.end}-${detail.shot}-arrow-${arrowIndex + 1}`} className="py-2 px-2 text-center">
                                  <Input
                                    type="text"
                                    value={arrow}
                                    onChange={(e) => handleScoreInput(index, arrowIndex, e.target.value)}
                                    className="w-8 h-6 text-xs text-center border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                  />
                                </td>
                              ))}
                              <td className="py-2 px-2 text-center text-xs font-medium text-gray-900">
                                {detail.total}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Session Summary */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex space-x-4">
                          <span>X+10: <strong>27</strong></span>
                          <span>X: <strong>15</strong></span>
                        </div>
                        <div>
                          <span>Total: <strong>349</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
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