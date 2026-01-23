export default function MovimentoDiario(){
    return(
        <fieldset className="card-form">
            <div className="form-grid">

              <div className="form-group full-width">
                  <label className="form-label">Data
                     do Arquivo:<br />
                      <input className="input-field" type="date" name="movimento_data" />
                  </label>
              </div> 
            

                <button type="submit" className="btn-entrar">
                    Consultar 
                </button>

            </div>
            </fieldset>

    );
}