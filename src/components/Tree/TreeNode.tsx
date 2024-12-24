import React, { useState, useEffect } from 'react';
import { TreeNode as ITreeNode } from '../../types/Tree';

interface TreeNodeProps {
  node: ITreeNode;
  level: number;
  isLastChild: boolean;
  onNodeClick?: (node: ITreeNode) => void;
  forceExpanded?: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  level,
  onNodeClick,
  forceExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(forceExpanded);

  useEffect(() => {
    if (forceExpanded) {
      setIsExpanded(true);
    }
  }, [forceExpanded]);

  const getNodeIcon = () => {
    switch (node.type) {
      case 'location':
        return (
          <img 
            src="./assets/location.png" 
            alt="Location" 
            className="w-5 h-5"
          />
        );
      case 'component':
        return (
          <img 
            src="./assets/component.png" 
            alt="Component" 
            className="w-5 h-5"
          />
        );
      case 'asset':
        return (
          <img 
            src="./assets/asset.png" 
            alt="Asset" 
            className="w-5 h-5"
          />
        );
      default:
        return null;
    }
  };

  const displayName = node.name.toUpperCase();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNodeClick?.(node);
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <div 
        className={`
          flex items-center h-10 cursor-pointer
          hover:bg-slate-50 transition-colors
          ${node.status === 'alert' ? 'border-l-2 border-red-500' : ''}
          ${node.type === 'component' ? 'hover:bg-[#2188FF]/5' : ''}
        `}
        style={{ 
          paddingLeft: `${level * 24}px`,
          marginLeft: level === 0 ? '12px' : '0'
        }}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          {node.children && node.children.length > 0 && (
            <span 
              className={`
                text-xs text-[#2188FF] font-bold
                transition-transform duration-200 inline-block
                ${isExpanded ? '' : '-rotate-90'}
                w-4 h-4 flex items-center justify-center
              `}
              onClick={handleExpandClick}
            >
              {isExpanded ? '∧' : '∨'}
            </span>
          )}
          {!node.children?.length && level > 0 && (
            <span className="w-4"></span>
          )}
          
          <div className="flex items-center gap-2">
            {getNodeIcon()}
            <span className="text-[14px] text-[#24292F] font-medium whitespace-nowrap">
              {displayName}
            </span>
            
            {node.sensorType === 'energy' && (
              <span className="text-[#2188FF]">⚡</span>
            )}
            
            {node.status === 'alert' && (
              <span className="w-2 h-2 rounded-full bg-red-500"/>
            )}
            {node.status === 'operating' && node.type === 'component' && (
              <span className="w-2 h-2 rounded-full bg-green-500"/>
            )}
          </div>
        </div>
      </div>

      {isExpanded && node.children && node.children.length > 0 && (
        <div>
          {node.children.map((child, index) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              isLastChild={index === node.children!.length - 1}
              onNodeClick={onNodeClick}
              forceExpanded={forceExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};