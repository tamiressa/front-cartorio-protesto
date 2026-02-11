"use client";
import { validateCenprotResponse } from "@/utils/cenprot";

type MovimentoDiarioFormProps = {
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

export default function MovimentoDiario({ onSuccess }: MovimentoDiarioFormProps) {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const cenprotToken = getCookie("CENPROT_TOKEN");

        const payload = {
            token: cenprotToken,
            movimento: {
                data: formatDate(formData.get("movimento_data")),
                completa: null,
                status: null
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

                    <div className="form-group full-width">
                        <label className="form-label">Data
                            do Arquivo:<br />
                            <input className="input-field" type="date" name="movimento_data" required />
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