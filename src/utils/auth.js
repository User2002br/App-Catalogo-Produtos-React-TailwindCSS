// Função para obter o valor de um cookie pelo nome
export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

// Função para obter o payload de validação do cookie de autenticação
export function getValidationPayload() {
  const cookie = getCookie('account_validation_signature');
  if (!cookie) return null;
  try {
    // Decodifica o cookie de base64 e o converte de JSON para objeto
    return JSON.parse(atob(cookie));
  } catch {
    return null;
  }
}