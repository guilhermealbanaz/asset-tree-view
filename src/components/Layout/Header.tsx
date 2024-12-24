import React from 'react';
import { UnitButton } from '../Buttons/UnitButton';

interface Company {
  id: string;
  name: string;
}

interface HeaderProps {
  selectedCompany: string;
  companies: Company[];
  onCompanyChange?: (companyId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  selectedCompany,
  companies,
  onCompanyChange 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-[#1f1a24] text-white h-16 px-8 flex items-center justify-between z-50">
      <div className="flex items-center h-full py-4">
        <img 
          src="./assets/logo.png" 
          alt="Tractian" 
          className="h-5"
        />
      </div>

      <div className="flex items-center gap-4">
        {companies.map(company => (
          <UnitButton
            key={company.id}
            companyId={company.id}
            label={company.name}
            isSelected={selectedCompany === company.id}
            onClick={onCompanyChange || (() => {})}
          />
        ))}
      </div>
    </header>
  );
};