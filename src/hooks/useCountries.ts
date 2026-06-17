import { COUNTRIES } from "@/lib/countries";

export type Country = typeof COUNTRIES[0];

export function useCountries() {
  return { countries: COUNTRIES, loading: false };
}