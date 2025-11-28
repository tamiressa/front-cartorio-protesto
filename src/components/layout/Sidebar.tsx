// src/components/layout/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">CRF-PE</div>
      <nav>
        <Link href="/login" className="nav-link">login</Link>
        <Link href="/enviarTitulo" className="nav-link">Enviar Título</Link>
        <Link href="/enviarRemessa" className="nav-link">Envia Remessa ou Anuência</Link>
        <Link href="/consultarTitulo" className="nav-link">Consultar Título</Link>
        <Link href="/consultarArquivo" className="nav-link">Consultar Arquivo</Link>
        <Link href="/movimento" className="nav-link">Movimento Diário</Link>
      </nav>
    </aside>
  );
}