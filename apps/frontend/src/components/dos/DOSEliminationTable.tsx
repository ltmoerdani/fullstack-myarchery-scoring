import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

interface DOSEliminationTableProps {
  matches: EliminationMatch[];
}

export function DOSEliminationTable({ matches }: DOSEliminationTableProps) {
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
                    ))}
                  </div>
                </TableCell>

                {/* Right Score */}
                <TableCell className="text-center">
                  <div className="flex space-x-1 justify-center">
                    {match.rightPlayer?.scores.map((score, scoreIndex) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}