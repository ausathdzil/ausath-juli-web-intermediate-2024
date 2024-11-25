import LoginForm from '@/components/auth/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Page() {
  return (
    <Card className="w-fit mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account to start reviewing movies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <p className="mt-8 text-center text-sm font-serif">
          Don&apos;t have an account?
          <Link href="/signup" className="text-primary underline">
            {' '}
            Signup
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
