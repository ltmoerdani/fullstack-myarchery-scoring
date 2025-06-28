import { User, UpdateUser } from '@repo/shared-types';
import { UserCard } from './UserCard';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Loader2 } from 'lucide-react';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onUpdate: (id: string, data: UpdateUser) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function UserList({ users, loading, error, onUpdate, onDelete }: Readonly<UserListProps>) {
  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading users...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-destructive mb-2 font-medium">Error loading users</div>
          <div className="text-muted-foreground text-sm">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No users yet</h3>
          <p className="text-muted-foreground">Get started by creating your first user.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
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