"use client";


//function fileToBase64(file: File): Promise<string> {
  //return new Promise((resolve, reject) => {
    //const reader = new FileReader();

    //reader.onload = () => {
      //const result = reader.result as string;
      //const base64 = result.split(",")[1]; // remove data:...
      //resolve(base64);
    //};

    //reader.onerror = () => reject(reader.error);
    //reader.readAsDataURL(file);
  //});
//}


export default function EnviarTituloForm() {

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // =============================
    // Documento ZIP → base64
    // =============================


    // =============================
    // Payload
    // =============================
    const payload = {
      titulo: [{
        cedente: {
          codigo: formData.get("cedente_codigo"),
          nome: formData.get("cedente_nome"),
          documentoTipo: formData.get("cedente_documento_tipo"),
          documento: formData.get("cedente_documento"),
          endereco: formData.get("cedente_endereco"),
          numero: formData.get("cedente_numero"),
          complemento: formData.get("cedente_complemento"),
          cep: formData.get("cedente_cep"),
          bairro: formData.get("cedente_bairro"),
          municipio: formData.get("cedente_municipio"),
          uf: formData.get("cedente_uf"),
        },
        sacador: {
          nome: formData.get("sacador_nome"),
          documentoTipo: formData.get("sacador_documento_tipo"),
          documento: formData.get("sacador_documento"),
          endereco: formData.get("sacador_endereco"),
          numero: formData.get("sacador_numero"),
          complemento: formData.get("sacador_complemento"),
          cep: formData.get("sacador_cep"),
          bairro: formData.get("sacador_bairro"),
          municipio: formData.get("sacador_municipio"),
          uf: formData.get("sacador_uf"),
        },
        devedor:
          {
            principal: formData.get("devedor_principal"),
            nome: formData.get("devedor_nome"),
            documentoTipo: formData.get("devedor_documento_tipo"),
            documento: formData.get("devedor_documento"),
            endereco: formData.get("devedor_endereco"),
            numero: formData.get("devedor_numero"),
            complemento: formData.get("devedor_complemento"),
            cep: formData.get("devedor_cep"),
            bairro: formData.get("devedor_bairro"),
            municipio: formData.get("devedor_municipio"),
            uf: formData.get("devedor_uf"),
          }
        ,
        divida: {
          especie: formData.get("divida_especie"),
          numero: formData.get("divida_numero"),
          nossoNumero: formData.get("divida_nossoNumero"),
          valor: formData.get("divida_valor"),
          saldo: formData.get("divida_saldo"),
          aceite: formData.get("divida_aceite"),
          finsFalimentares: formData.get("divida_fins"),
          emissao: formData.get("divida_emissao"),
          vencimento: formData.get("divida_vencimento"),
          tipoEndosso: formData.get("divida_endosso"),
          declaracaoPortador: formData.get("divida_declaracao"),
          documento: {
            extensao: formData.get("divida_extensao"),
            documentoBase64:formData.get("divida_docbase")
          }
        }
      }]
    };

    // =============================
    //  Envio
    // =============================
    const resp = await fetch("/api/cenprot/enviar-titulo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();

    if (!resp.ok) {
      alert(data.message || "Erro ao enviar título");
      return;
    }

    alert("Título enviado com sucesso!");
    form.reset();
  }

  return (

    <form onSubmit={handleSubmit}>
      <fieldset className="card-form">
              <h3 className="section-title">Dados do Cedente</h3>
    
              <div className="form-grid">

                <div className="form-group half-width">
                  <label className="form-label" >Código: <br />
                    <input className="input-field" type="text" name="cedente_codigo" />
                  </label>
                </div>
    
                <div className="form-group half-width">
                  <label className="form-label" >Nome: <br />
                    <input className="input-field" placeholder="Ex: Farmácia Ltda" type="text" name="cedente_nome" />
                  </label>
                </div>
    
                <div className="form-group half-width">
                  <label className="form-label">Tipo de Documento: 1 para CPF, 2 para CNPJ <br />
                    <input className="input-field"  type="text" name="cedente_documento_tipo" />
                  </label>
                </div>
    
                <div className="form-group half-width">
                  <label className="form-label" >Documento: <br />
                    <input type="text" name="cedente_documento" className="input-field"       placeholder="000.000.000-00"/>
                  </label>
                </div>
    
                <div className="form-group full-width">
                  <label className="form-label">Endereço: <br />
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
                    <input className="input-field" type="text" name="cedente_uf" />
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
              <label className="form-label">Tipo de Documento: 1 para CPF, 2 para CNPJ:<br />
                <input className="input-field"  type="text" name="sacador_documento_tipo" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">Documento:<br />
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
              <input className="input-field" type="text" name="sacador_uf" />
            </label>
          </div>

          </div>
        </fieldset> <br/>

      <fieldset className="card-form">
          <h3 className="section-title">Devedor (Principal) </h3>

          <div className="form-grid"> 


            <div className="form-group half-width">
              <label className="form-label">Principal:<br />
                <select name="devedor_principal" className="input-field" defaultValue="S">
                  <option value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              </label>

            </div>

            <div className="form-group half-width">
              <label className="form-label">Nome:<br />
                <input type="text" name="devedor_nome" className="input-field" placeholder="Ex: Farmácia LTDA"/>
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">Tipo de Documento:<br />
                <input className="input-field"  type="text" name="devedor_documento_tipo" />
              </label>
            </div>
          
            <div className="form-group half-width">
              <label className="form-label">Documento: <br />
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
                <input className="input-field" type="text" name="devedor_uf" />
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
              <label className="form-label">Tipo Endosso:<br />
                <input className="input-field" type="text" name="divida_endosso" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">aceite:<br />
                <select name="divida_aceite" className="input-field" defaultValue="N">
                  <option value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">fins Falimentares:<br />
                <select name="divida_fins" className="input-field" defaultValue="N">
                  <option value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              </label>
            </div>

            <div className="form-group quarter">
              <label className="form-label">Declaração Portador<br />
                <input className="input-field" type="text" name="divida_declaracao" />
              </label>
            </div>


            <div className="form-group quarter">
              <label className="form-label">Emissão:<br />
                <input className="input-field" type="text" name="divida_emissao" />
              </label>
            </div>

            <div className="form-group quarter">
              <label className="form-label">Vencimento:<br />
                <input className="input-field" type="text" name="divida_vencimento" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">Documento (ZIP):<br />
                <input className="input-field" type="text" name="divida_extensao" />
              </label>
            </div>

            <div className="form-group half-width">
              <label className="form-label">base 64:<br />
                <input className="input-field" type="text" name="divida_docbase" />
              </label>
            </div>


          </div>
        </fieldset> <br/> <br/>

        <button type="submit" className="btn-entrar" style={{ width: "30%" }}>Enviar</button>
        
      </form>

      
      
    
);
}