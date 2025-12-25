
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, RadarProps } from 'recharts';
import { TestResult } from '../types';

interface ResultViewProps {
  result: TestResult;
  isDark: boolean;
  onUpgrade: () => void;
  isPremium: boolean;
}

const ResultView: React.FC<ResultViewProps> = ({ result, isDark, onUpgrade, isPremium }) => {
  const chartData = Object.entries(result.scores).map(([name, value]) => ({
    name: name.length > 5 ? name.substring(0, 5) + '...' : name,
    value: Math.abs((value as number)) * 10
  }));

  const analysisParts = result.analysis.split('###').filter(p => p.trim().length > 0);
  const freeSummary = analysisParts[0] || "正在生成您的核心人格画像...";
  const premiumContent = analysisParts.slice(1).join('\n\n');

  // Identify a potential 'Superpower' trait from scores for the teaser
  const highestTrait = Object.entries(result.scores).reduce((a, b) => a[1] > b[1] ? a : b);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Visual Identity Header */}
      <div className={`p-8 rounded-[2rem] text-center relative overflow-hidden transition-all ${isDark ? 'bg-slate-800 border border-slate-700 shadow-2xl' : 'bg-white shadow-2xl shadow-blue-500/10 border border-slate-50'}`}>
        <div className="absolute top-6 left-6 flex items-center gap-1 opacity-70">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Validated Session</span>
        </div>
        
        <h2 className="text-2xl font-black mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">维度能量图谱</h2>
        <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-xs font-medium mb-6`}>
          由 MindTalent AI 核心算法引擎计算得出
        </p>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke={isDark ? "#334155" : "#e2e8f0"} strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="name" tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 11, fontWeight: 600 }} />
              <Radar
                name="维度强度"
                dataKey="value"
                stroke="#4A90E2"
                fill="url(#radarGradient)"
                fillOpacity={0.6}
              />
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9B59B6" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
           {chartData.slice(0, 3).map((d, i) => (
             <div key={i} className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-xs font-bold text-slate-400 mb-1">{d.name}</div>
                <div className="text-lg font-black text-blue-500">{Math.round(d.value)}%</div>
             </div>
           ))}
        </div>
      </div>

      {/* Free Profile Section - High Value */}
      <div className={`p-8 rounded-[2rem] border transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-black italic">人格原力画像</h3>
              <p className="text-xs text-blue-500 font-bold tracking-tighter uppercase">Comprehensive Profile • Free Access</p>
            </div>
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
          <div dangerouslySetInnerHTML={{ __html: freeSummary.replace(/\n/g, '<br/>') }} />
        </div>
      </div>

      {/* Premium Teaser - High Conversion */}
      <div className={`group relative p-8 rounded-[2rem] overflow-hidden transition-all ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100 shadow-2xl shadow-purple-500/10'}`}>
        {!isPremium && !result.isUnlocked ? (
          <>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-lg uppercase">Hidden Potential Alert</div>
                <h3 className="text-lg font-bold">深度研报解锁</h3>
              </div>

              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🎯</div>
                    <div>
                      <h4 className="font-black text-amber-400 mb-1">AI 洞察：罕见天赋发现</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        基于您的数据，我们在【{highestTrait[0]}】维度检测到了超出 94.3% 常模的潜能表现。这预示着您在特定高压环境中具备极其稀缺的领航者素质，但目前可能正处于某种能量错位中...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="blur-md opacity-30 select-none pointer-events-none">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-3"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-3"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button 
                  onClick={onUpgrade}
                  className="w-full gradient-primary text-white py-5 rounded-[1.5rem] font-black text-lg shadow-2xl shadow-purple-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>解锁完整深度研报 (¥19.9)</span>
                </button>
                <p className="mt-4 text-[10px] text-slate-400 font-medium">包含：21 天成长实操、职场天花板预测、深度盲点拆解</p>
              </div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
          </>
        ) : (
          <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
             <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-700 pb-6">
                <div className="w-14 h-14 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-500">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Premium 专家研报</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase">Personalized Growth Blueprint</p>
                </div>
             </div>
             <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-[1.8] text-lg">
                <div dangerouslySetInnerHTML={{ __html: premiumContent.replace(/\n/g, '<br/>') }} />
             </div>
          </div>
        )}
      </div>

      {/* Floating Action Buttons for UX */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md flex gap-3 p-2 rounded-[2rem] backdrop-blur-xl border z-50 transition-all ${isDark ? 'bg-slate-900/80 border-slate-700 shadow-2xl' : 'bg-white/90 border-slate-200 shadow-2xl shadow-blue-500/20'}`}>
        <button className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-slate-900 text-white font-black text-sm active:scale-95 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          分享
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-blue-600 text-white font-black text-sm active:scale-95 transition-all shadow-lg shadow-blue-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          下载 PDF
        </button>
      </div>
    </div>
  );
};

export default ResultView;
