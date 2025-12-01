export default function ConsultarArquivo(){
    return(
        <fieldset className="card-form">
                  <div className="form-grid">
        
                    <div className="form-group half-width">
                      <label className="form-label"> Tipo do Arquivo: <br />
                        <input className="input-field" name="arquivo_tipo"  type="text" />
                      </label>
                    </div>

                    <div className="form-group half-width">
                        <label className="form-label">Data do Arquivo:<br />
                            <input className="input-field" type="date" name="arquivo_data" />
                        </label>
                    </div>

                  </div>
            </fieldset>

    );
}