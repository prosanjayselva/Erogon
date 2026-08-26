function valueForExport(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function escapeHtml(value) {
  return valueForExport(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function exportExcel(rows, filename) {
  if (!rows?.length) return;
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const header = columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('');
  const body = rows.map((row) => `<tr>${columns.map((column) => `<td>${escapeHtml(row[column])}</td>`).join('')}</tr>`).join('');
  const workbook = `<!doctype html><html><head><meta charset="utf-8"></head><body><table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></body></html>`;
  const blob = new Blob(['\ufeff', workbook], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.xls`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function ExportExcelButton({ rows, filename }) {
  const toast = useToastStore((state) => state.add);
  const handleExport = () => {
    if (!rows?.length) {
      toast('No data available to export', 'error');
      return;
    }
    exportExcel(rows, filename);
    toast('Excel file downloaded', 'success');
  };

  return <button type="button" className="btn-add" onClick={handleExport}>Export to Excel</button>;
}
import { useToastStore } from '../../stores/toast-store.js';
