export function normalizePhoneInput(value, previous) {
  if (!/^\s*\+?[\d\s()-]*$/.test(value)) return previous;
  const prefix = value.trimStart().startsWith('+') ? '+' : '';
  return prefix + value.replace(/\D/g, '').slice(0, 15);
}

export function restrictAmountInput(value, previous) {
  const candidate = value.replace(/,/g, '');
  if (!/^\d{0,9}(?:\.\d{0,2})?$/.test(candidate)) return previous;
  if (candidate && Number(candidate) > 100000000) return previous;
  return candidate;
}

export function restrictUtrInput(value, previous) {
  return /^[A-Za-z0-9/-]{0,100}$/.test(value) ? value : previous;
}

export function normalizePanInput(value, previous) {
  return /^[A-Za-z0-9]{0,10}$/.test(value) ? value.toUpperCase() : previous;
}
