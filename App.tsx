
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TestCard from './components/TestCard';
import ResultView from './components/ResultView';
import { TEST_MODULES } from './constants';
import { TestCategory, TestModule, TestResult, UserStats } from './types';
import { storageService } from './services/storageService';
import { geminiService } from './services/geminiService';
import { paymentService } from './services/paymentService';

enum Screen {
  HOME,
  TESTING,
  RESULT,
  PAYING
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [selectedModule, setSelectedModule] = useState<TestModule | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [isPremium, setIsPremium] = useState(storageService.isPremium());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>(storageService.getStats());

  useEffect(() => {
    setUserStats(storageService.getStats());
  }, []);

  const handleStartTest = (module: TestModule) => {
    if (module.isPremium && !isPremium) {
      if (confirm("此测评为高级版独有。是否前往解锁全部测评？")) {
        handleUpgrade();
      }
      return;
    }
    setSelectedModule(module);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentScreen(Screen.TESTING);
  };

  const handleAnswer = async (optionId: string) => {
    if (!selectedModule) return;
    const newAnswers = { ...answers, [selectedModule.questions[currentQuestionIndex].id]: optionId };
    setAnswers(newAnswers);

    if (currentQuestionIndex < selectedModule.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen(Screen.RESULT);
      setIsAnalyzing(true);
      
      const scores: Record<string, number> = {};
      selectedModule.questions.forEach(q => {
        const selectedOption = q.options.find(o => o.id === newAnswers[q.id]);
        if (selectedOption?.weight) {
          Object.entries(selectedOption.weight).forEach(([trait, val]) => {
            scores[trait] = (scores[trait] || 0) + (val as number);
          });
        }
      });

      try {
        const analysis = await geminiService.analyzeResult(selectedModule.id, scores);
        const newResult: TestResult = {
          id: Math.random().toString(36).substr(2, 9),
          categoryId: selectedModule.id,
          timestamp: Date.now(),
          scores,
          analysis,
          isUnlocked: isPremium
        };
        storageService.saveResult(newResult);
        setLastResult(newResult);
        setUserStats(storageService.getStats());
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleUpgrade = async () => {
    setCurrentScreen(Screen.PAYING);
    // 模拟跳转支付逻辑
    const success = await paymentService.purchasePremium();
    if (success) {
      storageService.setPremium(true);
      setIsPremium(true);
      if (lastResult) setLastResult({ ...lastResult, isUnlocked: true });
      setCurrentScreen(lastResult ? Screen.RESULT : Screen.HOME);
    } else {
      alert("支付未完成或已被取消");
      setCurrentScreen(lastResult ? Screen.RESULT : Screen.HOME);
    }
  };

  const renderHomeScreen = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section className="text-center pt-8 pb-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mb-4">
          ✨ AI 驱动的科学天赋测评
        </div>
        <h2 className="text-4xl font-black mb-3 tracking-tight">探索你的无限潜能</h2>
        <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
          基于大数据与大模型分析，为您提供专家级的性格深度报告与成长建议。
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEST_MODULES.map(module => (
          <TestCard key={module.id} module={module} isDark={isDarkMode} onClick={() => handleStartTest(module)} />
        ))}
      </div>

      <section className={`p-6 rounded-3xl ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white shadow-xl shadow-slate-200/50 border border-slate-100'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              云端同步已就绪
            </h4>
            <p className="text-[10px] text-slate-500 font-medium mt-1">设备识别码: {storageService.getDeviceId()}</p>
          </div>
          {!isPremium && (
            <button 
              onClick={handleUpgrade}
              className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all"
            >
              升级高级版
            </button>
          )}
        </div>
      </section>
    </div>
  );

  if (currentScreen === Screen.PAYING) {
    return (
      <Layout isDark={isDarkMode}>
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-blue-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🔒</div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black">正在连接安全支付网关</h2>
            <p className="text-slate-500 text-sm">正在为您加密传输订单信息，请稍候...</p>
          </div>
          <div className="flex items-center gap-4 opacity-40 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      onBack={currentScreen !== Screen.HOME ? () => setCurrentScreen(Screen.HOME) : undefined}
      isDark={isDarkMode}
    >
      <div className="fixed top-4 right-4 z-[60] flex items-center gap-2">
         <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2.5 rounded-2xl backdrop-blur-md shadow-lg border transition-all ${isDarkMode ? 'bg-slate-800/80 border-slate-700 text-amber-400' : 'bg-white/80 border-slate-200 text-slate-400'}`}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </div>

      {currentScreen === Screen.HOME && renderHomeScreen()}
      
      {currentScreen === Screen.TESTING && selectedModule && (
        <div className="flex flex-col h-[75vh] justify-center space-y-10">
           <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1 block">深度测评进行中</span>
                <h3 className="text-lg font-bold">{selectedModule.title}</h3>
              </div>
              <span className="text-sm font-black text-slate-400">{currentQuestionIndex + 1} <span className="text-[10px] opacity-50">/ {selectedModule.questions.length}</span></span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full gradient-primary transition-all duration-500 ease-out" style={{ width: `${((currentQuestionIndex + 1) / selectedModule.questions.length) * 100}%` }} />
            </div>
          </div>
          <h2 className="text-3xl font-black text-center px-4 leading-tight tracking-tight min-h-[120px] flex items-center justify-center">
            {selectedModule.questions[currentQuestionIndex].text}
          </h2>
          <div className="space-y-3">
            {selectedModule.questions[currentQuestionIndex].options.map(opt => (
              <button 
                key={opt.id} 
                onClick={() => handleAnswer(opt.id)} 
                className={`w-full p-6 rounded-3xl text-left font-bold border-2 transition-all active:scale-[0.98] hover:scale-[1.01] ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 hover:border-blue-500 hover:bg-slate-700' 
                    : 'bg-white border-slate-100 shadow-sm hover:border-blue-500 hover:shadow-xl'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center text-xs opacity-50">
                    {opt.id.toUpperCase()}
                  </div>
                  {opt.text}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentScreen === Screen.RESULT && (
        isAnalyzing ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
            <div className="relative">
               <div className="text-6xl animate-pulse relative z-10">🧩</div>
               <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black italic">AI 正在深度解码您的心理能量...</h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">我们正在根据您的回答，在 2,000,000+ 匿名样本中匹配最接近的人格模型。</p>
            </div>
            <div className="w-48 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 animate-[loading_2s_infinite]"></div>
            </div>
          </div>
        ) : (
          lastResult && <ResultView result={lastResult} isDark={isDarkMode} isPremium={isPremium} onUpgrade={handleUpgrade} />
        )
      )}
    </Layout>
  );
};

// Add CSS keyframe for loading bar
const style = document.createElement('style');
style.textContent = `
  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
document.head.appendChild(style);

export default App;
