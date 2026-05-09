import React from 'react';
import { BookOpen, Users, Lightbulb, Target } from 'lucide-react';

const Mindset = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#00D4FF]">Mindset ID Labs</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-900 p-8 rounded-lg border border-red-700">
            <h3 className="text-2xl font-semibold mb-4 text-red-400 flex items-center">
              <BookOpen className="mr-2" /> O que NÃO somos
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Aulas teóricas intermináveis
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Foco apenas em teoria
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Aprendizado passivo
              </li>
            </ul>
          </div>
          <div className="bg-green-900 p-8 rounded-lg border border-green-700">
            <h3 className="text-2xl font-semibold mb-4 text-green-400 flex items-center">
              <Users className="mr-2" /> O que SOMOS
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Projetos reais e práticos
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Trabalho em squads colaborativas
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Construção de soluções concretas
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mindset;