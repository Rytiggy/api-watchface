// Remove all quotation marks from a string
export function stripQuotes(str) {
  return str ? str.replace(/"/g, "") : "";
}
