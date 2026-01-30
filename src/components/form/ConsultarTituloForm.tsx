"use client";

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


export default function ConsultarTituloForm({
  onSuccess,
}: ConsultarTituloFormProps) {

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
    if (!resp.ok) {
      alert(data.message || "Erro ao consultar título");
      return;
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
            <label className="form-label"> Documento: <br />
              <input className="input-field" name="devedor_documento" type="text" />
            </label>
          </div>
        </div>
      </fieldset> <br />

      <fieldset className="card-form">
        <h3 className="section-title">Dívida</h3>
        <div className="form-grid">

          <div className="form-group third-width">
            <label className="form-label"> Número: <br />
              <input className="input-field" name="divida_numero" type="text" />
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label"> Nosso Número: <br />
              <input className="input-field" name="divida_nosso_numero" type="text" />
            </label>
          </div>

          <div className="form-group third-width">
            <label className="form-label">Vencimento:<br />
              <input className="input-field" type="date" name="divida_vencimento" />
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