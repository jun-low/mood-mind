import { SignIn, SignUp } from '@clerk/nextjs';

const SignUpPage = () => (
  <div className="min-h-screen flex justify-center items-center">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" redirectUrl="/new-user"
            afterSignUpUrl="/new-user"/>
  </div>
);

export default SignUpPage;
