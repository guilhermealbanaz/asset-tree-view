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
        px-3 py-1.5 rounded-md text-base font-medium
        flex items-center gap-2 transition-colors
        ${isSelected 
          ? 'bg-[#2188FF]' 
          : 'bg-[#023B78] hover:bg-[#023B78]/90'
        }
      `}
    >
      <img 
        src="/assets/Vector.png" 
        alt="" 
        className="w-4.5 h-3.5"
      />
      <span className="text-white">{label + ' Unit'}</span>
    </button>
  );
}; 