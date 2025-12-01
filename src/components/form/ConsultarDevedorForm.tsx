export default function ConsultarDevedorForm(){
    return(
        <fieldset className="card-form">
                  <h3 className="section-title">Devedor</h3>
                  <div className="form-grid">
        
                    <div className="form-group third-width">
                      <label className="form-label"> CPF: <br />
                        <input className="input-field" name="devedor_documento"  type="text" />
                      </label>
                    </div>
                  </div>
                </fieldset>
    );

}