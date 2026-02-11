'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
          cursor: 'pointer',
          color: 'var(--primary-color)',
        }}
      >
        <span style={{ fontSize: '1.6rem', fontWeight: 700 }}>
          CRF-PE: ATHENA
        </span>

        <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>
          v0.1.16
        </span>
      </Link>



      {/* Exibe "Bem-vindo" APENAS se NÃO estiver no login/logout */}
      {rotasPrivadas && (
        <h3
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Bem-vindo de volta
        </h3>
      )}

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