import { estados } from "@/components/chamadas/estados";

export default function EnviarTituloForm() {
  return (
    <div>
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
      </fieldset><br/>

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
        </fieldset> <br/>

      <fieldset className="card-form">
          <h3 className="section-title">Devedor (Principal) </h3>

          <div className="form-grid"> 

            <div className="form-group full-width">
              <label className="form-label">Nome:<br />
                <input type="text" name="devedor_nome" className="input-field" placeholder="Ex: Farmácia LTDA"/>
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
              <label className="form-label">CPF OU CNPJ: <br />
                <input className="input-field"
                placeholder="000.000.000-00" type="text" name="devedor_documento" />
              </label>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Endereço:<br />
                <input className="input-field" placeholder="Rua, Avenida..." type="text" name="devedor_endereco" />
              </label>
            </div>

            <div className="form-group fifth">
              <label className="form-label">Número:<br />
                <input className="input-field" type="text" name="devedor_numero" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">Complemento:<br />
                <input className="input-field" type="text" name="devedor_complemento" />
              </label>
            </div>

            <div className="form-group third-width">
              <label className="form-label">CEP:<br />
                <input className="input-field" type="text" name="devedor_cep" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">Bairro:<br />
                <input className="input-field" type="text" name="devedor_bairro" />
              </label>
            </div>

            <div className="form-group third-width">
              <label className="form-label">Município:<br />
                <input className="input-field" type="text" name="devedor_municipio" />
              </label>
            </div>

            <div className="form-group fifth">
              <label className="form-label ">UF:<br />
                <select className="input-field" name="devedor_uf">
                   {estados.map(uf => (<option key={uf} value={uf}>{uf}</option>))}
                </select>
              </label>
            </div>

          </div>
        </fieldset> <br/>


      <fieldset className="card-form">
          <h3 className="section-title">Dados da Dívida / Título</h3>

          <div className="form-grid">

            <div className="form-group half-width">
              <label className="form-label">Espécie:<br />
                <input className="input-field" type="text" name="divida_especie" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">Número:<br />
                <input className="input-field" type="text" name="divida_numero" />
              </label>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Nosso Número:<br />
                <input className="input-field" type="text" name="divida_nossoNumero" />
              </label>
            </div>

            <div className="form-group quarter">
            <label className="form-label">Valor:<br />
              <input className="input-field" step="0.01" placeholder="0,00" type="text" name="divida_valor" />
            </label>
            </div>

            <div className="form-group quarter">
              <label className="form-label">Saldo:<br />
                <input className="input-field" step="0.01" placeholder="0,00" type="text" name="divida_saldo" />
              </label>
            </div>

            <div className="form-group quarter">
              <label className="form-label">Emissão:<br />
                <input className="input-field" type="date" name="divida_emissao" />
              </label>
            </div>

            <div className="form-group quarter">
              <label className="form-label">Vencimento:<br />
                <input className="input-field" type="date" name="divida_vencimento" />
              </label>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Documento (PDF):<br />
                <input accept=".pdf" className="input-field" type="file" name="divida_documento" style={{ padding: '8px' }}/>
                <small style={{ color: '#6b7280', marginTop: '5px', display: 'block' }}> Tamanho máximo: 5MB </small>
              </label>
            </div>

          </div>
        </fieldset> <br/> <br/>

        <button type="submit" className="btn-entrar" style={{ width: "30%" }}>Enviar</button>


      </div>
    
);
}