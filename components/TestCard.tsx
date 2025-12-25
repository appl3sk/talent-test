
import React from 'react';
import { TestModule } from '../types';

interface TestCardProps {
  module: TestModule;
  onClick: () => void;
  isDark: boolean;
}

const TestCard: React.FC<TestCardProps> = ({ module, onClick, isDark }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden group p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-xl ${
        isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-4xl">{module.icon}</div>
        {module.isPremium && (
          <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Premium
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{module.title}</h3>
      <p className={`text-sm line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {module.description}
      </p>
      
      <div className="mt-6 flex items-center text-sm font-semibold text-blue-500 group-hover:gap-2 transition-all">
        开始测试
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-bl-full pointer-events-none" />
    </div>
  );
};

export default TestCard;
