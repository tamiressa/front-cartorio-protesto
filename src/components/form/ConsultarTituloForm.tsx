export default function ConsultarTituloForm(){
    return(
      <div>
        <fieldset className="card-form">
          <h3 className="section-title">Devedor</h3>
          <div className="form-grid">

            <div className="form-group third-width">
              <label className="form-label"> Documento: <br />
                <input className="input-field" name="devedor_documento"  type="text" />
              </label>
            </div>
          </div>
        </fieldset> <br/>

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
              <label className="form-label">Vencimento:<br />
                <input className="input-field" type="date" name="divida_vencimento" />
              </label>
            </div>

            

          </div>

        </fieldset> <br/>

        <br/> <br/>

            <button
              className="btn-entrar" type="submit" style={{ width: "30%" }}
              > Consultar 
            </button>
      </div>
    );

}