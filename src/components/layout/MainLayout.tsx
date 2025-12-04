// src/components/layout/MainLayout.tsx
import React from 'react';

import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="dashboard-container">
     
      
      {/* Área da direita */}
      <div className="main-wrapper">
        <Header />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}