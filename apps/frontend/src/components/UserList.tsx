import { User, UpdateUser } from '@repo/shared-types';
import { UserCard } from './UserCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Users } from 'lucide-react';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onUpdate: (id: string, data: UpdateUser) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function UserList({ users, loading, error, onUpdate, onDelete }: UserListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-2">Error loading users</div>
        <div className="text-gray-600 text-sm">{error}</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No users yet</h3>
        <p className="text-gray-600">Get started by creating your first user.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}