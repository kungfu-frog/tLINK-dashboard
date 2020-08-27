import moment from 'moment';

export const numberWithDecimals = (value: number, divideDecimals: number, showDecimals: number) => {
  const _value = value / Math.pow(10, divideDecimals);
  return _value.toFixed(showDecimals);
}

export const getTimeLeft = (deadlineHour: number) => {
  const now = moment.utc();
  const deadline = now.clone().hour(deadlineHour).minute(0).second(0);
  if (now.isAfter(deadline)) {
    const tomorrow = moment.utc(new Date()).add(1, 'days').hour(deadlineHour).minute(0).second(0);
    return tomorrow.diff(now, "seconds");
  } else {
    return deadline.diff(now, "seconds");
  }
}