import React from 'react';
import { Brain, Cloud, Zap, Shield, Database, Smartphone, Cpu, Lock } from 'lucide-react';

const areas = [
  { name: 'Inteligência Artificial', icon: Brain, color: '#00D4FF' },
  { name: 'SaaS', icon: Cloud, color: '#FF6B00' },
  { name: 'Automação', icon: Zap, color: '#00D4FF' },
  { name: 'Cibersegurança', icon: Shield, color: '#FF6B00' },
  { name: 'Ciência de Dados', icon: Database, color: '#00D4FF' },
  { name: 'Apps Mobile', icon: Smartphone, color: '#FF6B00' },
  { name: 'IoT', icon: Cpu, color: '#00D4FF' },
  { name: 'Blockchain', icon: Lock, color: '#FF6B00' },
];

const Areas = () => {
  return (
    <section className="bg-[#0A0E17] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#00D4FF]">Áreas de Atuação</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer border border-gray-700 hover:border-[#00D4FF]">
                <Icon size={48} color={area.color} className="mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-center">{area.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Areas;