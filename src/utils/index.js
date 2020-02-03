export function capitalize(str) {
  return str
    .split(' ')
    .map(word => word.replace(word.charAt(0), word.charAt(0).toUpperCase()))
    .join(' ');
}

export function roundNumber(num) {
  return Math.round(num * 100) / 100;
}
