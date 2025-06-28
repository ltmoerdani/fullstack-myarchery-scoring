import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';

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

export function WebSocketTest({ connectionStatus, messages, onSendMessage }: WebSocketTestProps) {
  const [messageText, setMessageText] = useState('');

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Send Message
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="input-field flex-1"
            disabled={connectionStatus !== 'connected'}
          />
          <button
            onClick={handleSend}
            disabled={connectionStatus !== 'connected' || !messageText.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Status: <span className="font-medium capitalize">{connectionStatus}</span>
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Messages ({messages.length})
        </label>
        <div className="bg-gray-50 rounded-lg border border-gray-200 h-48 overflow-y-auto p-3 space-y-2">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No messages yet</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className="bg-white rounded-md p-2 border border-gray-100 text-sm"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-blue-600">{message.type}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(message.payload, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}