export default function ConsultarCartorioForm(){
    return(
        <fieldset className="card-form">
                  <h3 className="section-title">Cartório</h3>
                  <div className="form-grid">
        
                    <div className="form-group half-width">
                      <label className="form-label"> Protocolo: <br />
                        <input className="input-field" name="cartorio_protocolo"  type="text" />
                      </label>
                    </div>

                    <div className="form-group half-width">
                        <label className="form-label">Data do Protocolo:<br />
                            <input className="input-field" type="date" name="cartorio_data" />
                        </label>
                    </div>

                  </div>
            </fieldset>

    );
}