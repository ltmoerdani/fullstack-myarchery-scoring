import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
}

interface DOSQualificationTableProps {
  participants: Participant[];
}

export function DOSQualificationTable({ participants }: DOSQualificationTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center w-8">🎯</TableHead>
              <TableHead className="text-center w-8">🏆</TableHead>
              <TableHead className="min-w-[150px]">Nama Peserta</TableHead>
              <TableHead className="min-w-[120px]">Klub</TableHead>
              <TableHead className="text-center w-16">Sesi 1</TableHead>
              <TableHead className="text-center w-16">Sesi 2</TableHead>
              <TableHead className="text-center w-20">Jumlah Panah</TableHead>
              <TableHead className="text-center w-16">Total</TableHead>
              <TableHead className="text-center w-16">X+10</TableHead>
              <TableHead className="text-center w-12">X</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow 
                key={participant.position}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="text-center text-xs text-gray-600">
                  {participant.position}
                </TableCell>
                <TableCell className="text-center text-xs font-medium text-gray-900">
                  {participant.rank}
                </TableCell>
                <TableCell className="text-xs font-medium text-gray-900">
                  {participant.name}
                </TableCell>
                <TableCell className="text-xs text-gray-600">
                  {participant.club}
                </TableCell>
                <TableCell className="text-center text-xs text-gray-900">
                  {participant.sesi1}
                </TableCell>
                <TableCell className="text-center text-xs text-gray-900">
                  {participant.sesi2}
                </TableCell>
                <TableCell className="text-center text-xs text-gray-900">
                  {participant.jumlahPanah}
                </TableCell>
                <TableCell className="text-center text-xs font-medium text-gray-900">
                  {participant.total}
                </TableCell>
                <TableCell className="text-center text-xs text-gray-900">
                  {participant.x10}
                </TableCell>
                <TableCell className="text-center text-xs text-gray-900">
                  {participant.x}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}