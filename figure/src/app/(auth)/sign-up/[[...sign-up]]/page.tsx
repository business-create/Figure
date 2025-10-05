import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-[100svh] grid place-items-center p-6">
      <div className="w-full max-w-[420px] rounded-2xl shadow-xl p-4 sm:p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur">
        <SignUp appearance={{ variables: { colorPrimary: "#335CFF" } }} />
      </div>
    </div>
  );
}
