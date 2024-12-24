export type SensorType = 'vibration' | 'energy';
export type Status = 'operating' | 'alert';

export interface Asset {
  id: string;
  name: string;
  parentId?: string | null;
  locationId?: string | null;
  sensorId?: string;
  sensorType?: SensorType;
  status?: Status;
  gatewayId?: string;
} 