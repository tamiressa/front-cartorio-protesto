"use client";
import { validateCenprotResponse } from "@/utils/cenprot";

type MovimentoDiarioFormProps = {
    onSuccess: (data: any) => void;
    onStatusChange?: (status: string) => void; // 👈 opcional
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

export default function MovimentoDiario({ onSuccess, onStatusChange }: MovimentoDiarioFormProps) {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const cenprotToken = getCookie("CENPROT_TOKEN");
        const statusSelecionado = formData.get("movimento_status");


        const payload = {
            token: cenprotToken,
            movimento: {
                data: formatDate(formData.get("movimento_data")),
                completa: null,
                status: statusSelecionado || null,
            }
        };

        const resp = await fetch("/api/cenprot/movimento-diario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await resp.json();
        try {
            validateCenprotResponse(data); // 🔥 AQUI
        } catch (err: any) {
            alert(err.message || "Erro ao consultar movimento diário");
            return;
        }

        onSuccess(data.payload.movimento);
        form.reset();
    }









    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="card-form">
                <div className="form-grid">

                    <div className="form-group half-width">
                        <label className="form-label">Data
                            do Arquivo:<br />
                            <input className="input-field" type="date" name="movimento_data" required />
                        </label>
                    </div>

                    <div className="form-group half-width">
                        <label className="form-label">Status do Arquivo:<br />
                            <select className="input-field" name="movimento_status" defaultValue=""
                                onChange={(e) => onStatusChange?.(e.target.value)}>

                                <option value="" disabled>
                                    Selecione
                                </option>
                                <option value="INEXISTENTE">INEXISTENTE</option>
                                <option value="COLETADO">COLETADO</option>
                                <option value="GERADO">GERADO</option>
                                <option value="AGENDADO">AGENDADO</option>
                                <option value="ENVIADO">ENVIADO</option>
                                <option value="CONFIRMADO">CONFIRMADO</option>
                                <option value="DEVOLVIDO">DEVOLVIDO</option>
                                <option value="CANCELADO">CANCELADO</option>
                                <option value="PAGO">PAGO</option>
                                <option value="PROTESTADO">PROTESTADO</option>
                                <option value="RETIRADO">RETIRADO</option>
                                <option value="SUSTADO">SUSTADO</option>
                                <option value="SUSPENSO">SUSPENSO</option>
                            </select>
                        </label>
                    </div>


                    <button type="submit" className="btn-entrar">
                        Consultar
                    </button>

                </div>
            </fieldset>
        </form>

    );
}