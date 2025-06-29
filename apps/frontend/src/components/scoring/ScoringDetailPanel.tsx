import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';

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

interface ScoringDetail {
  readonly end: number;
  readonly shot: string;
  readonly arrows: readonly (number | string)[];
  readonly total: number;
}

interface ScoringDetailPanelProps {
  participant: Participant;
  onClose: () => void;
}

export function ScoringDetailPanel({ participant, onClose }: ScoringDetailPanelProps) {
  const [activeSession, setActiveSession] = useState('session1');

  // Sample scoring detail data
  const scoringDetails: ScoringDetail[] = [
    { end: 1, shot: 'X', arrows: ['X', 10, 10, 10, 9, 9], total: 58 },
    { end: 2, shot: 'X', arrows: ['X', 10, 10, 10, 9, 9], total: 58 },
    { end: 3, shot: 'X', arrows: ['X', 'X', 'X', 'X', 'X', 8], total: 58 },
    { end: 4, shot: 'X', arrows: ['X', 'X', 10, 9, 9, 8], total: 56 },
    { end: 5, shot: 'X', arrows: ['X', 'X', 'X', 'X', 10, 10], total: 60 },
    { end: 6, shot: 'X', arrows: ['X', 'X', 10, 10, 10, 9], total: 59 }
  ];

  const handleScoreInput = (endIndex: number, arrowIndex: number, value: string) => {
    console.log(`Score input: End ${endIndex + 1}, Arrow ${arrowIndex + 1}, Value: ${value}`);
  };

  return (
    <Card>
      <CardContent className="p-0">
        {/* Detail Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{participant.name}</h3>
              <p className="text-sm text-gray-600">{participant.club}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-sm text-gray-600">Akumulasi Skor</span>
                <span className="text-lg font-bold text-blue-600">{participant.total}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Session Tabs */}
        <Tabs value={activeSession} onValueChange={setActiveSession}>
          <div className="border-b border-gray-200">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="session1" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50"
              >
                Sesi 1
              </TabsTrigger>
              <TabsTrigger 
                value="session2"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50"
              >
                Sesi 2
              </TabsTrigger>
              <TabsTrigger 
                value="shootoff"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50"
              >
                Shoot-off
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeSession} className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center w-12">End</TableHead>
                  <TableHead className="text-center w-12">Shot</TableHead>
                  <TableHead className="text-center w-8">1</TableHead>
                  <TableHead className="text-center w-8">2</TableHead>
                  <TableHead className="text-center w-8">3</TableHead>
                  <TableHead className="text-center w-8">4</TableHead>
                  <TableHead className="text-center w-8">5</TableHead>
                  <TableHead className="text-center w-8">6</TableHead>
                  <TableHead className="text-center w-16">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoringDetails.map((detail, index) => (
                  <TableRow key={`${detail.end}-${detail.shot}`}>
                    <TableCell className="text-center text-xs text-gray-900">
                      {detail.end}
                    </TableCell>
                    <TableCell className="text-center text-xs font-medium text-blue-600">
                      {detail.shot}
                    </TableCell>
                    {detail.arrows.map((arrow, arrowIndex) => (
                      <TableCell key={`${detail.end}-${detail.shot}-arrow-${arrowIndex + 1}`} className="text-center">
                        <Input
                          type="text"
                          value={arrow}
                          onChange={(e) => handleScoreInput(index, arrowIndex, e.target.value)}
                          className="w-8 h-6 text-xs text-center border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </TableCell>
                    ))}
                    <TableCell className="text-center text-xs font-medium text-gray-900">
                      {detail.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}