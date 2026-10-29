export function exportToCSV(filename, headers, data) {
  if (!data || !data.length) return;

  const headerRow = headers.map((h) => `"${h.label}"`).join(',');
  const dataRows = data.map((row) =>
    headers
      .map((h) => {
        const val = row[h.key] ?? '';
        const escaped = String(val).replace(/"/g, '""');
        return `"${escaped}"`;
      })
      .join(',')
  );

  const csvContent = [headerRow, ...dataRows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}