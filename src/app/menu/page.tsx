// src/app/menu/page.tsx
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function MenuPage() {
  
  
  const menuItems = [
    { 
      title: "Autenticar", 
      href: "/pages/autenticar", 
      icon: "👍" 
    },
    { 
      title: "Enviar Título", 
      href: "/pages/enviarTitulo", 
      icon: "📝" 
    },
    { 
      title: "Envia Remessa ou Anuência", 
      href: "/pages/enviaRemessa", 
      icon: "📦",
      disabled: true
    },
    { 
      title: "Consultar Título", 
      href: "/pages/consultarTitulo", 
      icon: "🔍" 
    },
    { 
      title: "Consultar Arquivo", 
      href: "/pages/consultarArquivo", 
      icon: "📂" 
    },
    { 
      title: "Movimento Diário", 
      href: "/pages/movimento", 
      icon: "📊" 
    },
    { 
      title: "Operação Título", 
      href: "/pages/operacaoTitulo", 
      icon: "✅" 
    },
  ];

  return (
    <div className="menu-grid">
  {menuItems.map((item, index) =>
    item.disabled ? (
      <div key={index} className="menu-card menu-card-disabled">
        <span className="menu-icon">{item.icon}</span>
        <h3>{item.title}</h3>
      </div>
    ) : (
      <Link key={index} href={item.href} className="menu-card">
        <span className="menu-icon">{item.icon}</span>
        <h3>{item.title}</h3>
      </Link>
    )
  )}
</div>

  );
}