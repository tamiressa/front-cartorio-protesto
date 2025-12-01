
export default function DividaForm() {
  return (
    <fieldset className="card-form">
          <h3 className="section-title">Dados da Dívida / Título</h3>

          <div className="form-grid">

            <div className="form-group half-width">
              <label className="form-label">Espécie:<br />
                <input className="input-field" type="text" name="divida_especie" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">Número:<br />
                <input className="input-field" type="text" name="divida_numero" />
              </label>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Nosso Número:<br />
                <input className="input-field" type="text" name="divida_nossoNumero" />
              </label>
            </div>

            <div className="form-group quarter">
            <label className="form-label">Valor:<br />
              <input className="input-field" step="0.01" placeholder="0,00" type="text" name="divida_valor" />
            </label>
            </div>

            <div className="form-group quarter">
              <label className="form-label">Saldo:<br />
                <input className="input-field" step="0.01" placeholder="0,00" type="text" name="divida_saldo" />
              </label>
            </div>

            <div className="form-group quarter">
              <label className="form-label">Emissão:<br />
                <input className="input-field" type="date" name="divida_emissao" />
              </label>
            </div>

            <div className="form-group quarter">
              <label className="form-label">Vencimento:<br />
                <input className="input-field" type="date" name="divida_vencimento" />
              </label>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Documento (PDF):<br />
                <input accept=".pdf" className="input-field" type="file" name="divida_documento" style={{ padding: '8px' }}/>
                <small style={{ color: '#6b7280', marginTop: '5px', display: 'block' }}> Tamanho máximo: 5MB </small>
              </label>
            </div>

          </div>
        </fieldset>
    
  );
}
