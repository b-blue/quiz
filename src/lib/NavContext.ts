import { createContext } from 'react';

export interface Nav {
  openHub: () => void;
  openQuiz: (mode: 'aws' | 'saa') => void;
  openStudy: () => void;
}

export const NavContext = createContext<Nav>({ openHub: () => {}, openQuiz: () => {}, openStudy: () => {} });
