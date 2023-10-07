import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="min-h-screen flex justify-center items-center">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);
export default SignInPage;
