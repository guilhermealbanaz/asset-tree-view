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

    const matchesEnergySensor = filters.energySensors === true
      ? node.type === 'component' && node.sensorType === 'energy'
      : true;

    const matchesCriticalStatus = filters.criticalStatus === true
      ? node.type === 'component' && node.status === 'alert'
      : true;

    const directMatch = matchesText && matchesEnergySensor && matchesCriticalStatus;
    
    const newNode = { ...node };
    
    const hasActiveFilters = filters.searchText !== '' || filters.energySensors === true || filters.criticalStatus === true;
    newNode.forceExpanded = hasActiveFilters && (directMatch || (node.children && node.children.length > 0));
    
    if (node.children && node.children.length > 0) {
      const filteredChildren = node.children
        .map(child => filterNode(child))
        .filter((child): child is TreeNode => child !== null);

      newNode.children = filteredChildren;

      const hasMatchingChild = filteredChildren.length > 0;
      const shouldKeepNode = directMatch || hasMatchingChild;
      
      if (shouldKeepNode) {
        return newNode;
      }
      return null;
    }

    return directMatch ? newNode : null;
  };

  const filteredNodes = nodes
    .map(node => filterNode(node))
    .filter((node): node is TreeNode => node !== null);

  return {
    filteredNodes,
    hasMatch: filteredNodes.length > 0
  };
};