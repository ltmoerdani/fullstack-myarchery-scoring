import { useState } from 'react';
import { User, UpdateUser } from '@repo/shared-types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Edit2, Trash2, Save, X, User as UserIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface UserCardProps {
  user: User;
  onUpdate: (id: string, data: UpdateUser) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function UserCard({ user, onUpdate, onDelete }: Readonly<UserCardProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onUpdate(user.id, editData);
      setIsEditing(false);
      toast({
        title: "User Updated",
        description: "User information has been successfully updated.",
      });
    } catch (error) {
      console.error('Failed to update user:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update user. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setIsLoading(true);
      try {
        await onDelete(user.id);
        toast({
          title: "User Deleted",
          description: "User has been successfully deleted.",
        });
      } catch (error) {
        console.error('Failed to delete user:', error);
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: "Failed to delete user. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
    });
    setIsEditing(false);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'online':
        return 'default';
      case 'away':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user.avatar ? <UserIcon className="h-6 w-6" /> : getUserInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="Full name"
                    className="text-sm"
                    disabled={isLoading}
                  />
                  <Input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    placeholder="Email address"
                    className="text-sm"
                    disabled={isLoading}
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {user.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </p>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge variant={getStatusVariant(user.status)} className="text-xs">
                      {user.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Created {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isLoading || !editData.name.trim() || !editData.email.trim()}
                  className="h-8 w-8 p-0"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}