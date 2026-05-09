import React from 'react';
import { User, Star, Trophy, Crown } from 'lucide-react';

const levels = [
  { name: 'Explorer', icon: User, description: 'Iniciante no mundo dos projetos' },
  { name: 'Desenvolvedor', icon: Star, description: 'Construindo primeiras soluções' },
  { name: 'Especialista', icon: Trophy, description: 'Liderando projetos complexos' },
  { name: 'Sócio Master', icon: Crown, description: 'Parceiro e mentor na comunidade' },
];

const Gamification = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#FF6B00]">Sistema de Gamificação</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          {levels.map((level, index) => {
            const Icon = level.icon;
            return (
              <div key={index} className="flex flex-col items-center mb-8 md:mb-0">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${index === levels.length - 1 ? 'bg-[#FF6B00]' : 'bg-gray-700'}`}>
                  <Icon size={32} color={index === levels.length - 1 ? '#0A0E17' : '#00D4FF'} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{level.name}</h3>
                <p className="text-sm text-gray-400 text-center max-w-32">{level.description}</p>
                {index < levels.length - 1 && (
                  <div className="hidden md:block w-16 h-1 bg-gray-700 mt-4"></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div className="bg-gradient-to-r from-[#00D4FF] to-[#FF6B00] h-4 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-gray-400 mt-2">Progressão atual: 75% até Sócio Master</p>
        </div>
      </div>
    </section>
  );
};

export default Gamification;