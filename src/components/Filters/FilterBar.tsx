import React from 'react';

interface FilterBarProps {
  filters: {
    searchText: string;
    energySensors: boolean;
    criticalStatus: boolean;
  };
  onFilterChange: (filters: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Buscar..."
        value={filters.searchText}
        onChange={(e) => onFilterChange({ ...filters, searchText: e.target.value })}
        className="
          flex-1 min-w-[200px] px-4 py-2 rounded-lg
          border border-slate-300 focus:border-blue-500
          focus:ring-2 focus:ring-blue-200 outline-none
          transition-all
        "
      />
      
      <label className="flex items-center gap-2 text-slate-700">
        <input
          type="checkbox"
          checked={filters.energySensors}
          onChange={(e) => onFilterChange({ ...filters, energySensors: e.target.checked })}
          className="
            w-4 h-4 rounded border-slate-300
            text-blue-600 focus:ring-blue-500
          "
        />
        Sensores de Energia
      </label>

      <label className="flex items-center gap-2 text-slate-700">
        <input
          type="checkbox"
          checked={filters.criticalStatus}
          onChange={(e) => onFilterChange({ ...filters, criticalStatus: e.target.checked })}
          className="
            w-4 h-4 rounded border-slate-300
            text-blue-600 focus:ring-blue-500
          "
        />
        Status Crítico
      </label>
    </div>
  );
}; 