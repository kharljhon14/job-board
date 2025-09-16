import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-full">
        <SignUp path="/sign-up" />
      </div>
    </div>
  );
}
