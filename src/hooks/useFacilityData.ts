export type FacilityData = {
  id: string;
  name: string;
  address: string;
  suburb: string;
  facilityType: string;
};

export default function useFacilityData(raw: any): FacilityData {
  const id = String(
    raw?.OBJECTID ?? raw?.ID ?? raw?.id ?? raw?.feature_id ?? ""
  );

  const name =
    raw?.FacilityName ||
    raw?.FACILITY_NAME ||
    raw?.name ||
    raw?.title ||
    raw?.Label ||
    raw?.label ||
    "Location";

  const address = raw?.Address || raw?.address || raw?.STREET || "";
  const suburb = raw?.Suburb || raw?.suburb || raw?.SUBURB || "";
  const facilityType =
    raw?.FacilityType || raw?.type || raw?.category || raw?.SUBCATEGORY || "";

  return { id, name, address, suburb, facilityType };
}
