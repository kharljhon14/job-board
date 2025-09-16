import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-full">
        <SignIn path="/sign-in" />
      </div>
    </div>
  );
}
