import { TreeNode } from '../types/Tree';

interface TreeBuilderData {
  locations: any[];
  assets: any[];
}

export class TreeBuilder {
  private locations: any[];
  private assets: any[];
  private nodeMap: Map<string, TreeNode>;

  constructor(data: TreeBuilderData) {
    this.locations = data?.locations || [];
    this.assets = data?.assets || [];
    this.nodeMap = new Map();
  }

  private isComponent(asset: any): boolean {
    return !!asset.sensorType && !!asset.status;
  }

  private createLocationNode(location: any): TreeNode {
    return {
      id: location.id,
      name: location.name,
      type: 'location',
      children: [],
      parentId: location.parentId || null,
      level: 0,
      isLastChild: false
    };
  }

  private createAssetNode(asset: any): TreeNode {
    const type = this.isComponent(asset) ? 'component' : 'asset';
    
    return {
      id: asset.id,
      name: asset.name,
      type,
      status: asset.status || 'operating',
      sensorType: asset.sensorType,
      children: [],
      parentId: asset.parentId || null,
      locationId: asset.locationId || null,
      gatewayId: asset.gatewayId,
      sensorId: asset.sensorId,
      level: 0,
      isLastChild: false
    };
  }

  public build(): TreeNode[] {
    this.locations.forEach(location => {
      this.nodeMap.set(location.id, this.createLocationNode(location));
    });

    this.assets.forEach(asset => {
      this.nodeMap.set(asset.id, this.createAssetNode(asset));
    });

    const rootNodes: TreeNode[] = [];

    this.locations.forEach(location => {
      const node = this.nodeMap.get(location.id);
      if (!node) return;

      if (!location.parentId) {
        rootNodes.push(node);
      } else {
        const parent = this.nodeMap.get(location.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(node);
        }
      }
    });

    this.assets.forEach(asset => {
      const node = this.nodeMap.get(asset.id);
      if (!node) return;

      if (asset.locationId) {
        const locationParent = this.nodeMap.get(asset.locationId);
        if (locationParent) {
          locationParent.children = locationParent.children || [];
          locationParent.children.push(node);
        }
      } else if (asset.parentId) {
        const assetParent = this.nodeMap.get(asset.parentId);
        if (assetParent) {
          assetParent.children = assetParent.children || [];
          assetParent.children.push(node);
        }
      } else {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  }

  public filterTree(nodes: TreeNode[], filters: { searchText: string; energySensors: boolean; criticalStatus: boolean }): { filteredNodes: TreeNode[] } {
    const matchesFilters = (node: TreeNode): boolean => {
      const matchesSearch = !filters.searchText || 
        node.name.toLowerCase().includes(filters.searchText.toLowerCase());
      
      const matchesEnergySensor = !filters.energySensors || 
        (node.type === 'component' && node.sensorType === 'energy');
      
      const matchesCriticalStatus = !filters.criticalStatus || 
        (node.type === 'component' && node.status === 'alert');

      return matchesSearch && matchesEnergySensor && matchesCriticalStatus;
    };

    const hasMatchingDescendant = (node: TreeNode): boolean => {
      if (!node.children) return false;
      return node.children.some(child => 
        matchesFilters(child) || hasMatchingDescendant(child)
      );
    };

    const filterNode = (node: TreeNode): TreeNode | null => {
      const nodeMatches = matchesFilters(node);
      const hasMatchingChild = hasMatchingDescendant(node);

      if (nodeMatches || hasMatchingChild) {
        const filteredNode = { ...node };
        
        if (node.children) {
          filteredNode.children = node.children
            .map(child => filterNode(child))
            .filter((child): child is TreeNode => child !== null);
        }
        
        return filteredNode;
      }

      return null;
    };

    const filteredNodes = nodes
      .map(node => filterNode(node))
      .filter((node): node is TreeNode => node !== null);

    return { filteredNodes };
  }
}