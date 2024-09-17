import {create} from 'zustand';

export const useEvaluatorStore = create((set) => ({
  selectedQuestion: '',
  selectedButton: '',


  setSelectedQuestion: (question) => set({ selectedQuestion: question }),
  
  setSelectedButton: (button) => set({ selectedButton: button }),
}));

