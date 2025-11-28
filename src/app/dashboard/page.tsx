import { cookies } from "next/headers";
import { JWT_COOKIE_NAME } from "@/services/authService";

/**
 * Exemplo de Server Component que só deveria ser acessível com JWT.
 * O middleware já vai bloquear acesso sem cookie, mas aqui você pode reforçar.
 */
export default function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get(JWT_COOKIE_NAME)?.value;

  // Aqui você poderia usar o token para chamar FastAPI com Authorization: Bearer
  // via fetch no server, se necessário.

  return (
    <section>
      <h2>Dashboard</h2>
      <p>Token presente? {token ? "Sim" : "Não"}</p>
    </section>
  );
}