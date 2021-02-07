import {
  extendTheme,
} from '@chakra-ui/react';

const colors = {
  custom: {
    brand: '#00cc7e',
    primary: '#f5f5f5',
    secondary: '#666',
    dark: '#141414',
    medium: '#333333',
    background: '#141414',
    alternativeBackground: '#1f1f1f',
  },
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Inter, sans-serif',
        color: '#f5f5f5',
        backgroundColor: '#1f1f1f',
      },
    },
  },
  colors,
});

export default theme;
