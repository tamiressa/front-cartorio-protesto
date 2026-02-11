"use client";

import { useState } from "react";
import { validateCenprotResponse } from "@/utils/cenprot";



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



export default function OperacaoTituloForm() {
    const [mensagem, setMensagem] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();


        const form = e.currentTarget;
        const formData = new FormData(form);
        const cenprotToken = getCookie("CENPROT_TOKEN");

        const payload = {
            token: cenprotToken,
            titulo: {
                autoriza: formData.get("autoriza_titulo"),
                operacao: formData.get("operacao_titulo"),
                justificativa: formData.get("justificativa_titulo"),
                devedor: {
                    documento: formData.get("documento_titulo"),
                },
                divida: {
                    numero: formData.get("numero_titulo"),
                    nossoNumero: formData.get("nosso_numero_titulo"),
                    vencimento: formatDate(formData.get("vencimento_titulo")),
                    especie: "CDA",
                    documento: {
                        extensao: "",
                        documentoBase64: ""
                    }
                },
                cartorio: {
                    protocolo: "",
                    dataProtocolo: ""
                }
            }
        };


        const resp = await fetch("/api/cenprot/operacao-titulo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const text = await resp.text();
        const data = text ? JSON.parse(text) : null;

        try {
            validateCenprotResponse(data);
        } catch (err: any) {
            alert(err.message || "Erro operação título");
            return;
        }

        const operacao = formData.get("operacao_titulo");
        const numero = formData.get("numero_titulo");
        const nossoNumero = formData.get("nosso_numero_titulo");

        let textoOperacao = "";

        switch (operacao) {
            case "REMOCAO":
                textoOperacao = "foi removida";
                break;
            case "DESISTENCIA":
                textoOperacao = "teve desistência";
                break;
            case "CANCELAMENTO":
                textoOperacao = "foi cancelada";
                break;
        }

        setMensagem(
            `Dívida número ${numero} e nosso número ${nossoNumero} ${textoOperacao}.`
        );

        form.reset();



    }




    return (

        <form onSubmit={handleSubmit}>
            <fieldset className="card-form">
                <h3 className="section-title">Título</h3>
                <div className="form-grid">

                    <div className="form-group half-width">
                        <label className="form-label"> Autoriza: <br />
                            <select className="input-field" name="autoriza_titulo" required>
                                <option value="">Selecione uma opção</option>
                                <option value="S" >SIM</option>
                                <option value="N" >NÃO</option>
                            </select>
                        </label>
                    </div>


                    <div className="form-group half-width">
                        <label className="form-label"> Operação: <br />
                            <select className="input-field" name="operacao_titulo" required>
                                <option value="">Selecione uma opção</option>
                                <option value="REMOCAO">REMOÇÃO</option>
                                <option value="DESISTENCIA" >DESISTÊNCIA</option>
                                <option value="CANCELAMENTO" >CANCELAMENTO</option>
                            </select>
                        </label>
                    </div>

                    <div className="form-group full-width ">
                        <label className="form-label">Justificativa: <br />
                            <input className="input-field " type="text" name="justificativa_titulo" required />
                        </label>
                    </div>

                </div>
            </fieldset> <br />

            <fieldset className="card-form">
                <h3 className="section-title">Devedor</h3>
                <div className="form-grid">

                    <div className="form-group half-width">
                        <label className="form-label"> Documento do devedor: <br />
                            <input className="input-field" name="documento_titulo" type="text" required />
                        </label>
                    </div>
                </div>

            </fieldset> <br />


            <fieldset className="card-form">
                <h3 className="section-title">Dívida</h3>
                <div className="form-grid">

                    <div className="form-group third-width">
                        <label className="form-label"> Número: <br />
                            <input className="input-field" name="numero_titulo" type="text" required />
                        </label>
                    </div>

                    <div className="form-group third-width">
                        <label className="form-label"> Nosso Número: <br />
                            <input className="input-field" name="nosso_numero_titulo" type="text" required />
                        </label>
                    </div>

                    <div className="form-group third-width">
                        <label className="form-label">Vencimento:<br />
                            <input className="input-field" type="date" name="vencimento_titulo" required />
                        </label>
                    </div>

                    <div className="form-group half-width">
                        <label className="form-label">Espécie:<br />
                            <select className="input-field" name="especie_titulo" disabled>
                                <option value="CDA" > Certidão de Dívida Ativa (CDA)</option>
                            </select>
                        </label>
                    </div>
                </div>

            </fieldset>

            <br />

            {/* <fieldset className="card-form">
                <h3 className="section-title">Cartório</h3>
                <div className="form-grid">

                    <div className="form-group half-width">
                        <label className="form-label"> Protocolo: <br />
                            <input className="input-field" name="protocolo_titulo" type="text" />
                        </label>
                    </div>

                    <div className="form-group half-width">
                        <label className="form-label"> Data Protocolo: <br />
                            <input className="input-field" name="dataProtocolo_titulo" type="date" />
                        </label>
                    </div> 

                </div>

            </fieldset> */}
            <br />

            <button
                className="btn-entrar" type="submit" style={{ width: "30%" }}
            > Enviar
            </button>

            {mensagem && (
                <p style={{ marginTop: "16px", color: "#16a34a", fontWeight: 500 }}>
                    {mensagem}
                </p>
            )}

        </form>
    )
}