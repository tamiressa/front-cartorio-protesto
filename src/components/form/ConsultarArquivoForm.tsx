"use client";

type ConsultarArquivoFormProps = {
  onSuccess: (data: any) => void;
};

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}

function formatDate(date: FormDataEntryValue | null) {
  if (!date) return "";
  const [y, m, d] = String(date).split("-");
  return `${d}/${m}/${y}`;
}


export default function ConsultarArquivo({ onSuccess }: ConsultarArquivoFormProps) {

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const cenprotToken = getCookie("CENPROT_TOKEN");

    const payload = {
      token: cenprotToken,
      arquivo: {
        tipoArquivo: formData.get("arquivo_tipo"),
        dataArquivo: formatDate(formData.get("arquivo_data"))
      }
    };

    const resp = await fetch("/api/cenprot/consultar-arquivo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!resp.ok) {
      alert(data.message || "Erro ao consultar arquivo");
      return;
    }

    onSuccess(data);
    form.reset();
  }

  // O return PRECISA estar dentro da função ConsultarArquivo
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="card-form" style={{ border: 'none' }}>
        <div className="form-grid">
          <div className="form-group half-width">
            <label className="form-label"> 
              Tipo do Arquivo: <br />
              <select className="input-field" name="arquivo_tipo">
                <option value="CONFIRMACAO">Confirmação</option>
                <option value="RETORNO">Retorno</option>
              </select>
            </label>
          </div>

          <div className="form-group half-width">
            <label className="form-label">
              Data do Arquivo:<br />
              <input className="input-field" type="date" name="arquivo_data" required/>
            </label>
          </div>

          <div className="full-width"> 
            <button className="btn-entrar" type="submit">
              Consultar
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}