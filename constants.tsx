
import React from 'react';
import { TestCategory, TestModule } from './types';

export const COLORS = {
  blue: '#4A90E2',
  purple: '#9B59B6',
  background: '#F5F5F5',
  darkText: '#333333',
};

// Standard Likert Scale options for professional psychological assessments
const LIKERT_5 = [
  { id: 'sa', text: '非常符合', weight: { score: 2.5 } },
  { id: 'a', text: '比较符合', weight: { score: 1.2 } },
  { id: 'n', text: '中立 / 不确定', weight: { score: 0 } },
  { id: 'd', text: '比较不符合', weight: { score: -1.2 } },
  { id: 'sd', text: '非常不符合', weight: { score: -2.5 } },
];

export const TEST_MODULES: TestModule[] = [
  {
    id: TestCategory.MBTI,
    title: 'MBTI 核心人格深度扫描',
    description: '采用 20 维心理动力学模型，深度锁定你的 16 种原生人格类型。',
    icon: '🧠',
    isPremium: false,
    questions: [
      { id: 'm-1', text: '在处理复杂任务时，你更倾向于依赖直觉预感而非过往经验。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { N: o.weight.score } })) },
      { id: 'm-2', text: '你发现自己在嘈杂的社交环境中会感到能量迅速流失。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { I: o.weight.score } })) },
      { id: 'm-3', text: '即使会伤害他人感情，你也会选择维护逻辑上的绝对正确。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { T: o.weight.score } })) },
      { id: 'm-4', text: '你习惯于将每天的行程精确到分钟，并从中获得掌控感。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { J: o.weight.score } })) },
      { id: 'm-5', text: '你经常能察觉到事物之间微妙的、未被他人注意的深层联系。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { N: o.weight.score } })) },
      { id: 'm-6', text: '在团队讨论中，你通常是那个率先打破沉默并引导方向的人。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { E: o.weight.score } })) },
      { id: 'm-7', text: '面对未知，你更喜欢即兴发挥，认为过早的计划是一种束缚。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { P: o.weight.score } })) },
      { id: 'm-8', text: '你极度关注物理世界的细节，如空气的味道、光线的明暗。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { S: o.weight.score } })) },
      { id: 'm-9', text: '你很容易受他人情绪的感染，甚至会因此改变自己的决策。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { F: o.weight.score } })) },
      { id: 'm-10', text: '你更看重理论的严谨性，而不是该理论是否具有即时的实用价值。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { N: o.weight.score } })) },
      { id: 'm-11', text: '在冲突中，你更关注事情的是非曲直，而非人际关系的和谐。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { T: o.weight.score } })) },
      { id: 'm-12', text: '如果环境杂乱无章，你会感到思维受限，无法专注工作。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { J: o.weight.score } })) },
      { id: 'm-13', text: '你认为“规则是用来打破的”，只要能达到更好的效果。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { P: o.weight.score } })) },
      { id: 'm-14', text: '在大型派对上，你更喜欢留在熟悉的小圈子里交谈。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { I: o.weight.score } })) },
      { id: 'm-15', text: '你倾向于相信眼见为实的数据，对各种宏大愿景持保留态度。', category: TestCategory.MBTI, options: LIKERT_5.map(o => ({ ...o, weight: { S: o.weight.score } })) }
    ]
  },
  {
    id: TestCategory.DISC,
    title: 'DISC 职场胜任力镜像',
    description: '通过行为风格一致性测试，洞察你的领导力、影响力与职业抗压底色。',
    icon: '📊',
    isPremium: true,
    questions: [
      { id: 'd-1', text: '在面对竞争压力时，我会表现出极强的攻击性以确保胜利。', category: TestCategory.DISC, options: LIKERT_5.map(o => ({ ...o, weight: { Dominance: o.weight.score } })) },
      { id: 'd-2', text: '我擅长在团队中营造轻松愉快的氛围，并以此驱动协作。', category: TestCategory.DISC, options: LIKERT_5.map(o => ({ ...o, weight: { Influence: o.weight.score } })) },
      { id: 'd-3', text: '我倾向于在决策前征求所有人的同意，以维持团队的心理安全感。', category: TestCategory.DISC, options: LIKERT_5.map(o => ({ ...o, weight: { Steadiness: o.weight.score } })) },
      { id: 'd-4', text: '对于不确定的信息，我会拒绝做出任何结论，直到找到确凿证据。', category: TestCategory.DISC, options: LIKERT_5.map(o => ({ ...o, weight: { Compliance: o.weight.score } })) },
      { id: 'd-5', text: '我喜欢快节奏、结果导向的工作环境，讨厌琐碎的程序。', category: TestCategory.DISC, options: LIKERT_5.map(o => ({ ...o, weight: { Dominance: o.weight.score } })) },
      { id: 'd-6', text: '我能够敏锐地捕捉到他人的情感反馈，并据此调整沟通策略。', category: TestCategory.DISC, options: LIKERT_5.map(o => ({ ...o, weight: { Influence: o.weight.score } })) },
      { id: 'd-7', text: '我不喜欢任何形式的突发变动，更倾向于可预测的工作流程。', category: TestCategory.DISC, options: LIKERT_5.map(o => ({ ...o, weight: { Steadiness: o.weight.score } })) },
      { id: 'd-8', text: '在任务执行中，我对他人的标准非常苛刻，不能容忍哪怕 1% 的偏差。', category: TestCategory.DISC, options: LIKERT_5.map(o => ({ ...o, weight: { Compliance: o.weight.score } })) }
    ]
  },
  {
    id: TestCategory.LOGIC,
    title: '逻辑内核与计算潜能',
    description: '涵盖抽象代数推理、语义一致性分析与空间几何旋转测试。',
    icon: '💡',
    isPremium: true,
    questions: [
      {
        id: 'l-1',
        text: '如果所有的“水滴”都是“蓝色的”，且有些“蓝色的”是“透明的”。以下结论哪个在逻辑上是必然的？',
        category: TestCategory.LOGIC,
        options: [
          { id: 'a', text: '有些透明的是水滴', weight: { logical: 0 } },
          { id: 'b', text: '有些水滴是透明的', weight: { logical: 0 } },
          { id: 'c', text: '透明的可能是水滴', weight: { logical: 2 } },
          { id: 'd', text: '水滴不可能是透明的', weight: { logical: 0 } }
        ]
      },
      {
        id: 'l-2',
        text: '完成数列：1, 4, 9, 61, 52, 63, 94, (...)',
        category: TestCategory.LOGIC,
        options: [
          { id: 'a', text: '18 (平方数倒写)', weight: { logical: 2 } },
          { id: 'b', text: '121', weight: { logical: 0 } },
          { id: 'c', text: '46', weight: { logical: 0 } },
          { id: 'd', text: '105', weight: { logical: 0 } }
        ]
      }
    ]
  }
];
