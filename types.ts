export const themes = {
  default: 'Padrão',
  sky: 'Céu',
  mint: 'Menta',
  rose: 'Rosa',
  amber: 'Âmbar',
} as const;

export type ThemeKey = keyof typeof themes;

export interface CountdownEvent {
  id: string;
  title: string;
  emoji: string;
  targetDate: string; // ISO 8601 format
  createdAt: string; // ISO 8601 format
  theme: ThemeKey;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
