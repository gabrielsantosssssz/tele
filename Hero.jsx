import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-[#0A0E17] text-white py-20 px-4 min-h-screen flex items-center">
      {/* Background SVG Circuit Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="none"/>
              <circle cx="50" cy="50" r="2" fill="#00D4FF"/>
              <line x1="50" y1="50" x2="100" y2="50" stroke="#00D4FF" strokeWidth="1"/>
              <line x1="50" y1="50" x2="50" y2="0" stroke="#00D4FF" strokeWidth="1"/>
              <line x1="50" y1="50" x2="0" y2="50" stroke="#00D4FF" strokeWidth="1"/>
              <line x1="50" y1="50" x2="50" y2="100" stroke="#00D4FF" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#00D4FF] leading-tight">
          Pare de apenas estudar tecnologia. Comece a construir soluções reais.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          No ID Labs, transformamos conhecimento em ação. Junte-se a nós e seja parte de projetos que impactam o mundo.
        </p>
        <button className="bg-[#FF6B00] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#e55a00] transition-colors">
          Comece Agora
        </button>
      </div>
    </section>
  );
};

export default Hero;