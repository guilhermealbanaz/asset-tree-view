export interface TreeNode {
  id: string;
  name: string;
  type: 'location' | 'asset' | 'component';
  children?: TreeNode[];
  sensorType?: 'vibration' | 'energy';
  status?: 'operating' | 'alert';
  parentId?: string | null;
  locationId?: string | null;
  sensorId?: string;
  gatewayId?: string;
}

export interface Asset {
  id: string;
  name: string;
  sensor?: 'energy' | 'temperature' | 'vibration';
  receptor?: string;
  children?: Asset[];
  image?: string;
  responsible?: string[];
}

export interface TreeNode extends Asset {
  level: number;
  isLastChild: boolean;
  forceExpanded?: boolean;
}

export interface TreeData {
  locations: Location[];
  assets: Asset[];
}