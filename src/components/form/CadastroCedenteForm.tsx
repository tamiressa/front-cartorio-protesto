import { estados } from "@/components/chamadas/estados";

export default function CedenteForm() {
  return (
    <fieldset className="card-form">
              <h3 className="section-title">Dados do Cedente</h3>
    
              <div className="form-grid">
    
                <div className="form-group full-width">
                  <label className="form-label" >Nome: <br />
                    <input className="input-field" placeholder="Ex: Farmácia Ltda" type="text" name="cedente_nome" />
                  </label>
                </div>
    
                <div className="form-group half-width">
                  <label className="form-label">Tipo de Documento: <br />
                    <select className="input-field">
                      <option>CPF</option>
                      <option>CNPJ</option>
                    </select>
                  </label>
                </div>
    
                <div className="form-group half-width">
                  <label className="form-label" >CPF ou CNPJ: <br />
                    <input type="text" name="cedente_documento" className="input-field"       placeholder="000.000.000-00"/>
                  </label>
                </div>
    
                <div className="form-group full-width">
                  <label className="form-label">Endereço:<br />
                    <input className="input-field" type="text" name="cedente_endereco" placeholder="Rua, Avenida..." />
                  </label>
                </div>
    
                <div className="form-group fifth ">
                  <label className="form-label">Número: <br />
                    <input className="input-field " type="text" name="cedente_numero" />
                  </label>
                </div>
    
                <div className="form-group half-width">
                  <label className="form-label">Complemento: <br />
                    <input className="input-field" type="text" name="cedente_complemento" />
                  </label>
                </div>
    
                <div className="form-group third-width">
                  <label className="form-label">CEP:<br />
                    <input className="input-field" type="text" name="cedente_cep" />
                  </label>
                </div>
    
                <div className="form-group half-width">
                  <label className="form-label">Bairro:<br />
                    <input className="input-field" type="text" name="cedente_bairro" />
                  </label>
                </div>
    
                <div className="form-group third-width">
                  <label className="form-label">Município:<br />
                    <input className="input-field" type="text" name="cedente_municipio" />
                  </label>
                </div>
    
                <div className="form-group fifth ">
                  <label className="form-label ">UF:<br />
                    <select className="input-field" name="cedente_uf">
                       {estados.map(uf => (<option key={uf} value={uf}>{uf}</option>))}
                    </select>
                  </label>
                </div>
    
                
    
              </div>
            </fieldset>
);
}