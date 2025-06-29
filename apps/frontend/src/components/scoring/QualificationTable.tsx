import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronRight, X } from 'lucide-react';

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

interface QualificationTableProps {
  participants: Participant[];
  selectedParticipants: Set<string>;
  onParticipantSelect: (position: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onParticipantClick: (participant: Participant) => void;
  selectedParticipant?: Participant | null;
}

export function QualificationTable({
  participants,
  selectedParticipants,
  onParticipantSelect,
  onSelectAll,
  onParticipantClick,
  selectedParticipant
}: QualificationTableProps) {
  const isAllSelected = participants.length > 0 && participants.every(p => selectedParticipants.has(p.position));
  const isIndeterminate = selectedParticipants.size > 0 && !isAllSelected;

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
              <TableHead className="text-center w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={checkbox => {
                    if (checkbox) checkbox.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </TableHead>
              <TableHead className="text-center w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow 
                key={participant.position}
                className={`hover:bg-gray-50 transition-colors ${
                  selectedParticipant?.position === participant.position ? 'bg-blue-50' : ''
                }`}
              >
                <TableCell className="text-center text-xs text-gray-600">
                  {participant.position}
                </TableCell>
                <TableCell className="text-center text-xs font-medium text-gray-900">
                  {participant.rank}
                </TableCell>
                <TableCell 
                  className="text-xs font-medium text-gray-900 cursor-pointer"
                  onClick={() => onParticipantClick(participant)}
                >
                  {participant.name}
                </TableCell>
                <TableCell 
                  className="text-xs text-gray-600 cursor-pointer"
                  onClick={() => onParticipantClick(participant)}
                >
                  {participant.club}
                </TableCell>
                <TableCell 
                  className="text-center text-xs text-gray-900 cursor-pointer"
                  onClick={() => onParticipantClick(participant)}
                >
                  {participant.sesi1}
                </TableCell>
                <TableCell 
                  className="text-center text-xs text-gray-900 cursor-pointer"
                  onClick={() => onParticipantClick(participant)}
                >
                  {participant.sesi2}
                </TableCell>
                <TableCell 
                  className="text-center text-xs text-gray-900 cursor-pointer"
                  onClick={() => onParticipantClick(participant)}
                >
                  {participant.jumlahPanah}
                </TableCell>
                <TableCell 
                  className="text-center text-xs font-medium text-gray-900 cursor-pointer"
                  onClick={() => onParticipantClick(participant)}
                >
                  {participant.total}
                </TableCell>
                <TableCell 
                  className="text-center text-xs text-gray-900 cursor-pointer"
                  onClick={() => onParticipantClick(participant)}
                >
                  {participant.x10}
                </TableCell>
                <TableCell 
                  className="text-center text-xs text-gray-900 cursor-pointer"
                  onClick={() => onParticipantClick(participant)}
                >
                  {participant.x}
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedParticipants.has(participant.position)}
                    onChange={(e) => onParticipantSelect(participant.position, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => onParticipantClick(participant)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    aria-label={selectedParticipant?.position === participant.position ? "Close details" : "View details"}
                  >
                    {selectedParticipant?.position === participant.position ? (
                      <X className="w-4 h-4 text-blue-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}