import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

interface ClubMedalStanding {
  readonly peringkat: number;
  readonly klub: string;
  readonly logo: string;
  readonly emas: number;
  readonly perak: number;
  readonly perunggu: number;
  readonly total: number;
}

interface DOSMedalStandingsTableProps {
  standings: ClubMedalStanding[];
}

export function DOSMedalStandingsTable({ standings }: DOSMedalStandingsTableProps) {
  const getRankingBadgeColor = (peringkat: number) => {
    switch (peringkat) {
      case 1:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 3:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getRankingIcon = (peringkat: number) => {
    switch (peringkat) {
      case 1:
        return <Trophy className="w-4 h-4 text-yellow-600" />;
      case 2:
        return <Medal className="w-4 h-4 text-gray-600" />;
      case 3:
        return <Award className="w-4 h-4 text-orange-600" />;
      default:
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        {/* Table Header */}
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-blue-900">Semua Kategori</h3>
        </div>

        {/* Medal Standings Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center w-20">Peringkat</TableHead>
              <TableHead className="min-w-[200px]">Klub</TableHead>
              <TableHead className="text-center w-20">
                <div className="flex items-center justify-center space-x-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>Emas</span>
                </div>
              </TableHead>
              <TableHead className="text-center w-20">
                <div className="flex items-center justify-center space-x-1">
                  <Medal className="w-4 h-4 text-gray-500" />
                  <span>Perak</span>
                </div>
              </TableHead>
              <TableHead className="text-center w-20">
                <div className="flex items-center justify-center space-x-1">
                  <Award className="w-4 h-4 text-orange-500" />
                  <span>Perunggu</span>
                </div>
              </TableHead>
              <TableHead className="text-center w-20">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((club) => (
              <TableRow 
                key={`${club.peringkat}-${club.klub}`}
                className={`hover:bg-gray-50 transition-colors ${
                  club.peringkat <= 3 ? 'bg-gradient-to-r from-yellow-50/30 to-transparent' : ''
                }`}
              >
                {/* Ranking */}
                <TableCell className="text-center">
                  <div className="flex flex-col items-center space-y-1">
                    <span 
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border ${getRankingBadgeColor(club.peringkat)}`}
                    >
                      {club.peringkat}
                    </span>
                    {club.peringkat <= 3 && (
                      <div className="flex justify-center">
                        {getRankingIcon(club.peringkat)}
                      </div>
                    )}
                  </div>
                </TableCell>

                {/* Club Name with Logo */}
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                      {club.logo}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{club.klub}</p>
                      {club.peringkat <= 3 && (
                        <p className="text-xs text-gray-500">
                          {club.peringkat === 1 ? 'Juara Umum' : 
                           club.peringkat === 2 ? 'Runner Up' : 
                           'Juara 3'}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Gold Medals */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-lg font-bold text-yellow-600">{club.emas}</span>
                  </div>
                </TableCell>

                {/* Silver Medals */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-lg font-bold text-gray-600">{club.perak}</span>
                  </div>
                </TableCell>

                {/* Bronze Medals */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-lg font-bold text-orange-600">{club.perunggu}</span>
                  </div>
                </TableCell>

                {/* Total Medals */}
                <TableCell className="text-center">
                  <span className="text-lg font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {club.total}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Table Footer with Summary */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total {standings.length} klub berpartisipasi</span>
            <div className="flex items-center space-x-4">
              <span>Total Medali: {standings.reduce((sum, club) => sum + club.total, 0)}</span>
              <span>•</span>
              <span>Emas: {standings.reduce((sum, club) => sum + club.emas, 0)}</span>
              <span>•</span>
              <span>Perak: {standings.reduce((sum, club) => sum + club.perak, 0)}</span>
              <span>•</span>
              <span>Perunggu: {standings.reduce((sum, club) => sum + club.perunggu, 0)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}