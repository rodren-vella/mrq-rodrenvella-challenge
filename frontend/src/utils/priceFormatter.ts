export function formatCurrency(value: number) {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
    style: 'currency',
    currency: 'USD'
  }).format(value);
}
