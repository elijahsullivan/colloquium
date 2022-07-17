export const firstOrValue = (data: string | string[]) =>
  Array.isArray(data) ? data[0] : data;
