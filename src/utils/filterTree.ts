import { TreeNode } from '../types/Tree';
import { Filters } from '../types/Filters';

export const filterTree = (
  nodes: TreeNode[],
  filters: Filters
): { filteredNodes: TreeNode[]; hasMatch: boolean } => {
  const filterNode = (node: TreeNode): TreeNode | null => {
    const matchesText = filters.searchText
      ? node.name.toLowerCase().includes(filters.searchText.toLowerCase())
      : true;

    const matchesEnergySensor = filters.energySensors
      ? node.type === 'component' && node.sensorType === 'energy'
      : true;

    const matchesCriticalStatus = filters.criticalStatus
      ? node.type === 'component' && node.status === 'alert'
      : true;

    const newNode = { ...node };
    
    if (node.children && node.children.length > 0) {
      const filteredChildren = node.children
        .map(child => filterNode(child))
        .filter((child): child is TreeNode => child !== null);

      newNode.children = filteredChildren;

      const shouldKeepNode = matchesText && matchesEnergySensor && matchesCriticalStatus || filteredChildren.length > 0;
      return shouldKeepNode ? newNode : null;
    }

    const shouldKeepNode = matchesText && matchesEnergySensor && matchesCriticalStatus;
    return shouldKeepNode ? newNode : null;
  };

  const filteredNodes = nodes
    .map(node => filterNode(node))
    .filter((node): node is TreeNode => node !== null);

  return {
    filteredNodes,
    hasMatch: filteredNodes.length > 0
  };
}; 