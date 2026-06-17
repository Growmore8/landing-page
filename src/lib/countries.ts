export const COUNTRIES = [
  { name: "United Arab Emirates", dialCode: "+971", code: "AE" },
  { name: "United Kingdom", dialCode: "+44", code: "GB" },
  { name: "United States", dialCode: "+1", code: "US" },
  { name: "Jordan", dialCode: "+962", code: "JO" },
  { name: "Saudi Arabia", dialCode: "+966", code: "SA" },
  { name: "Qatar", dialCode: "+974", code: "QA" },
  { name: "Kuwait", dialCode: "+965", code: "KW" },
  { name: "Bahrain", dialCode: "+973", code: "BH" },
  { name: "Oman", dialCode: "+968", code: "OM" },
  { name: "Egypt", dialCode: "+20", code: "EG" },
  { name: "Germany", dialCode: "+49", code: "DE" },
  { name: "France", dialCode: "+33", code: "FR" },
  { name: "Singapore", dialCode: "+65", code: "SG" },
  { name: "Hong Kong", dialCode: "+852", code: "HK" },
  { name: "Australia", dialCode: "+61", code: "AU" },
  { name: "South Africa", dialCode: "+27", code: "ZA" },
  { name: "Nigeria", dialCode: "+234", code: "NG" },
  { name: "Kenya", dialCode: "+254", code: "KE" },
  { name: "Sri Lanka", dialCode: "+94", code: "LK" },
  { name: "India", dialCode: "+91", code: "IN" },
  { name: "Pakistan", dialCode: "+92", code: "PK" },
  { name: "Bangladesh", dialCode: "+880", code: "BD" },
  { name: "Indonesia", dialCode: "+62", code: "ID" },
  { name: "Malaysia", dialCode: "+60", code: "MY" },
  { name: "Turkey", dialCode: "+90", code: "TR" },
  { name: "Canada", dialCode: "+1", code: "CA" },
  { name: "Netherlands", dialCode: "+31", code: "NL" },
  { name: "Switzerland", dialCode: "+41", code: "CH" },
  { name: "Cyprus", dialCode: "+357", code: "CY" },
  { name: "Malta", dialCode: "+356", code: "MT" },
  { name: "Other", dialCode: "+0", code: "XX" },
];

export function getFlagUrl(code: string) {
  if (code === "XX") return null;
  return `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
}