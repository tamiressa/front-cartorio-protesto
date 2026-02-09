"use client";

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}


function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1]; // remove data:...
      resolve(base64);
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function formatDate(date: FormDataEntryValue | null) {
  if (!date) return null;
  const [y, m, d] = String(date).split("-");
  return `${d}/${m}/${y}`;
}


export default function EnviarTituloForm() {

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const cenprotToken = getCookie("CENPROT_TOKEN");

    // =============================
    // Documento ZIP → base64
    // =============================
    const file = formData.get("divida_extensao") as File;
    const documentoBase64 = await fileToBase64(file);


    // =============================
    // Payload
    // =============================
    const payload = {
      token: cenprotToken,
      titulo: [
        {
          cedente: {
            codigo: "",
            nome: "CONSELHO REGIONAL DE FARMACIA DO ESTADO DE PERNAMBUCO",
            documentoTipo: "2",
            documento: "09822982000171",
            endereco: "RUA AMELIA",
            numero: "50",
            complemento: "SEM COMPLEMENTO",
            cep: "52020150",
            bairro: "ESPINHEIRO",
            municipio: "RECIFE",
            uf: "PE",
          },
          sacador: {
            nome: "CONSELHO REGIONAL DE FARMACIA DO ESTADO DE PERNAMBUCO",
            documentoTipo: "2",
            documento: "09822982000171",
            endereco: "RUA AMELIA",
            numero: "50",
            complemento: "SEM COMPLEMENTO",
            cep: "52020150",
            bairro: "ESPINHEIRO",
            municipio: "RECIFE",
            uf: "PE",
          },
          devedor: [
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
            }]
          ,
          divida: {
            especie: "CDA",
            numero: formData.get("divida_numero"),
            nossoNumero: formData.get("divida_nossoNumero"),
            valor: formData.get("divida_valor"),
            saldo: formData.get("divida_saldo"),
            aceite: "N",
            finsFalimentares: "N",
            emissao: formatDate(formData.get("divida_emissao")),
            vencimento: formatDate(formData.get("divida_vencimento")),
            tipoEndosso: "B",
            declaracaoPortador: "I",
            documento: {
              extensao: "zip",
              documentoBase64
            }
          }
        }
      ]
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
              <input className="input-field" type="text" name="cedente_codigo" disabled/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label" >Nome: <br />
              <input className="input-field" placeholder="CONSELHO REGIONAL DE FARMACIA DO ESTADO DE PERNAMBUCO" 
              type="text" name="cedente_nome" disabled/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Tipo de Documento <br />
              <select className="input-field" name="cedente_documento_tipo" disabled>
                <option value="2" selected>CNPJ</option>
              </select>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label" >Documento: <br />
              <input type="text" name="cedente_documento" className="input-field" placeholder="09.822.982/0001-71" disabled/>
            </label>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Endereço: <br />
              <input className="input-field" type="text" name="cedente_endereco" placeholder="Rua Amélia" disabled/>
            </label>
          </div>

          <div className="form-group fifth ">
            <label className="form-label">Número: <br />
              <input className="input-field " type="text" name="cedente_numero" placeholder="50" disabled/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Complemento: <br />
              <input className="input-field" type="text" name="cedente_complemento" disabled/>
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label">CEP:<br />
              <input className="input-field" type="text" name="cedente_cep" placeholder="52020-150" disabled/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Bairro:<br />
              <input className="input-field" type="text" name="cedente_bairro" placeholder="Espinheiro" disabled/>
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label">Município:<br />
              <input className="input-field" type="text" name="cedente_municipio" placeholder="Recife" disabled/>
            </label>
          </div>

          <div className="form-group fifth ">
            <label className="form-label ">UF:<br />
              <input className="input-field" type="text" name="cedente_uf" placeholder="PE" disabled/>
            </label>
          </div>



        </div>
      </fieldset><br />

      <fieldset className="card-form">
        <h3 className="section-title">Sacador</h3>

        <div className="form-grid">

          <div className="form-group full-width">
            <label className="form-label">Nome:<br />
              <input className="input-field" type="text" name="sacador_nome" placeholder="CONSELHO REGIONAL DE FARMACIA DO ESTADO DE PERNAMBUCO" disabled/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Tipo de Documento:<br />
              <select className="input-field" name="sacador_documento_tipo" disabled>
                <option value="1" selected>CPF</option>
              </select>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Documento:<br />
              <input className="input-field" placeholder="09.822.982/0001-71" type="text" name="sacador_documento" disabled/>
            </label>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Endereço:<br />
              <input className="input-field" placeholder="Rua Amélia" type="text" name="sacador_endereco" disabled/>
            </label>
          </div>

          <div className="form-group fifth">
            <label className="form-label">Número:<br />
              <input className="input-field" type="text" name="sacador_numero" placeholder="50" disabled/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Complemento:<br />
              <input className="input-field" type="text" name="sacador_complemento" disabled/>
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label">CEP:<br />
              <input className="input-field" type="text" name="sacador_cep" placeholder="52020-150" disabled/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Bairro:<br />
              <input className="input-field" type="text" name="sacador_bairro" placeholder="Espinheiro" disabled/>
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label">Município:<br />
              <input className="input-field" type="text" name="sacador_municipio" placeholder="Recife" disabled/>
            </label>
          </div>

          <div className="form-group fifth" >
            <label className="form-label ">UF:<br />
              <input className="input-field" type="text" name="sacador_uf" placeholder="PE" disabled/>
            </label>
          </div>

        </div>
      </fieldset> <br />

      <fieldset className="card-form">
        <h3 className="section-title">Devedor (Principal) </h3>

        <div className="form-grid">


          <div className="form-group half-width">
            <label className="form-label">Principal:<br />
              <select name="devedor_principal" className="input-field" defaultValue="S" >
                <option value="S">Sim</option>
                <option value="N">Não</option>
              </select>
            </label>

          </div>

          <div className="form-group half-width">
            <label className="form-label">Nome:<br />
              <input type="text" name="devedor_nome" className="input-field" placeholder="Ex: Farmácia LTDA" required/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Tipo de Documento <br />
              <select className="input-field" name="devedor_documento_tipo" >
                <option selected>-- Selecione uma opção --</option>
                <option value="1" >CPF</option>
                <option value="2">CNPJ</option>
              </select>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Documento: <br />
              <input className="input-field"
                placeholder="000.000.000-00" type="text" name="devedor_documento" required/>
            </label>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Endereço:<br />
              <input className="input-field" placeholder="Rua, Avenida..." type="text" name="devedor_endereco" required/>
            </label>
          </div>

          <div className="form-group fifth">
            <label className="form-label">Número:<br />
              <input className="input-field" type="text" name="devedor_numero" required/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Complemento:<br />
              <input className="input-field" type="text" name="devedor_complemento" />
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label">CEP:<br />
              <input className="input-field" type="text" name="devedor_cep" required/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Bairro:<br />
              <input className="input-field" type="text" name="devedor_bairro" required/>
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label">Município:<br />
              <input className="input-field" type="text" name="devedor_municipio" required/>
            </label>
          </div>

          <div className="form-group fifth">
            <label className="form-label ">UF:<br />
              <input className="input-field" type="text" name="devedor_uf" required/>
            </label>
          </div>

        </div>
      </fieldset> <br />


      <fieldset className="card-form">
        <h3 className="section-title">Dados da Dívida / Título</h3>

        <div className="form-grid">

          <div className="form-group half-width">
            <label className="form-label">Espécie:<br />
              <select className="input-field" name="divida_especie" disabled>
                <option value="CDA" selected > Certidão de Dívida Ativa (CDA)</option>
              </select>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Número:<br />
              <input className="input-field" type="text" name="divida_numero" required/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Nosso Número:<br />
              <input className="input-field" type="text" name="divida_nossoNumero" required/>
            </label>
          </div>

          <div className="form-group quarter">
            <label className="form-label">Valor:<br />
              <input className="input-field" step="0.01" placeholder="0,00" type="text" name="divida_valor" required/>
            </label>
          </div>

          <div className="form-group quarter">
            <label className="form-label">Saldo:<br />
              <input className="input-field" step="0.01" placeholder="0,00" type="text" name="divida_saldo" required/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label" >Tipo Endosso: <br />
              <select className="input-field" name="divida_endosso" disabled >
                <option value="B" selected >B — Endosso em Branco</option>
              </select>

            </label>
          </div>

          <div className="form-group quarter">
            <label className="form-label">Aceite:<br />
              <select name="divida_aceite" className="input-field" defaultValue="N" disabled>
                <option value="S">Sim</option>
                <option value="N">Não</option>
              </select>
            </label>
          </div>

          <div className="form-group quarter">
            <label className="form-label">Fins Falimentares:<br />
              <select name="divida_fins" className="input-field" defaultValue="N" disabled>
                <option value="S">Sim</option>
                <option value="N">Não</option>
              </select>
            </label>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Declaração Portador<br />
              <select className="input-field" name="divida_declaracao" disabled>
                <option value="D"> D — DMI ou DSI: Declara estar de posse da documentação comprobatória </option>
                <option value="A"> A — Títulos com apresentação física do documento original </option>
                <option value="G"> G — Dispensa de documentação</option>
                <option value="I" selected> I — Envio de imagem do documento</option>
                <option value="C"> C — CCB ou CBI: Declara estar de posse da documentação comprobatória </option>
              </select>
            </label>
          </div>


          <div className="form-group quarter">
            <label className="form-label">Emissão:<br />
              <input className="input-field" type="date" name="divida_emissao" required/>
            </label>
          </div>

          <div className="form-group quarter">
            <label className="form-label">Vencimento:<br />
              <input className="input-field" type="date" name="divida_vencimento" required/>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">Documento (ZIP):<br />
              <input type="file"
                className="input-field"
                accept=".zip"
                name="divida_extensao" 
                required/>
            </label>
          </div>


        </div>
      </fieldset> <br /> <br />

      <button type="submit" className="btn-entrar" style={{ width: "30%" }}>Enviar</button>

    </form>




  );
}