// src/app/enviarTitulo/page.tsx
"use client";

export default function ConsultarTituloPage() {
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Consultar Título</h2>
      
      <form>
        <fieldset className="card-form">
          <h3 className="section-title">Devedor</h3>
          <div className="form-grid">

            <div className="form-group full-width">
              <label className="form-label"> CPF: <br />
                <input className="input-field" name="devedor_documento"  type="text" />
              </label>
            </div>
          </div>
        </fieldset>

        <br />

        <fieldset className="card-form">
          <h3 className="section-title">Dívida</h3>
          <div className="form-grid">

            <div className="form-group full-width">
              <label className="form-label"> Número: <br />
                <input className="input-field" name="devedor_documento"  type="text" />
              </label>
            </div>

            <div className="form-group full-width">
              <label className="form-label"> Nosso Número: <br />
                <input className="input-field" name="devedor_documento"  type="text" />
              </label>
            </div>

            <div className="form-group full-width">
              <label className="form-label"> Espécie: <br />
                <input className="input-field" name="devedor_documento"  type="text" />
              </label>
            </div>

            <div className="form-group quarter">
              <label className="form-label">Vencimento:<br />
                <input className="input-field" type="date" name="divida_vencimento" />
              </label>
            </div>

            <div className="form-group quarter">
              <label className="form-label">Emissão:<br />
                <input className="input-field" type="date" name="divida_emissao" />
              </label>
            </div>

          </div>

        </fieldset>


      </form>
    </div>
  );
}