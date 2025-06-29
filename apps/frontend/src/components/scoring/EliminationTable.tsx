import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Copy } from 'lucide-react';

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

interface EliminationTableProps {
  matches: EliminationMatch[];
  onMatchAction: (matchId: string, action: 'determine' | 'cancel') => void;
  onScoreChange: (matchId: string, player: 'left' | 'right', scoreIndex: number, value: string) => void;
  onEditMatch: (match: EliminationMatch) => void;
}

export function EliminationTable({ matches, onMatchAction, onScoreChange, onEditMatch }: EliminationTableProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center w-8">🎯</TableHead>
              <TableHead className="min-w-[150px]">Nama Peserta</TableHead>
              <TableHead className="text-center w-20">Total Set Poin</TableHead>
              <TableHead className="text-center w-20">Total Set Poin</TableHead>
              <TableHead className="min-w-[150px]">Nama Peserta</TableHead>
              <TableHead className="text-center w-8">🎯</TableHead>
              <TableHead className="text-center w-32">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => (
              <TableRow key={match.id} className="hover:bg-gray-50">
                {/* Left Player */}
                <TableCell className="text-center text-xs text-gray-600">
                  -
                </TableCell>
                <TableCell className="text-xs font-medium text-gray-900">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      #{match.leftPlayer?.rank}
                    </span>
                    <span>{match.leftPlayer?.name}</span>
                  </div>
                </TableCell>
                
                {/* Left Score */}
                <TableCell className="text-center">
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
                          onChange={(e) => onScoreChange(match.id, 'left', scoreIndex, e.target.value)}
                          className="w-8 h-6 text-xs text-center border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          min="0"
                          max="10"
                        />
                      )
                    ))}
                  </div>
                </TableCell>

                {/* Right Score */}
                <TableCell className="text-center">
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
                          onChange={(e) => onScoreChange(match.id, 'right', scoreIndex, e.target.value)}
                          className="w-8 h-6 text-xs text-center border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          min="0"
                          max="10"
                        />
                      )
                    ))}
                  </div>
                </TableCell>

                {/* Right Player */}
                <TableCell className="text-xs font-medium text-gray-900">
                  <div className="flex items-center space-x-2">
                    <span>{match.rightPlayer?.name}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      #{match.rightPlayer?.rank}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="text-center text-xs text-gray-600">
                  -
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <div className="flex space-x-2 justify-center">
                    {match.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => onMatchAction(match.id, 'determine')}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                      >
                        Tentukan
                      </Button>
                    )}
                    {match.status === 'determined' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onMatchAction(match.id, 'cancel')}
                        className="text-red-600 border-red-300 hover:bg-red-50 text-xs px-3 py-1"
                      >
                        Batalkan
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEditMatch(match)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}