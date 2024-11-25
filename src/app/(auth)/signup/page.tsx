import SignupForm from '@/components/auth/signup-form';
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
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create an account to start reviewing movies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <p className="mt-8 text-center text-sm font-serif">
          Already have an account?
          <Link href="/login" className="text-primary underline">
            {' '}
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
