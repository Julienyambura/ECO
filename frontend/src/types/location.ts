export interface RecyclingLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  hours?: string;
  phone?: string;
  acceptedItems?: string[];
  imagePath?: string;
}
