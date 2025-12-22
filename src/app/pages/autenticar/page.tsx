"use client";
import { estados } from "@/components/chamadas/estados";
import { useState } from "react";


export default function Autenticar() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const [tokenCenprot, setTokenCenprot] = useState<string | null>(null);
  const [validade, setValidade] = useState<string | null>(null);

  async function handleSubmit(e:React.FormEvent) {
  e.preventDefault();

  const resp = await fetch("/api/cenprot/autenticar", {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      credenciais:{
        usuario: login,
        senha: senha
      }
    })
  });

  const data = await resp.json();

  if (resp.ok){
    const cred = data.payload.credenciais;
    setTokenCenprot(cred.token);
    setValidade(cred.validade);
  } else {
    alert("Erro na autenticação: " + data.detail);
  }
}










  return (
      <form onSubmit={handleSubmit}>
      <fieldset className="card-form">
              <h3 className="section-title">login</h3>
    
              <div className="form-grid">
    
                <div className="form-group half-width">
                  <label className="form-label" >login: <br />
                    <input className="input-field" type="text" value={login}
                  onChange={(e) => setLogin(e.target.value)} />
                  </label>
                </div>
    
                <div className="form-group half-width">
                  <label className="form-label" >senha: <br />
                    <input type="password" className="input-field" placeholder="****" value={senha}
                  onChange={(e) => setSenha(e.target.value)} />
                  </label>
                </div>

                <button type="submit" className="btn-entrar">
                  Autenticar
                </button>

                {tokenCenprot && (
          <div className="card-form" style={{ marginTop: "20px" }}>
            <h3>Token CENPROT</h3>
            <p><strong>Token:</strong> {tokenCenprot}</p>
            <p><strong>Validade:</strong> {validade}</p>
          </div>
        )}
    

    
              </div>
        </fieldset><br/>
      </form>
  )
}
