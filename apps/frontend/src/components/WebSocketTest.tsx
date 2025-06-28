import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageCircle, Wifi } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface WebSocketMessage {
  type: string;
  payload: unknown;
  timestamp: string;
}

interface WebSocketTestProps {
  connectionStatus: string;
  messages: WebSocketMessage[];
  onSendMessage: (message: string) => void;
}

export function WebSocketTest({ connectionStatus, messages, onSendMessage }: Readonly<WebSocketTestProps>) {
  const [messageText, setMessageText] = useState('');

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'connected':
        return 'default';
      case 'connecting':
        return 'secondary';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>WebSocket Test</span>
          </div>
          <Badge className={"flex items-center space-x-1 " + (getStatusVariant(connectionStatus) ? `badge-${getStatusVariant(connectionStatus)}` : "") }>
            <Wifi className="h-3 w-3" />
            <span className="capitalize">{connectionStatus}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Send Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium">
            Send Message
          </Label>
          <div className="flex space-x-2">
            <Input
              id="message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={connectionStatus !== 'connected'}
            />
            <Button
              onClick={handleSend}
              disabled={connectionStatus !== 'connected' || !messageText.trim()}
              className="icon-btn"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Messages ({messages.length})
          </Label>
          <Card className="bg-muted/30">
            <ScrollArea className="h-48 p-3">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">No messages yet</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((message, idx) => (
                    <Card key={message.timestamp + '-' + message.type + '-' + idx} className="bg-background">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <Badge className="text-xs badge-outline">
                            {message.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(message.timestamp)}
                          </span>
                        </div>
                        <pre className="text-xs text-foreground whitespace-pre-wrap font-mono bg-muted/50 p-2 rounded">
                          {JSON.stringify(message.payload, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}