// components/ResultadoConsultarTitulo.tsx

export default function ResultadoConsultarTitulo({ data }: { data: any }) {
  const titulo = data?.payload?.titulo?.[0];

  if (!titulo) return <p>Nenhum dado encontrado.</p>;

  return (
    <div className="card-form" style={{ marginTop: "30px" }}>
      {/* Cabeçalho do Resultado */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px" 
      }}>
        <h3 className="section-title" style={{ border: "none", margin: 0 }}>
          Resultado da Consulta
        </h3>
        <span style={{ 
          backgroundColor: "var(--primary-color)", 
          color: "white", 
          padding: "5px 15px", 
          borderRadius: "20px", 
          fontSize: "0.85rem",
          fontWeight: "bold"
        }}>
          {data.code}
        </span>
      </div>

      {/* Grid seguindo sua lógica de 12 colunas */}
      <div className="form-grid">
        
        {/* Bloco Dívida (Ocupa metade no desktop) */}
        <div className="half-width">
          <h4 style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "10px", textTransform: "uppercase" }}>
            Informações da Dívida
          </h4>
          <div style={{ lineHeight: "1.8" }}>
            <p><strong>Número:</strong> {titulo.divida.numero}</p>
            <p><strong>Espécie:</strong> {titulo.divida.especie}</p>
            <p><strong>Emissão:</strong> {titulo.divida.emissao}</p>
            <p><strong>Vencimento:</strong> <span style={{ color: "#ef4444", fontWeight: "bold" }}>{titulo.divida.vencimento}</span></p>
          </div>
        </div>

        {/* Bloco Cartório (Ocupa a outra metade) */}
        <div className="half-width">
          <h4 style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "10px", textTransform: "uppercase" }}>
            Localização e Cartório
          </h4>
          <div style={{ lineHeight: "1.8" }}>
            <p><strong>Cidade:</strong> {titulo.cartorio.cidade} / {titulo.cartorio.uf}</p>
            <p><strong>Data Cartório:</strong> {titulo.cartorio.data}</p>
            <p><strong>Sacador (Doc):</strong> {titulo.sacador.documento}</p>
            <p><strong>Devedor (Doc):</strong> {titulo.devedor.documento}</p>
          </div>
        </div>

        <div className="full-width" style={{ marginTop: "10px" }}>
          <h4 style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "10px", textTransform: "uppercase" }}>
            Status e Ocorrência
          </h4>
          <div style={{ 
            backgroundColor: "var(--bg-color)", 
            padding: "15px", 
            borderRadius: "8px",
            border: "1px solid var(--border-color)" 
          }}>
            <p><strong>Última Atualização:</strong> {titulo.ocorrencia[0].dataHora}</p>
            <p><strong>Mensagem:</strong> {data.message || "Sem observações adicionais."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}