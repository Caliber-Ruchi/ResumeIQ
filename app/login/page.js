import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome Back
        </h1>

        <AuthForm mode="login"/>

      </div>
    </main>
  );
}