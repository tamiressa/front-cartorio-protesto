import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div>
    <section className="login-header">
      <h2>Autenticação</h2>
      <LoginForm />
    </section>
    </div>
  );
}