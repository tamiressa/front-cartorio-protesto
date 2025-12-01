
export default function ConsultarDividaForm() {
  return (
    <fieldset className="card-form">
          <h3 className="section-title">Dívida</h3>
          <div className="form-grid">

            <div className="form-group third-width">
              <label className="form-label"> Número: <br />
                <input className="input-field" name="divida_numero"  type="text" />
              </label>
            </div>

            <div className="form-group third-width">
              <label className="form-label"> Nosso Número: <br />
                <input className="input-field" name="divida_nosso_numero"  type="text" />
              </label>
            </div>

            <div className="form-group third-width">
              <label className="form-label"> Espécie: <br />
                <input className="input-field" name="divida_especie"  type="text" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">Vencimento:<br />
                <input className="input-field" type="date" name="divida_vencimento" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">Emissão:<br />
                <input className="input-field" type="date" name="divida_emissao" />
              </label>
            </div>

          </div>

        </fieldset>
    
  );
}
