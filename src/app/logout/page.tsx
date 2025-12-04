// src/app/logout/page.tsx
import Link from "next/link";

export default function LogoutPage() {
  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f3f4f6' 
    }}>
      <div className="card-form" style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h2 style={{ color: '#1f2937', marginBottom: '15px' }}>Você saiu do sistema</h2>
        
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          Sua sessão foi encerrada com segurança.
        </p>

        <Link href="/login" className="btn-primary" style={{ textDecoration: 'none' }}>
          Fazer Login Novamente
        </Link>
      </div>
    </div>
  );
}