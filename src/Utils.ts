export function CheckArray(arr?: any[], type?: any) {
  if(!arr || !type) return false;
  return !(!arr || arr.some((s) => !(s instanceof type)) || arr.length < 1);
}
