export const numberWithDecimals = (value: number, divideDecimals: number, showDecimals: number) => {
  const _value = value / Math.pow(10, divideDecimals);
  return _value.toFixed(showDecimals);
}
