"use client";
import { useState } from "react";
import { validateCenprotResponse } from "@/utils/cenprot";


type ConsultarTituloFormProps = {
  onSuccess: (data: any) => void;
};

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}


function formatDate(date: FormDataEntryValue | null) {
  if (!date) return null;
  const [y, m, d] = String(date).split("-");
  return `${d}/${m}/${y}`;
}

function maskNumero(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{9})(\d)/, '$1-$2')
    .slice(0, 12);
}

function maskCPF(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
}

function maskCNPJ(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
}




export default function ConsultarTituloForm({
  onSuccess,
}: ConsultarTituloFormProps) {
  const [tipoDocumento, setTipoDocumento] = useState<"1" | "2" | "">("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const cenprotToken = getCookie("CENPROT_TOKEN");

    // =============================
    // Payload
    // =============================
    const payload = {
      token: cenprotToken,
      completa: "",
      titulo: [
        {
          cartorio: {
            dataProtocolo: "",
            protocolo: ""
          },
          devedor: {
            documento: formData.get("devedor_documento"),
          },
          divida: {
            emissao: "",
            especie: "",
            nossoNumero: formData.get("divida_nosso_numero"),
            numero: formData.get("divida_numero"),
            vencimento: formatDate(formData.get("divida_vencimento"))
          }
        }
      ]
    }

    const resp = await fetch("/api/cenprot/consultar-titulo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    try {

      validateCenprotResponse(data);

      alert("Título(s) abaixo!");


    } catch (err: any) {
      alert(err.message);
    }

    onSuccess(data);
    form.reset();

  }


  return (

    <form onSubmit={handleSubmit}>
      <fieldset className="card-form">
        <h3 className="section-title">Devedor</h3>
        <div className="form-grid">


          <div className="form-group third-width">
            <label className="form-label">Tipo de Documento <br />
              <select
                className="input-field"
                name="devedor_documento_tipo"
                required
                value={tipoDocumento}
                onChange={(e) => {
                  setTipoDocumento(e.target.value as "1" | "2" | "");
                }}
              >
                <option value="">-- Selecione uma opção --</option>
                <option value="1">CPF</option>
                <option value="2">CNPJ</option>
              </select>
            </label>
          </div>


          <div className="form-group third-width">
            <label className="form-label"> Documento: <br />
              <input className="input-field" name="devedor_documento" type="text" required
              disabled={!tipoDocumento}
                placeholder={
                  tipoDocumento === "2"
                    ? "00.000.000/0000-00"
                    : "000.000.000-00"
                }
                maxLength={tipoDocumento === "2" ? 18 : 14}
                onChange={(e) => {
                  if (tipoDocumento === "1") {
                    e.currentTarget.value = maskCPF(e.currentTarget.value);
                  }

                  if (tipoDocumento === "2") {
                    e.currentTarget.value = maskCNPJ(e.currentTarget.value);
                  }
                }}
              />
            </label>
          </div>
        </div>
      </fieldset> <br />

      <fieldset className="card-form">
        <h3 className="section-title">Dívida</h3>
        <div className="form-grid">

          <div className="form-group third-width">
            <label className="form-label"> Número: <br />
              <input className="input-field" name="divida_numero" type="text"
                maxLength={12}
                onChange={(e) => {
                  e.target.value = maskNumero(
                    e.target.value.replace(/\D/g, '')
                  );
                }}
                required />
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label"> Nosso Número: <br />
              <input className="input-field" name="divida_nosso_numero" type="text"
                maxLength={17}
                onInput={(e) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/\D/g, '');
                }}
                required />
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label">Vencimento:<br />
              <input className="input-field" type="date" name="divida_vencimento" required />
            </label>
          </div>



        </div>

      </fieldset> <br />

      <br /> <br />

      <button
        className="btn-entrar" type="submit" style={{ width: "30%" }}
      > Consultar
      </button>
    </form>
  );

}