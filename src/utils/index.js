export function capitalize(str) {
  return str
    .split(' ')
    .map(word => word.replace(word.charAt(0), word.charAt(0).toUpperCase()))
    .join(' ');
}
