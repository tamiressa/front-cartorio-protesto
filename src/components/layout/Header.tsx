'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Definimos quais rotas NÃO devem mostrar o menu e a saudação
  const rotasPrivadas = pathname !== '/' && pathname !== '/login' && pathname !== '/logout';

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Limpa o acesso
    setMenuAberto(false);
    router.push('/logout'); // Volta para a tela inicial/login
  };

  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      
      {/* O Link CRF-PE sempre existe, mas o destino muda conforme a rota */}
      <Link 
        href={rotasPrivadas ? "/menu" : "/"} 
        style={{ 
          textDecoration: 'none', 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: 'var(--primary-color)',
          cursor: 'pointer'
        }}
      >
        CRF-PE
      </Link>

      {/* Exibe "Bem-vindo" APENAS se NÃO estiver no login/logout */}
      {rotasPrivadas && <h3>Bem-vindo de volta</h3>}

      <div className="user-menu-container" style={{ position: 'relative' }}>
        {/* Exibe o Botão de Usuário APENAS se NÃO estiver no login/logout */}
        {rotasPrivadas && (
          <>
            <button 
              onClick={toggleMenu} 
              className="btn-user"
              style={{ width: 'auto', padding: '8px 16px', cursor: 'pointer' }}
            >
              Usuario Admin
            </button>

            {menuAberto && (
              <div className="dropdown-menu" style={{ 
                position: 'absolute', 
                right: 0, 
                top: '100%', 
                backgroundColor: 'white', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                padding: '10px', 
                borderRadius: '4px',
                zIndex: 100 
              }}>
                <button 
                  onClick={handleLogout} 
                  className="logout-btn"
                  style={{ 
                    backgroundColor: '#ff0000', 
                    color: 'white', 
                    border: 'none', 
                    padding: '8px 16px', 
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  Sair
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}