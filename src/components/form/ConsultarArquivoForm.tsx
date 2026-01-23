export default function ConsultarArquivo(){
    return(
        <fieldset className="card-form">
            <div className="form-grid">
  
              <div className="form-group half-width">
                <label className="form-label"> Tipo do Arquivo: <br />
                  <select className="input-field" name="arquivo_tipo">
                    <option value="CONFIRMACAO">Confirmação</option>
                    <option value="RETORNO">Retorno</option>
                  </select>
                </label>
              </div>

              <div className="form-group half-width">
                  <label className="form-label">Data do Arquivo:<br />
                      <input className="input-field" type="date" name="arquivo_data" />
                  </label>
              </div>

              <button
                className="btn-entrar" type="submit"
                > Consultar 
              </button>

            </div>
            </fieldset>

    );
}