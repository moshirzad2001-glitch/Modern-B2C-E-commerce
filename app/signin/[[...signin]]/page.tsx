import { SignIn } from "@clerk/nextjs";

export default function SigningIn() {
  return (
    <section className="flex items-center justify-evenly ">
      <div className="flex items-center justify-center min-h-screen">
        <SignIn />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl">Hint</span>
        <span>
          The Demo User Email is :{" "}
          <span className="text-emerald-600">demo+clerk_test@email.com</span>
        </span>
        <span>
          The Demo User Password is :{" "}
          <span className="text-emerald-600">ClerkDemoUser123</span>
        </span>
        <span>
          The Demo User OTP is :{" "}
          <span className="text-emerald-600">424242</span>
        </span>
        <span>
          For Best Practice, Please Copy Paste The Upper Information In The
          Required Fields.{" "}
        </span>
      </div>
    </section>
  );
}
