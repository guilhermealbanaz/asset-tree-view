import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Layout/Header';
import { TreeView } from './components/Tree/TreeView';
import { api } from './services/api';

interface Asset {
  id: string;
  name: string;
  type: string;
  status?: 'operating' | 'alert';
  children?: Asset[];
}

interface Company {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initializeRef = useRef(false);

  useEffect(() => {
    const initializeApp = async () => {
      if (initializeRef.current) return;
      initializeRef.current = true;

      try {
        setIsLoading(true);
        const fetchedCompanies = await api.getCompanies();
        setCompanies(fetchedCompanies);
        if (fetchedCompanies.length > 0) {
          setSelectedCompany(fetchedCompanies[0].id);
        }
      } catch (err) {
        setError('Erro ao carregar empresas');
        console.error('Erro:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCompany) return;

      try {
        setIsLoading(true);
        const [assetsResponse, locationsResponse] = await Promise.all([
          api.getAssets(selectedCompany),
          api.getLocations(selectedCompany)
        ]);
        
        setAssets(Array.isArray(assetsResponse) ? assetsResponse : []);
        setLocations(Array.isArray(locationsResponse) ? locationsResponse : []);
      } catch (err) {
        setError('Erro ao carregar os dados');
        console.error('Erro:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCompany]);

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  if (isLoading && companies.length === 0) {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <Header 
          selectedCompany={selectedCompany} 
          onCompanyChange={handleCompanyChange}
          companies={[]}
        />
        <main className="flex-1 bg-white pt-12 flex items-center justify-center overflow-hidden">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <Header 
          selectedCompany={selectedCompany} 
          onCompanyChange={handleCompanyChange}
          companies={companies}
        />
        <main className="flex-1 bg-white pt-12 flex items-center justify-center overflow-hidden">
          <div className="text-red-500">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1E1E1E] overflow-hidden">
      <Header 
        selectedCompany={selectedCompany} 
        onCompanyChange={handleCompanyChange}
        companies={companies}
      />
      
      <main className="flex-1 bg-[#F6F8FA] p-4 mt-[72px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <TreeView 
            data={{
              locations,
              assets
            }}
            companyInfo={{
              totalAssets: assets.length,
              totalComponents: assets.reduce((total, item) => {
                const countComponents = (items: Asset[]): number => {
                  return items.reduce((acc, curr) => {
                    const childrenCount = curr.children ? countComponents(curr.children) : 0;
                    return acc + childrenCount + (curr.type === 'component' ? 1 : 0);
                  }, 0);
                };
                return total + countComponents([item]);
              }, 0)
            }}
            companyName={companies.find(company => company.id === selectedCompany)?.name || ''}
          />
        )}
      </main>
    </div>
  );
};

export default App;