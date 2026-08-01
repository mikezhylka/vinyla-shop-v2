export type SearchParamsPromise = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

/** Safely extract a single string value from a SearchParams field */
export function getStringParam(
  params: SearchParams,
  key: string,
): string | undefined {
  const value = params[key];
  if (Array.isArray(value)) return value[0];
  return value;
}
