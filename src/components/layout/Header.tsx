// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link'; // <--- Não esqueça de importar o Link

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className="header">
      
      {/* 1. Mudamos de <div> para <Link> 
         2. Mudamos o href para "/menu"
         3. Removemos 'sidebar-logo' e colocamos estilo direto para alinhar certinho
      */}
      <Link 
        href="/menu" 
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

      <h3>Bem-vindo de volta</h3>

      <div className="user-menu-container">
        <button 
          onClick={toggleMenu} 
          className="btn-user" // <--- Verifique se essa classe existe ou use btn-primary
          style={{ width: 'auto', padding: '8px 16px', cursor: 'pointer' }}
        >
          Usuario Admin
        </button>

        {menuAberto && (
          <div className="dropdown-menu">
            <Link href="/api/auth/logout" className="logout-btn">
              Sair
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}