// src/app/menu/page.tsx
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function MenuPage() {
  
  // Lista de botões para facilitar a manutenção
  const menuItems = [
    { 
      title: "Enviar Título", 
      href: "/pages/enviarTitulo", 
      icon: "📝" 
    },
    { 
      title: "Envia Remessa ou Anuência", 
      href: "/pages/enviaRemessa", 
      icon: "📦" 
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
      title: "Confirmação Retorno", 
      href: "/pages/confirmacaoRetorno", 
      icon: "✅" 
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Menu Principal</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>Selecione uma opção abaixo:</p>

      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} className="menu-card">
            <span className="menu-icon">{item.icon}</span>
            <h3>{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}