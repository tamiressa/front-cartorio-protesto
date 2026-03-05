"use client";
import { validateCenprotResponse } from "@/utils/cenprot";

type MovimentoMensalFormProps = {
    onSuccess: (data: any) => void;
    onStatusChange?: (status: string) => void;
};

function getCookie(name: string) {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1];
}

function formatMesAno(value: FormDataEntryValue | null) {
    if (!value) return null;
    const [year, month] = String(value).split("-");
    return `${month}/${year}`;
}

export default function MovimentoMensal({ onSuccess, onStatusChange }: MovimentoMensalFormProps) {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const cenprotToken = getCookie("CENPROT_TOKEN");
        const statusSelecionado = formData.get("movimento_status");

        const payload = {
            token: cenprotToken,
            movimento: {
                mes: formatMesAno(formData.get("movimento_mes")),
                completa: "S",
                status: statusSelecionado || "",
            },
        };

        const resp = await fetch("/api/cenprot/movimento-mensal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await resp.json();

        try {
            validateCenprotResponse(data);
        } catch (err: any) {
            alert(err.message || "Erro ao consultar movimento mensal");
            return;
        }

        onSuccess(data.payload);
        form.reset();
    }



    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="card-form">
                <div className="form-grid">

                    <div className="form-group half-width">
                        <label className="form-label">
                            Mês de Referência:<br />
                            <input
                                className="input-field"
                                type="month"
                                name="movimento_mes"
                                required
                            />
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
                                <option value="REPROVADO">REPROVADO</option>

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