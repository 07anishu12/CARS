export type Theme = 'light' | 'dark' | 'luxury';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
