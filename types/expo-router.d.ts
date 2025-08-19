import { LinkProps } from 'expo-router';

declare module 'expo-router' {
  interface LinkProps<T = string> {
    href: string | { pathname: string; params?: Record<string, any> };
  }
}
