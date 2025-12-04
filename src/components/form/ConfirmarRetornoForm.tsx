export default function ConfirmarRetorno(){
    return(
        <fieldset className="card-form">
                  <div className="form-grid">
        
                        <div className="form-group half-width">
                        <label className="form-label"> Código Apresentante: <br />
                            <input className="input-field" name="retorno_codigo"  type="text" />
                        </label>
                        </div>


                        <div className="form-group half-width">
                            <label className="form-label">Nome do Arquivo:<br />
                                <input className="input-field" type="date" name="retorno_nome" />
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