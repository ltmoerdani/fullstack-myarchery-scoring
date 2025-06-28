import { useState, useEffect } from 'react';
import { UserList } from '@/components/UserList';
import { CreateUserForm } from '@/components/CreateUserForm';
import { RealtimeStatus } from '@/components/RealtimeStatus';
import { WebSocketTest } from '@/components/WebSocketTest';
import { LoginPage } from '@/components/LoginPage';
import { Toaster } from '@/components/ui/toaster';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUsers } from '@/hooks/useUsers';
import { useRealtime } from '@/hooks/useRealtime';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Users, Plus, LogOut, Target, Activity, Globe } from 'lucide-react';

function App() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { users, loading, error, createUser, updateUser, deleteUser, refetch } = useUsers();
  const { isConnected } = useRealtime();
  const { connectionStatus, sendMessage, messages } = useWebSocket();

  // Listen for real-time user events
  useEffect(() => {
    // In a real app, you'd use Pusher event listeners here
    // For now, we'll just refetch on realtime connection changes
    if (isConnected) {
      refetch();
    }
  }, [isConnected, refetch]);

  // Show login page if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                MyArchery.id Dashboard
              </h1>
              <p className="text-gray-600">
                Modern Full-Stack Application with Real-time Features
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <RealtimeStatus isConnected={isConnected} />
            <Button
              variant="outline"
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Realtime Status</p>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={isConnected ? "default" : "destructive"}
                    >
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">WebSocket</p>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={connectionStatus === 'connected' ? "default" : "outline"}
                    >
                      {connectionStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management */}
          <div className="lg:col-span-2 space-y-6">
            {showCreateForm && (
              <CreateUserForm
                onSubmit={async (userData) => {
                  await createUser(userData);
                  setShowCreateForm(false);
                }}
                onCancel={() => setShowCreateForm(false)}
              />
            )}
            
            <Card className="border-0 shadow-md">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <UserList
                  users={users}
                  loading={loading}
                  error={error}
                  onUpdate={updateUser}
                  onDelete={deleteUser}
                />
              </CardContent>
            </Card>
          </div>

          {/* WebSocket Testing */}
          <div className="space-y-6">
            <WebSocketTest
              connectionStatus={connectionStatus}
              messages={messages}
              onSendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;