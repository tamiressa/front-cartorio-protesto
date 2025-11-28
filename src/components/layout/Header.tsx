// src/components/layout/Header.tsx
'use client'; // <--- OBRIGATÓRIO: Indica que este componente tem interação

import { useState } from 'react';
import Link from 'next/link'; // Se o logout for um link, ou use button se for função

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  // Função que inverte: se está aberto fecha, se fechado abre
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className="header">
      <h3>Bem-vindo de volta</h3>

      {/* Container que segura o botão e o menu */}
      <div className="user-menu-container">
        
        {/* Botão do Usuário (Adicionei onClick) */}
        <button 
          onClick={toggleMenu} 
          className="btn-user" 
          style={{ width: 'auto', padding: '8px 16px' }} // Ajuste fino para não ficar gigante
        >
          Usuario Admin
        </button>

        {/* Lógica: Só mostra a div se menuAberto for TRUE */}
        {menuAberto && (
          <div className="dropdown-menu">
            {/* Aqui você pode por Link ou Button */}
            <Link href="/api/auth/logout" className="logout-btn">
              Sair
            </Link>
          </div>
        )}

      </div>
    </header>
  );
}