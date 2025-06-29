import { Card, CardContent } from '@/components/ui/card';

interface LiveScoreParticipant {
  readonly peringkat: number;
  readonly bantalan: string;
  readonly nama: string;
  readonly klub: string;
  readonly sesi1: number;
  readonly sesi2: number;
  readonly total: number;
  readonly x10: number;
  readonly x: number;
}

interface LiveScoreTableProps {
  participants: LiveScoreParticipant[];
  isAnimating: boolean;
  currentIndex: number;
  totalParticipants: number;
}

export function LiveScoreTable({ 
  participants, 
  isAnimating, 
  currentIndex, 
  totalParticipants 
}: LiveScoreTableProps) {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        {/* Table Header */}
        <div className="bg-gray-100 border-b-2 border-gray-300">
          <div className="grid grid-cols-9 gap-0 py-4 px-6">
            <div className="text-center">
              <span className="text-xl font-bold text-gray-700">Peringkat</span>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-gray-700">Bantalan</span>
            </div>
            <div className="text-left col-span-2">
              <span className="text-xl font-bold text-gray-700">NAMA</span>
            </div>
            <div className="text-left col-span-2">
              <span className="text-xl font-bold text-gray-700">KLUB</span>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-gray-700">Sesi 1</span>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-gray-700">Sesi 2</span>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-gray-700">TOTAL</span>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-gray-700">X+10</span>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-gray-700">X</span>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="bg-white">
          {participants.map((participant, index) => (
            <div 
              key={`${participant.peringkat}-${participant.bantalan}-${index}`}
              className={`
                grid grid-cols-9 gap-0 py-6 px-6 border-b border-gray-200
                transition-all duration-500 ease-in-out
                ${isAnimating ? 'animate-pulse' : ''}
                ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                hover:bg-blue-50
              `}
              style={{
                animationDelay: `${index * 100}ms`,
                minHeight: '80px'
              }}
            >
              {/* Ranking */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">
                  {participant.peringkat}
                </span>
              </div>

              {/* Bantalan */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-900">
                  {participant.bantalan}
                </span>
              </div>

              {/* Name */}
              <div className="col-span-2 flex items-center">
                <span className="text-2xl font-bold text-gray-900 leading-tight">
                  {participant.nama}
                </span>
              </div>

              {/* Club */}
              <div className="col-span-2 flex items-center">
                <span className="text-xl text-gray-700 leading-tight">
                  {participant.klub}
                </span>
              </div>

              {/* Session 1 */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-900">
                  {participant.sesi1}
                </span>
              </div>

              {/* Session 2 */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-900">
                  {participant.sesi2}
                </span>
              </div>

              {/* Total */}
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {participant.total}
                </span>
              </div>

              {/* X+10 */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-900">
                  {participant.x10}
                </span>
              </div>

              {/* X */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-900">
                  {participant.x}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        {isAnimating && (
          <div className="bg-blue-700 text-white p-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                <span className="text-lg font-medium">
                  Menampilkan {currentIndex + 1}-{Math.min(currentIndex + 8, totalParticipants)} dari {totalParticipants} peserta
                </span>
                <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3 w-full bg-blue-600 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ 
                  width: `${((currentIndex + 8) / totalParticipants) * 100}%` 
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}