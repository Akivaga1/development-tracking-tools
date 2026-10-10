import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ShieldCheck, UserCheck } from 'lucide-react';

export function FootballSignIn({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setMessage(error.message || 'Registration failed. Please check credentials.');
        } else {
          onOpenChange(false);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setMessage(error.message || 'Invalid email or password.');
        } else {
          onOpenChange(false);
        }
      }
    } catch (err: any) {
      setMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/60 shadow-2xl rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1 text-primary">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-xs uppercase tracking-wider font-semibold">Organizational Tools Workspace</span>
          </div>
          <DialogTitle className="text-xl font-bold font-heading">
            {isSignUp ? 'Create Football Club Workspace' : 'Sign In to Football Workspace'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Private session-scoped workspace authenticated with Django Backend.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 py-2" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <Label htmlFor="fb-fullname" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Club Manager Name
              </Label>
              <Input
                id="fb-fullname"
                type="text"
                placeholder="e.g. Coach Alex Mercer"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label htmlFor="fb-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Work Email
            </Label>
            <Input
              id="fb-email"
              type="email"
              autoComplete="email"
              required
              placeholder="manager@club.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="fb-password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Password
            </Label>
            <Input
              id="fb-password"
              type="password"
              minLength={8}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          {message && (
            <p role="status" className="text-xs font-medium text-destructive bg-destructive/10 p-2.5 rounded-lg">
              {message}
            </p>
          )}

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-xl shadow-md transition-all" disabled={busy}>
            {busy ? 'Processing...' : isSignUp ? 'Create Workspace' : 'Sign In'}
          </Button>
        </form>

        <div className="flex justify-between items-center pt-2 border-t border-border/50 text-xs text-muted-foreground">
          <span>{isSignUp ? 'Already registered?' : "Need a private workspace?"}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/90 text-xs"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage('');
            }}
          >
            {isSignUp ? 'Sign in' : 'Create an account'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
