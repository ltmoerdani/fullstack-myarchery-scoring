import { useState, useEffect } from 'react';
import { UserList } from '@/components/UserList';
import { CreateUserForm } from '@/components/CreateUserForm';
import { RealtimeStatus } from '@/components/RealtimeStatus';
import { WebSocketTest } from '@/components/WebSocketTest';
import { LoginPage } from '@/components/LoginPage';
import { User } from '@repo/shared-types';
import { useUsers } from '@/hooks/useUsers';
import { useRealtime } from '@/hooks/useRealtime';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Users, Plus, Wifi, LogOut } from 'lucide-react';

function App() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { users, loading, error, createUser, updateUser, deleteUser, refetch } = useUsers();
  const { isConnected } = useRealtime();
  const { connectionStatus, sendMessage, messages } = useWebSocket();

  // Listen for real-time user events
  useEffect(() => {
    const handleUserCreated = (data: { data: User }) => {
      refetch();
    };

    const handleUserUpdated = (data: { data: User }) => {
      refetch();
    };

    const handleUserDeleted = (data: { data: { id: string } }) => {
      refetch();
    };

    // In a real app, you'd use Pusher event listeners here
    // For now, we'll just refetch on realtime connection changes
    if (isConnected) {
      refetch();
    }
  }, [isConnected, refetch]);

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Modern Full-Stack App
              </h1>
              <p className="text-gray-600">
                Turborepo + Fastify + React + Redis + Pusher
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <RealtimeStatus isConnected={isConnected} />
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wifi className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Realtime</p>
                <p className="text-lg font-semibold text-gray-900">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Wifi className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">WebSocket</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {connectionStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management */}
          <div className="lg:col-span-2 space-y-6">
            {showCreateForm && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Create New User
                </h2>
                <CreateUserForm
                  onSubmit={(userData) => {
                    createUser(userData);
                    setShowCreateForm(false);
                  }}
                  onCancel={() => setShowCreateForm(false)}
                />
              </div>
            )}
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Users</h2>
                <p className="text-gray-600 mt-1">
                  Manage your application users
                </p>
              </div>
              <UserList
                users={users}
                loading={loading}
                error={error}
                onUpdate={updateUser}
                onDelete={deleteUser}
              />
            </div>
          </div>

          {/* WebSocket Testing */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                WebSocket Test
              </h2>
              <WebSocketTest
                connectionStatus={connectionStatus}
                messages={messages}
                onSendMessage={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;