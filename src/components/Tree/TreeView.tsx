import React, { useState, useMemo } from 'react';
import { TreeNode } from './TreeNode';
import { FilterBar } from '../Filters/FilterBar';
import { filterTree } from '../../utils/filterTree';
import { Filters } from '../../types/Filters';
import { TreeBuilder } from '../../utils/TreeBuilder';
import { ComponentDetails } from '../ComponentDetails/ComponentDetails';

interface TreeViewProps {
  data: {
    locations: any[];
    assets: any[];
  };
  companyInfo?: {
    totalAssets: number;
    totalComponents: number;
  };
}

export const TreeView: React.FC<TreeViewProps> = ({ data, companyInfo }) => {
  const [filters, setFilters] = useState<Filters>({
    searchText: '',
    energySensors: false,
    criticalStatus: false
  });

  const [selectedComponent, setSelectedComponent] = useState<TreeNode | null>(null);

  const handleNodeClick = (node: TreeNode) => {
    if (node.type === 'component') {
      setSelectedComponent(node);
    }
  };

  const treeData = useMemo(() => {
    const treeBuilder = new TreeBuilder(data);
    return treeBuilder.build();
  }, [data]);

  const filteredData = useMemo(() => {
    const { filteredNodes } = filterTree(treeData, filters);
    return filteredNodes;
  }, [treeData, filters]);

  if (!data.locations && !data.assets) {
    return <div>Nenhum dado disponível</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium text-[#24292F]">Ativos</h1>
          <span className="text-slate-400">/</span>
          <span className="text-slate-400">Jaguar</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className={`flex items-center gap-2 px-3 py-1.5 text-sm ${
              filters.energySensors 
                ? 'bg-[#2188FF] text-white' 
                : 'text-[#2188FF] hover:bg-[#2188FF]/5'
            } rounded-md transition-colors`}
            onClick={() => setFilters(prev => ({ 
              ...prev, 
              energySensors: !prev.energySensors 
            }))}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sensor de Energia
          </button>
          <button 
            className={`flex items-center gap-2 px-3 py-1.5 text-sm ${
              filters.criticalStatus 
                ? 'bg-[#2188FF] text-white' 
                : 'text-[#2188FF] hover:bg-[#2188FF]/5'
            } rounded-md transition-colors`}
            onClick={() => setFilters(prev => ({ 
              ...prev, 
              criticalStatus: !prev.criticalStatus 
            }))}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Crítico
          </button>
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        <div className="w-[400px] bg-white rounded-lg border border-slate-200 flex flex-col max-h-[calc(100vh-180px)]">
          <div className="flex-none px-4 py-4 border-b border-slate-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar Ativo ou Local"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 
                  focus:border-[#2188FF] focus:ring-2 focus:ring-[#2188FF]/20 
                  transition-all text-[14px] placeholder-slate-400"
                value={filters.searchText}
                onChange={(e) => setFilters(prev => ({ ...prev, searchText: e.target.value }))}
              />
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="py-2">
              {filteredData.length > 0 ? (
                filteredData.map((node, index) => (
                  <TreeNode
                    key={node.id}
                    node={node}
                    level={0}
                    isLastChild={index === filteredData.length - 1}
                    onNodeClick={handleNodeClick}
                  />
                ))
              ) : (
                <div className="text-center text-slate-500 py-8">
                  Nenhum resultado encontrado para os filtros selecionados
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-lg border border-slate-200 h-[calc(100vh-180px)]">
          {selectedComponent ? (
            <ComponentDetails component={selectedComponent} />
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              Selecione um componente para ver seus detalhes
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 