// -------------decodificador de token-------------------------------------//
export function DecodedToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const buffer = Buffer.from(base64, "base64");
  const jsonPayload = buffer.toString("utf-8");
  return JSON.parse(jsonPayload);
}
// -------------decodificador de token-------------------------------------//
