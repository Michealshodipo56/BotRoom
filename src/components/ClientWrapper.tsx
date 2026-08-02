'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}