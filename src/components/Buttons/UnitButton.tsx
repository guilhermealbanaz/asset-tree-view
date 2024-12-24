import React from 'react';

interface UnitButtonProps {
  companyId: string;
  label: string;
  isSelected: boolean;
  onClick: (companyId: string) => void;
}

export const UnitButton: React.FC<UnitButtonProps> = ({
  companyId,
  label,
  isSelected,
  onClick
}) => {
  return (
    <button 
      onClick={() => onClick(companyId)}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${isSelected 
          ? 'bg-[#1d4ed8] text-white hover:bg-[#1e40af]' 
          : 'bg-[#2d2535] text-white hover:bg-[#3d3545]'
        }
      `}
    >
      <img 
        src="./assets/Vector.png" 
        alt="Barra de ouro" 
        className="w-4 h-3.5"
      />
      <span className="text-white">{label + ' Unit'}</span>
    </button>
  );
}; 