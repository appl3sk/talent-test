
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  isDark?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, onBack, isDark }) => {
  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} transition-colors duration-300`}>
      <header className={`sticky top-0 z-50 px-4 py-4 flex items-center justify-between border-b ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-bold tracking-tight">
            {title || <span className="text-gradient">MindTalent</span>}
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
          U
        </div>
      </header>
      <main className="flex-1 max-w-2xl mx-auto w-full p-4 pb-24">
        {children}
      </main>
    </div>
  );
};

export default Layout;
