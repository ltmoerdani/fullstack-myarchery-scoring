import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy, Medal, Award } from 'lucide-react';

interface Winner {
  readonly kategori: string;
  readonly medali: 'gold' | 'silver' | 'bronze';
  readonly nama: string;
  readonly klub: string;
  readonly skor?: number;
  readonly type: 'kualifikasi' | 'eliminasi';
}

interface DOSWinnersTableProps {
  winners: Winner[];
  competitionType: 'kualifikasi' | 'eliminasi';
}

export function DOSWinnersTable({ winners, competitionType }: DOSWinnersTableProps) {
  const getMedalIcon = (medali: string) => {
    switch (medali) {
      case 'gold':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'silver':
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 'bronze':
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getMedalBadgeColor = (medali: string) => {
    switch (medali) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'silver':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'bronze':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMedalText = (medali: string) => {
    switch (medali) {
      case 'gold':
        return 'Emas';
      case 'silver':
        return 'Perak';
      case 'bronze':
        return 'Perunggu';
      default:
        return medali;
    }
  };

  // Group winners by category
  const groupedWinners = winners.reduce((acc, winner) => {
    if (!acc[winner.kategori]) {
      acc[winner.kategori] = [];
    }
    acc[winner.kategori].push(winner);
    return acc;
  }, {} as Record<string, Winner[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedWinners).map(([kategori, categoryWinners]) => (
        <Card key={kategori}>
          <CardContent className="p-0">
            {/* Category Header */}
            <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-blue-900">Kategori</h3>
              <p className="text-blue-700 text-sm mt-1">{kategori}</p>
            </div>

            {/* Winners Table */}
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center w-16">Medali</TableHead>
                  <TableHead className="min-w-[200px]">Nama</TableHead>
                  <TableHead className="min-w-[150px]">Klub</TableHead>
                  {competitionType === 'kualifikasi' && (
                    <TableHead className="text-center w-20">Skor</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryWinners
                  .sort((a, b) => {
                    const medalOrder = { gold: 1, silver: 2, bronze: 3 };
                    return medalOrder[a.medali] - medalOrder[b.medali];
                  })
                  .map((winner, index) => (
                    <TableRow 
                      key={`${winner.kategori}-${winner.nama}-${index}`}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center space-y-1">
                          {getMedalIcon(winner.medali)}
                          <span 
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getMedalBadgeColor(winner.medali)}`}
                          >
                            {getMedalText(winner.medali)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {winner.nama}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {winner.klub}
                      </TableCell>
                      {competitionType === 'kualifikasi' && (
                        <TableCell className="text-center font-medium text-gray-900">
                          {winner.skor || '-'}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {/* Empty State */}
      {Object.keys(groupedWinners).length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Pemenang</h3>
            <p className="text-gray-600">
              Pemenang akan ditampilkan setelah kompetisi selesai.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}