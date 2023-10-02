import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
  variable: '--font-family-primary',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Roboto',
    'Ubuntu',
    'Open Sans',
    'sans-serif',
  ],
});
