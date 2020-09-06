import moment from 'moment';

export const numberWithDecimals = (value: number, divideDecimals: number, showDecimals?: number) => {
  const _value = value / Math.pow(10, divideDecimals);
  if (showDecimals) return _value.toFixed(showDecimals);
  return _value;
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

export const getDateLeft = (date: Date) => {
  const now = moment.utc();
  const deadline = moment.utc(date);
  if (now.isAfter(deadline)) {
    return 0;
  } else {
    return deadline.diff(now, "seconds");
  }
}

export const secondsToDays    = (seconds: number) => Math.floor(seconds / (3600*24));
export const secondsToHours   = (seconds: number) => Math.floor(seconds % (3600*24) / 3600);
export const secondsToMinutes = (seconds: number) => Math.floor(seconds % 3600 / 60);
export const secondsToSeconds = (seconds: number) => Math.floor(seconds % 60);

export const truncateAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
}
