import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Target,
  User,
  LogOut,
  Home,
  Download,
  Settings,
  X,
  Edit,
  Copy,
  ChevronLeft
} from 'lucide-react';

interface ScoringEliminasiProps {
  onBack: () => void;
}

interface EliminationMatch {
  id: string;
  leftPlayer: {
    rank: number;
    name: string;
    scores: number[];
  } | null;
  rightPlayer: {
    rank: number;
    name: string;
    scores: number[];
  } | null;
  winner?: 'left' | 'right';
  status: 'pending' | 'determined' | 'completed';
}

interface ScoresheetData {
  leftPlayer: {
    rank: number;
    name: string;
    category: string;
    distance: string;
    shots: Array<{
      shot1: string;
      shot2: string;
      shot3: string;
      sum: number;
      poin: number;
    }>;
    shootOff?: {
      shot1: string;
      shot2: string;
      shot3: string;
    };
    totalSum: number;
    totalPoin: number;
  };
  rightPlayer: {
    rank: number;
    name: string;
    category: string;
    distance: string;
    shots: Array<{
      shot1: string;
      shot2: string;
      shot3: string;
      sum: number;
      poin: number;
    }>;
    shootOff?: {
      shot1: string;
      shot2: string;
      shot3: string;
    };
    totalSum: number;
    totalPoin: number;
  };
}

const getValue = (shot: string): number => {
  if (shot === 'X') return 10;
  if (shot === 'M') return 0;
  return parseInt(shot) || 0;
};

const calculateSum = (shot1: string, shot2: string, shot3: string): number => {
  return getValue(shot1) + getValue(shot2) + getValue(shot3);
};

const handleScoreInput = (
  player: 'left' | 'right',
  shotIndex: number,
  field: 'shot1' | 'shot2' | 'shot3',
  value: string,
  setScoresheetData: React.Dispatch<React.SetStateAction<ScoresheetData>>,
  isScoreLocked: boolean
) => {
  if (isScoreLocked) return;
  
  setScoresheetData((prev) => {
    const newData = { ...prev };
    const targetPlayer = player === 'left' ? newData.leftPlayer : newData.rightPlayer;
    const shot = targetPlayer.shots[shotIndex];
    shot[field] = value;
    shot.sum = calculateSum(shot.shot1, shot.shot2, shot.shot3);
    return newData;
  });
};

const handleMatchAction = (
  matchId: string, 
  action: 'determine' | 'cancel',
  setEliminationMatches: React.Dispatch<React.SetStateAction<EliminationMatch[]>>
) => {
  setEliminationMatches(prev => prev.map(match => 
    match.id === matchId 
      ? { ...match, status: action === 'determine' ? 'determined' : 'pending' }
      : match
  ));
};

const handleScoreChange = (
  matchId: string,
  player: 'left' | 'right',
  scoreIndex: number,
  value: string,
  setEliminationMatches: React.Dispatch<React.SetStateAction<EliminationMatch[]>>
) => {
  setEliminationMatches(prev => prev.map(match => {
    if (match.id === matchId && match[`${player}Player`]) {
      const newScores = [...match[`${player}Player`]!.scores];
      newScores[scoreIndex] = parseInt(value) || 0;
      return {
        ...match,
        [`${player}Player`]: {
          ...match[`${player}Player`]!,
          scores: newScores
        }
      };
    }
    return match;
  }));
};

export function ScoringEliminasi({ onBack }: Readonly<ScoringEliminasiProps>) {
  const [activeTab, setActiveTab] = useState<'recurve' | 'compound' | 'nasional' | 'barebow'>('recurve');
  const [selectedKelas, setSelectedKelas] = useState('Umum - 70m');
  const [selectedJenisRegu, setSelectedJenisRegu] = useState('Individu Putra');
  const [showScoresheet, setShowScoresheet] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<EliminationMatch | null>(null);
  const [isScoreLocked, setIsScoreLocked] = useState(false);

  // Sample elimination matches data
  const [eliminationMatches, setEliminationMatches] = useState<EliminationMatch[]>([
    {
      id: '16-besar-1',
      leftPlayer: {
        rank: 1,
        name: 'Riguna A. Fazar',
        scores: [6, 0]
      },
      rightPlayer: {
        rank: 16,
        name: 'Erwin Arief Wibowo',
        scores: [0, 2]
      },
      status: 'completed',
      winner: 'left'
    },
    {
      id: '16-besar-2',
      leftPlayer: {
        rank: 9,
        name: 'Satrio wibowo',
        scores: [0, 0]
      },
      rightPlayer: {
        rank: 8,
        name: 'Reza Holyus Perdana',
        scores: [0, 0]
      },
      status: 'pending'
    },
    {
      id: '16-besar-3',
      leftPlayer: {
        rank: 5,
        name: 'abuza',
        scores: [5, 0]
      },
      rightPlayer: {
        rank: 12,
        name: 'M Yusuf',
        scores: [0, 6]
      },
      status: 'completed',
      winner: 'right'
    },
    {
      id: '16-besar-4',
      leftPlayer: {
        rank: 13,
        name: 'Muhammad Irfan Ilmi',
        scores: [3, 0]
      },
      rightPlayer: {
        rank: 4,
        name: 'Andreas Aris Susanto',
        scores: [0, 7]
      },
      status: 'completed',
      winner: 'right'
    },
    {
      id: '16-besar-5',
      leftPlayer: {
        rank: 3,
        name: 'Wiwit Widodo',
        scores: [6, 0]
      },
      rightPlayer: {
        rank: 14,
        name: 'dwijo Siswoyo',
        scores: [0, 0]
      },
      status: 'completed',
      winner: 'left'
    },
    {
      id: '16-besar-6',
      leftPlayer: {
        rank: 11,
        name: 'TRI SUSANTO',
        scores: [2, 0]
      },
      rightPlayer: {
        rank: 6,
        name: 'LUKMAN HAKIM',
        scores: [0, 6]
      },
      status: 'completed',
      winner: 'right'
    },
    {
      id: '16-besar-7',
      leftPlayer: {
        rank: 7,
        name: 'Erdiyansyah alim',
        scores: [6, 0]
      },
      rightPlayer: {
        rank: 10,
        name: 'Abu Gaza',
        scores: [0, 4]
      },
      status: 'completed',
      winner: 'left'
    },
    {
      id: '16-besar-8',
      leftPlayer: {
        rank: 15,
        name: 'TRI HARTANTO',
        scores: [3, 0]
      },
      rightPlayer: {
        rank: 2,
        name: 'Rangga Ganzar Noegraha',
        scores: [0, 7]
      },
      status: 'completed',
      winner: 'right'
    }
  ]);

  // Sample scoresheet data
  const [scoresheetData, setScoresheetData] = useState<ScoresheetData>({
    leftPlayer: {
      rank: 5,
      name: 'Rizqi Kusuma',
      category: 'Individu Putra',
      distance: 'Recurve Umum ↔ 70m',
      shots: [
        { shot1: '8', shot2: '8', shot3: '7', sum: 23, poin: 0 },
        { shot1: 'X', shot2: '10', shot3: '8', sum: 28, poin: 2 },
        { shot1: 'X', shot2: '10', shot3: '9', sum: 29, poin: 2 },
        { shot1: 'M', shot2: '8', shot3: '4', sum: 12, poin: 0 },
        { shot1: 'X', shot2: '10', shot3: '7', sum: 27, poin: 0 }
      ],
      shootOff: { shot1: '', shot2: '', shot3: '' },
      totalSum: 119,
      totalPoin: 4
    },
    rightPlayer: {
      rank: 2,
      name: 'Aryaseta Chandra Putra',
      category: 'Individu Putra',
      distance: 'Recurve Umum ↔ 70m',
      shots: [
        { shot1: '10', shot2: '9', shot3: '8', sum: 27, poin: 2 },
        { shot1: '9', shot2: '9', shot3: '9', sum: 27, poin: 0 },
        { shot1: '10', shot2: '9', shot3: '9', sum: 28, poin: 0 },
        { shot1: '9', shot2: '9', shot3: '7', sum: 25, poin: 2 },
        { shot1: '10', shot2: '9', shot3: '9', sum: 28, poin: 2 }
      ],
      shootOff: { shot1: '', shot2: '', shot3: '' },
      totalSum: 135,
      totalPoin: 6
    }
  });

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'scoring-kualifikasi', label: 'Scoring Kualifikasi', icon: Target },
    { id: 'scoring-eliminasi', label: 'Scoring Eliminasi', icon: Settings, active: true },
    { id: 'dokumen', label: 'Dokumen', icon: Download }
  ];

  const handleScoreInputWrapper = (
    player: 'left' | 'right',
    shotIndex: number,
    field: 'shot1' | 'shot2' | 'shot3',
    value: string
  ) => {
    handleScoreInput(player, shotIndex, field, value, setScoresheetData, isScoreLocked);
  };

  const handleMatchActionWrapper = (matchId: string, action: 'determine' | 'cancel') => {
    handleMatchAction(matchId, action, setEliminationMatches);
  };

  const handleScoreChangeWrapper = (matchId: string, player: 'left' | 'right', scoreIndex: number, value: string) => {
    handleScoreChange(matchId, player, scoreIndex, value, setEliminationMatches);
  };

  const handleEditClick = (match: EliminationMatch) => {
    setSelectedMatch(match);
    setShowScoresheet(true);
    setIsScoreLocked(match.status === 'determined');
  };

  const handleSaveScoresheet = () => {
    // Update match status to determined
    if (selectedMatch) {
      handleMatchActionWrapper(selectedMatch.id, 'determine');
    }
    setShowScoresheet(false);
  };

  const handleCancelScoresheet = () => {
    setShowScoresheet(false);
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
              {[
                { id: 'recurve', label: 'Recurve' },
                { id: 'compound', label: 'Compound' },
                { id: 'nasional', label: 'Nasional' },
                { id: 'barebow', label: 'Barebow' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Filters and Controls - Vertical Layout */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0">
            {/* Filter Controls - Vertical Layout */}
            <div className="space-y-4">
              {/* Kelas Filter */}
              <div className="flex items-center space-x-3">
                <label htmlFor="kelas-filter" className="text-sm font-medium text-gray-700 w-20">
                  Kelas:
                </label>
                <fieldset className="flex space-x-2">
                  <legend className="sr-only">Pilih Kelas</legend>
                  {['Umum - 70m', 'U-15 - 50m', 'Master - 70m'].map((kelas) => (
                    <button
                      key={kelas}
                      onClick={() => setSelectedKelas(kelas)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        selectedKelas === kelas
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {kelas}
                    </button>
                  ))}
                </fieldset>
              </div>

              {/* Jenis Regu Filter */}
              <div className="flex items-start space-x-3">
                <label htmlFor="jenis-regu-filter" className="text-sm font-medium text-gray-700 w-20 pt-1.5">
                  Jenis Regu:
                </label>
                <fieldset className="flex flex-wrap gap-2 max-w-md">
                  <legend className="sr-only">Pilih Jenis Regu</legend>
                  {['Individu Putra', 'Individu Putri', 'Beregu Putra', 'Beregu Putri', 'Beregu Campuran'].map((jenis) => (
                    <button
                      key={jenis}
                      onClick={() => setSelectedJenisRegu(jenis)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        selectedJenisRegu === jenis
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {jenis}
                    </button>
                  ))}
                </fieldset>
              </div>
            </div>

            {/* Right Side - Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  <Download className="w-4 h-4 mr-2" />
                  Cetak Bagan
                </Button>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <span className="mr-2">👁</span>Lihat Bagan
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Elimination Rounds Navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              {['16 Besar', '8 Besar', 'Semi-Final', 'Final', '3rd Place'].map((round) => (
                <button
                  key={`round-${round.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-sm font-medium transition-colors ${
                    round === '16 Besar'
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-2'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {round}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Cetak Scoresheet Kosong
              </Button>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Unduh Semua Scoresheet
              </Button>
            </div>
          </div>
        </div>

        {/* Elimination Bracket */}
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-center py-3 px-2 text-xs font-medium text-gray-700 w-8">🎯</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-700 min-w-[150px]">Nama Peserta</th>
                    <th className="text-center py-3 px-3 text-xs font-medium text-gray-700 w-20">Total Set Poin</th>
                    <th className="text-center py-3 px-3 text-xs font-medium text-gray-700 w-20">Total Set Poin</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-700 min-w-[150px]">Nama Peserta</th>
                    <th className="text-center py-3 px-2 text-xs font-medium text-gray-700 w-8">🎯</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-700 w-32">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {eliminationMatches.map((match) => (
                    <tr key={match.id} className="border-b border-gray-100 hover:bg-gray-50">
                      {/* Left Player */}
                      <td className="py-3 px-2 text-center text-xs text-gray-600">
                        -
                      </td>
                      <td className="py-3 px-4 text-xs font-medium text-gray-900">
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            #{match.leftPlayer?.rank}
                          </span>
                          <span>{match.leftPlayer?.name}</span>
                        </div>
                      </td>
                      
                      {/* Left Score */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex space-x-1 justify-center">
                          {match.leftPlayer?.scores.map((score, scoreIndex) => (
                            match.status === 'completed' ? (
                              <span
                                key={`${match.id}-left-${scoreIndex}`}
                                className={`w-6 h-6 flex items-center justify-center text-xs font-medium rounded ${
                                  score > (match.rightPlayer?.scores[scoreIndex] ?? 0)
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {score}
                              </span>
                            ) : (
                              <Input
                                key={`${match.id}-left-${scoreIndex}`}
                                type="number"
                                value={score}
                                onChange={(e) => handleScoreChangeWrapper(match.id, 'left', scoreIndex, e.target.value)}
                                className="w-8 h-6 text-xs text-center border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                min="0"
                                max="10"
                              />
                            )
                          ))}
                        </div>
                      </td>

                      {/* Right Score */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex space-x-1 justify-center">
                          {match.rightPlayer?.scores.map((score, scoreIndex) => (
                            match.status === 'completed' ? (
                              <span
                                key={`${match.id}-right-${scoreIndex}`}
                                className={`w-6 h-6 flex items-center justify-center text-xs font-medium rounded ${
                                  score > (match.leftPlayer?.scores[scoreIndex] ?? 0)
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {score}
                              </span>
                            ) : (
                              <Input
                                key={`${match.id}-right-${scoreIndex}`}
                                type="number"
                                value={score}
                                onChange={(e) => handleScoreChangeWrapper(match.id, 'right', scoreIndex, e.target.value)}
                                className="w-8 h-6 text-xs text-center border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                min="0"
                                max="10"
                              />
                            )
                          ))}
                        </div>
                      </td>

                      {/* Right Player */}
                      <td className="py-3 px-4 text-xs font-medium text-gray-900">
                        <div className="flex items-center space-x-2">
                          <span>{match.rightPlayer?.name}</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            #{match.rightPlayer?.rank}
                          </span>
                        </div>
                      </td>
                      
                      <td className="py-3 px-2 text-center text-xs text-gray-600">
                        -
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex space-x-2 justify-center">
                          {match.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => handleMatchActionWrapper(match.id, 'determine')}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                            >
                              Tentukan
                            </Button>
                          )}
                          {match.status === 'determined' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMatchActionWrapper(match.id, 'cancel')}
                              className="text-red-600 border-red-300 hover:bg-red-50 text-xs px-3 py-1"
                            >
                              Batalkan
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditClick(match)}
                            className="text-blue-600 border-blue-300 hover:bg-blue-50 text-xs px-3 py-1"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-gray-600 border-gray-300 hover:bg-gray-50 text-xs px-2 py-1"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Scoresheet Popup */}
      {showScoresheet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Scoresheet</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelScoresheet}
                className="p-1"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Scoresheet Content */}
            <div className="p-6">
              {/* Match Header */}
              <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium">
                    #{scoresheetData.leftPlayer.rank}
                  </span>
                  <span className="font-medium">{scoresheetData.leftPlayer.name}</span>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{scoresheetData.leftPlayer.category}</div>
                  <div className="text-sm font-medium text-blue-600">
                    🏹 {scoresheetData.leftPlayer.distance}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{scoresheetData.rightPlayer.name}</span>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium">
                    #{scoresheetData.rightPlayer.rank}
                  </span>
                </div>
              </div>

              {/* Scoring Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700">Shot</th>
                      <th className="border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700">Sum</th>
                      <th className="border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700">Poin</th>
                      <th className="border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700">Poin</th>
                      <th className="border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700">Sum</th>
                      <th className="border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700">Shot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoresheetData.leftPlayer.shots.map((leftShot, index) => {
                      const rightShot = scoresheetData.rightPlayer.shots[index];
                      return (
                        <tr key={`shot-${index + 1}`}>
                          {/* Left Player Shots */}
                          <td className="border border-gray-300 py-2 px-2">
                            <div className="flex space-x-1">
                              {['shot1', 'shot2', 'shot3'].map((shotField) => (
                                <select
                                  key={`left-${index + 1}-${shotField}`}
                                  value={leftShot[shotField as keyof typeof leftShot]}
                                  onChange={(e) => handleScoreInputWrapper('left', index, shotField as any, e.target.value)}
                                  disabled={isScoreLocked}
                                  className={`w-12 h-8 text-center text-sm border border-gray-300 rounded ${
                                    isScoreLocked ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                                  }`}
                                >
                                  <option value="">-</option>
                                  <option value="X">X</option>
                                  <option value="10">10</option>
                                  <option value="9">9</option>
                                  <option value="8">8</option>
                                  <option value="7">7</option>
                                  <option value="6">6</option>
                                  <option value="5">5</option>
                                  <option value="4">4</option>
                                  <option value="3">3</option>
                                  <option value="2">2</option>
                                  <option value="1">1</option>
                                  <option value="M">M</option>
                                </select>
                              ))}
                            </div>
                          </td>
                          <td className="border border-gray-300 py-2 px-3 text-center text-sm font-medium">
                            {leftShot.sum}
                          </td>
                          <td className="border border-gray-300 py-2 px-3 text-center">
                            <div className="flex justify-center">
                              <span className={`w-8 h-8 rounded text-sm font-medium flex items-center justify-center ${
                                leftShot.poin > rightShot.poin ? 'bg-gray-400 text-white' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {leftShot.poin}
                              </span>
                            </div>
                          </td>
                          <td className="border border-gray-300 py-2 px-3 text-center">
                            <div className="flex justify-center">
                              <span className={`w-8 h-8 rounded text-sm font-medium flex items-center justify-center ${
                                rightShot.poin > leftShot.poin ? 'bg-gray-400 text-white' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {rightShot.poin}
                              </span>
                            </div>
                          </td>
                          <td className="border border-gray-300 py-2 px-3 text-center text-sm font-medium">
                            {rightShot.sum}
                          </td>
                          {/* Right Player Shots */}
                          <td className="border border-gray-300 py-2 px-2">
                            <div className="flex space-x-1">
                              {['shot1', 'shot2', 'shot3'].map((shotField) => (
                                <select
                                  key={`right-${index + 1}-${shotField}`}
                                  value={rightShot[shotField as keyof typeof rightShot]}
                                  onChange={(e) => handleScoreInputWrapper('right', index, shotField as any, e.target.value)}
                                  disabled={isScoreLocked}
                                  className={`w-12 h-8 text-center text-sm border border-gray-300 rounded ${
                                    isScoreLocked ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                                  }`}
                                >
                                  <option value="">-</option>
                                  <option value="X">X</option>
                                  <option value="10">10</option>
                                  <option value="9">9</option>
                                  <option value="8">8</option>
                                  <option value="7">7</option>
                                  <option value="6">6</option>
                                  <option value="5">5</option>
                                  <option value="4">4</option>
                                  <option value="3">3</option>
                                  <option value="2">2</option>
                                  <option value="1">1</option>
                                  <option value="M">M</option>
                                </select>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    
                    {/* Shoot-off Row */}
                    <tr>
                      <td className="border border-gray-300 py-2 px-2">
                        <div className="flex space-x-1">
                          {['shot1', 'shot2', 'shot3'].map((shotField) => (
                            <select
                              key={`left-shoot-off-${shotField}`}
                              value={scoresheetData.leftPlayer.shootOff?.[shotField as keyof typeof scoresheetData.leftPlayer.shootOff] ?? ''}
                              disabled={isScoreLocked}
                              className={`w-12 h-8 text-center text-sm border border-gray-300 rounded ${
                                isScoreLocked ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                              }`}
                            >
                              <option value="">-</option>
                              <option value="X">X</option>
                              <option value="10">10</option>
                              <option value="9">9</option>
                              <option value="8">8</option>
                              <option value="7">7</option>
                              <option value="6">6</option>
                              <option value="5">5</option>
                              <option value="4">4</option>
                              <option value="3">3</option>
                              <option value="2">2</option>
                              <option value="1">1</option>
                              <option value="M">M</option>
                            </select>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Jarak</div>
                      </td>
                      <td className="border border-gray-300 py-2 px-3 text-center text-sm">S-Off</td>
                      <td className="border border-gray-300 py-2 px-3 text-center text-sm">S-Off</td>
                      <td className="border border-gray-300 py-2 px-3 text-center text-sm">S-Off</td>
                      <td className="border border-gray-300 py-2 px-3 text-center text-sm">S-Off</td>
                      <td className="border border-gray-300 py-2 px-2">
                        <div className="flex space-x-1">
                          {['shot1', 'shot2', 'shot3'].map((shotField) => (
                            <select
                              key={`right-shoot-off-${shotField}`}
                              value={scoresheetData.rightPlayer.shootOff?.[shotField as keyof typeof scoresheetData.rightPlayer.shootOff] ?? ''}
                              disabled={isScoreLocked}
                              className={`w-12 h-8 text-center text-sm border border-gray-300 rounded ${
                                isScoreLocked ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                              }`}
                            >
                              <option value="">-</option>
                              <option value="X">X</option>
                              <option value="10">10</option>
                              <option value="9">9</option>
                              <option value="8">8</option>
                              <option value="7">7</option>
                              <option value="6">6</option>
                              <option value="5">5</option>
                              <option value="4">4</option>
                              <option value="3">3</option>
                              <option value="2">2</option>
                              <option value="1">1</option>
                              <option value="M">M</option>
                            </select>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Jarak</div>
                      </td>
                    </tr>

                    {/* Totals Row */}
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 py-2 px-3 text-center text-sm font-medium">
                        {scoresheetData.leftPlayer.totalSum}
                      </td>
                      <td className="border border-gray-300 py-2 px-3 text-center text-sm font-medium bg-gray-200">
                        {scoresheetData.leftPlayer.totalPoin}
                      </td>
                      <td className="border border-gray-300 py-2 px-3 text-center text-sm font-medium bg-gray-200">
                        {scoresheetData.rightPlayer.totalPoin}
                      </td>
                      <td className="border border-gray-300 py-2 px-3 text-center text-sm font-medium">
                        {scoresheetData.rightPlayer.totalSum}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={handleCancelScoresheet}
                  className="text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Batal
                </Button>
                {!isScoreLocked && (
                  <Button
                    onClick={handleSaveScoresheet}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Simpan
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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