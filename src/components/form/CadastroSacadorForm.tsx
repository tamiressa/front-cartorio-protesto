import { estados } from "@/components/chamadas/estados";

export default function SacadorForm() {
  return (
    <fieldset className="card-form">
          <h3 className="section-title">Sacador</h3>

          <div className="form-grid">

            <div className="form-group full-width">
              <label className="form-label">Nome:<br />
                <input className="input-field" type="text" name="sacador_nome" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">Tipo de Documento:<br />
                <select className="input-field">
                  <option>CPF</option>
                  <option>CNPJ</option>
                </select>
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">CPF OU CNPJ:<br />
                <input className="input-field" placeholder="000.000.000-00" type="text" name="sacador_documento" />
              </label>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Endereço:<br />
                <input className="input-field" placeholder="Rua, Avenida..." type="text" name="sacador_endereco" />
              </label>
            </div>

            <div className="form-group fifth">
              <label className="form-label">Número:<br />
                <input className="input-field" type="text" name="sacador_numero" />
              </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Complemento:<br />
              <input className="input-field" type="text" name="sacador_complemento" />
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label">CEP:<br />
              <input className="input-field" type="text" name="sacador_cep" />
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Bairro:<br />
              <input className="input-field" type="text" name="sacador_bairro" />
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label">Município:<br />
              <input className="input-field" type="text" name="sacador_municipio" />
            </label>
          </div>

          <div className="form-group fifth" >
            <label className="form-label ">UF:<br />
              <select className="input-field" name="sacador_uf">
                   {estados.map(uf => (<option key={uf} value={uf}>{uf}</option>))}
                </select>
            </label>
          </div>

          </div>
        </fieldset>
  );
}
