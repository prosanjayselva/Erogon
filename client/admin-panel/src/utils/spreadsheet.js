export function spreadsheetText(value) {
  if (value === null || value === undefined) return '';
  const text = typeof value === 'object' ? JSON.stringify(value) : String(value);
  // Excel may evaluate imported text as a formula, even when it came from an HTML table.
  return /^[\s\u0000-\u001f]*[=+@-]/u.test(text) ? `'${text}` : text;
}
