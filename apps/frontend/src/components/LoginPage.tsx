import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useToast } from '@/components/ui/use-toast';
import { Lock, Mail, Eye, EyeOff, Loader2, Target } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginPageProps {
  readonly onLogin: () => void;
}

export function LoginPage({ onLogin }: Readonly<LoginPageProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation - replace with actual authentication logic
      if (data.email === 'admin@myarchery.id' && data.password === 'password123') {
        toast({
          title: "Login Successful",
          description: "Welcome back to MyArchery.id!",
        });
        onLogin?.();
      } else {
        setError('root', {
          message: 'Invalid email or password. Please try again.',
        });
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid credentials. Please check your email and password.",
        });
      }
    } catch (error) {
      setError('root', {
        message: 'An error occurred during login. Please try again.',
      });
      toast({
        variant: "destructive",
        title: "Error",
        description: (error instanceof Error ? error.message : String(error)),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center theme-transition">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Use consistent padding pattern */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[140px] py-6 sm:py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-theme-lg">
              <Target className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your MyArchery.id account</p>
          </div>

          {/* Login Card */}
          <Card className="shadow-theme-xl border-0 glass">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Error Alert */}
              {errors.root && (
                <Alert variant="destructive" className="theme-transition">
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`pl-10 theme-transition ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      {...register('email')}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className={`pl-10 pr-10 theme-transition ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      {...register('password')}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary theme-transition"
                    {...register('rememberMe')}
                    disabled={isLoading}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                    Remember me for 30 days
                  </Label>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full theme-transition"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                {/* Forgot Password */}
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-muted-foreground hover:text-primary p-0 theme-transition"
                    disabled={isLoading}
                  >
                    Forgot your password?
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button
                variant="link"
                className="text-primary hover:text-primary/80 p-0 h-auto font-medium theme-transition"
              >
                Create account
              </Button>
            </p>
          </div>

          {/* Demo Credentials */}
          <Card className="bg-primary/5 border-primary/20 glass">
            <CardContent className="pt-4">
              <div className="text-center space-y-1">
                <p className="text-xs font-medium text-primary">Demo Credentials</p>
                <p className="text-xs text-muted-foreground">Email: admin@myarchery.id</p>
                <p className="text-xs text-muted-foreground">Password: password123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}