import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  return (
    <div className="p-2">
      <h3>Login Page</h3>
      <div className="flex mt-5 justify-start">
        <Button className="font-bold">Login</Button>
      </div>
    </div>
  );
}
