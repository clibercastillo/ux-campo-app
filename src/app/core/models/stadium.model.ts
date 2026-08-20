export interface Stadium {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  fieldType: string;
  pricePerHour: number;
  ownerEmail: string;
  enabled: boolean;
}

export interface StadiumRequest {
  name: string;
  address: string;
  city: string;
  capacity: number;
  fieldType: string;
  pricePerHour: number;
}
