// src/components/layout/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      
      <nav>
        <Link href="/login" className="nav-link">login</Link>
        <Link href="/pages/enviarTitulo" className="nav-link">Enviar Título</Link>
        <Link href="/pages/enviaRemessa" className="nav-link">Envia Remessa ou Anuência</Link>
        <Link href="/pages/consultarTitulo" className="nav-link">Consultar Título</Link>
        <Link href="/pages/consultarArquivo" className="nav-link">Consultar Arquivo</Link>
        <Link href="/pages/movimento" className="nav-link">Movimento Diário</Link>
        <Link href="/pages/confirmacaoRetorno" className="nav-link">Confirmação Retorno</Link>

      </nav>
    </aside>
  );
}