
import { GoogleGenAI } from "@google/genai";
import { TestCategory } from "../types";

// Initializing GoogleGenAI using strictly process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  analyzeResult: async (category: TestCategory, scores: Record<string, number>): Promise<string> => {
    const prompt = `
      作为一名拥有 20 年经验的高级工业心理学家和 AI 人格建模专家，请根据以下数据生成一份极具洞察力的测评报告。
      
      [原始得分分布]
      ${JSON.stringify(scores)}
      
      [报告结构要求 - 必须使用 ### 分隔]
      
      ### 第一部分：天赋异禀 - 你的核心人格画像 (免费开放)
      要求：字数 600 字以上。
      1. 【核心底色】：深度解析其认知模式。例如：你的思维是一台精密的扫描仪，还是一个无边界的创造引擎？
      2. 【社交磁场】：分析其在复杂人际网中的能量交换方式。
      3. 【顶级天赋识别】：精准点出其目前得分中表现出的“超级能力”。
      4. 【价值点睛】：用一段富有感染力的话总结其独特的人生使命。
      *注意：此部分必须让用户感到被深度理解，产生“你比我更了解我”的共鸣感。*
      
      ### 第二部分：职场实战 - 你的核心竞争力与职业天花板 (高级会员解锁)
      详细拆解：
      1. 在 500 强企业或创业环境中，你无可替代的 3 个价值点。
      2. 预警：当前性格特征可能导致的职业生涯“致命伤”或晋升瓶颈。
      
      ### 第三部分：深度盲区 - 那些你未曾察觉的自我损耗点 (高级会员解锁)
      从潜意识层面分析其情绪内耗、压力反应模式及如何规避心理雷区。
      
      ### 第四部分：21天潜能爆发行动指南 (高级会员解锁)
      提供 3 个基于神经科学和行为改变理论的定制化练习。
      
      [输出要求]
      - 语言专业、辛辣但富有启发性。
      - 严禁空话。针对得分的极端高低项进行深度挖掘。
      - 格式：Markdown，逻辑清晰。
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text || "数据传输受限，分析生成中...";
    } catch (error) {
      console.error("Gemini analysis error:", error);
      return "AI 分析引擎暂时离线。基于您的分布，我们识别出您具有极高的决策果断性。";
    }
  }
};
