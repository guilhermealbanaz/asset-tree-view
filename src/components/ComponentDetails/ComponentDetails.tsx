import React from 'react';
import { TreeNode } from '../../types/Tree';

interface ComponentDetailsProps {
  component: TreeNode;
}

export const ComponentDetails: React.FC<ComponentDetailsProps> = ({ component }) => {
  if (!component) return null;

  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <h1 className="text-xl font-bold text-[#24292F] mb-8">{component.name}</h1>
        
        <div className="flex items-start gap-8">
          <div className="w-[300px] h-[200px] bg-white rounded-lg overflow-hidden">
            <img 
              src="/assets/image-gear.png" 
              alt={component.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="mb-8 pb-8 border-b border-slate-200">
              <h2 className="text-sm font-medium text-[#24292F] mb-2">Tipo de Equipamento</h2>
              <p className="text-slate-600">Motor Elétrico (Trifásico)</p>
            </div>

            <div className="mb-8 pb-8 border-b border-slate-200">
              <h2 className="text-sm font-medium text-[#24292F] mb-2">Responsáveis</h2>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2188FF] text-white text-sm font-medium">
                  E
                </span>
                <span className="text-slate-600">Elétrica</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-sm font-medium text-[#24292F] mb-2">Sensor</h2>
                <div className="flex items-center gap-2">
                  <img 
                    src="/assets/wifi_tethering.png" 
                    alt="Sensor Icon" 
                    className="w-5 h-4"
                  />
                  <span className="text-slate-600">{component.sensorId}</span>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-[#24292F] mb-2">Receptor</h2>
                <div className="flex items-center gap-2">
                  <img 
                    src="/assets/root.png" 
                    alt="Receptor Icon" 
                    className="w-5 h-5"
                  />
                  <span className="text-slate-600">{component.gatewayId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
