// src/utils/cenprot.ts

// src/utils/cenprot.ts

export const WS_ERROR_MESSAGES: Record<string, string> = {
  // 🔴 ERROS
  WS_ERR_001: "Erro inesperado. Contate o suporte técnico.",
  WS_ERR_002: "Token de autenticação inválido. Refaça sua autenticação.",
  WS_ERR_101: "Erro ao autenticar usuário: usuário ou senha inválidos.",
  WS_ERR_102: "Erro ao autenticar usuário: host de origem não permitido.",
  WS_ERR_103: "Erro ao autenticar usuário: função não autorizada.",
  WS_ERR_104: "Erro ao autenticar usuário: usuário bloqueado. Contate o suporte técnico.",
  WS_ERR_300: "Título já estava cadastrado.",
  WS_ERR_301: "Campo com informações incorretas ou nulas.",
  WS_ERR_302: "Campo preenchido de forma incorreta.",
  WS_ERR_303: "Operação inexistente.",
  WS_ERR_304: "Campo com tamanho incorreto. Verifique o manual.",
  WS_ERR_305: "Erro ao consultar protesto.",
  WS_ERR_306: "Falha de comunicação com a CENPROT. Tente novamente mais tarde.",
  WS_ERR_307: "Título não pode ser alterado no status informado.",
  WS_ERR_308: "Título excede o tamanho máximo de 16MB.",
  WS_ERR_309: "Título não pode ser removido (em remessa ou status não permitido).",
  WS_ERR_310: "Erro ao processar solicitação com a central.",
  WS_ERR_311: "Não há títulos para consultar na requisição.",
  WS_ERR_312: "Erro ao selecionar apresentante ou acesso inválido.",
  WS_ERR_2016: "O título já possui esta operação.",
  WS_ERR_2017: "O título já possui autorização.",

  // 🟡 INFORMAÇÕES / REGRAS DE NEGÓCIO (tratadas como erro no front)
  WS_INF_201: "O título não pode ser cancelado no status atual.",
  WS_INF_202: "O título não pode ser desistido no status atual.",
  WS_INF_203: "O título já foi solicitado para esta operação.",
  WS_INF_204: "O título não pode ser removido no status atual.",
  WS_INF_205: "O título encontra-se COLETADO e não pode realizar esta operação. Tente remoção.",
  WS_INF_206: "O título não pode realizar esta operação, pois faltam informações do cartório."
};

export class CenprotError extends Error {
  code?: string;
  type: "ERROR" | "INFO";

  constructor(code?: string, message?: string) {
    super(message);
    this.code = code;
    this.type = code?.startsWith("WS_INF") ? "INFO" : "ERROR";
  }
}

export function validateCenprotResponse(data: any) {
  // 🔴 WS_ERR / 🟡 WS_INF no root
  if (data?.code?.startsWith("WS_ERR") || data?.code?.startsWith("WS_INF")) {
    throw new CenprotError(data.code, data.message);
  }

  // 🔴 Erro no título
  const tituloResposta = data?.payload?.titulo?.[0]?.resposta;
  if (tituloResposta?.status === false) {
    throw new CenprotError(
      tituloResposta.codigo,
      tituloResposta.mensagem
    );
  }

  // 🔴 Erro de autenticação
  const authResposta = data?.payload?.credenciais?.resposta;
  if (authResposta?.status === false) {
    throw new CenprotError(
      authResposta.codigo,
      authResposta.mensagem
    );
  }
}
