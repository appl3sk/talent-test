
import { TestResult, UserStats } from '../types';

const KEYS = {
  RESULTS: 'mindtalent_results',
  STATS: 'mindtalent_stats',
  PREMIUM: 'mindtalent_is_premium',
  DEVICE_ID: 'mindtalent_device_id'
};

export const storageService = {
  getDeviceId: (): string => {
    let id = localStorage.getItem(KEYS.DEVICE_ID);
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(KEYS.DEVICE_ID, id);
    }
    return id;
  },

  saveResult: (result: TestResult) => {
    const results = storageService.getResults();
    results.push(result);
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(results));
    
    // Update stats
    const stats = storageService.getStats();
    stats.completedTests += 1;
    stats.lastTestDate = Date.now();
    localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
  },

  getResults: (): TestResult[] => {
    const data = localStorage.getItem(KEYS.RESULTS);
    return data ? JSON.parse(data) : [];
  },

  getStats: (): UserStats => {
    const data = localStorage.getItem(KEYS.STATS);
    return data ? JSON.parse(data) : { completedTests: 0, unlockedReports: 0, lastTestDate: null };
  },

  isPremium: (): boolean => {
    return localStorage.getItem(KEYS.PREMIUM) === 'true';
  },

  setPremium: (status: boolean) => {
    localStorage.setItem(KEYS.PREMIUM, status.toString());
    if (status) {
      const stats = storageService.getStats();
      stats.unlockedReports += 10; // Simple simulation
      localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
    }
  }
};
