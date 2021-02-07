import {
  extendTheme,
} from '@chakra-ui/react';

const colors = {
  custom: {
    brand: '#00cc7e',
    primary: '#eeeeee',
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
        backgroundColor: '#141414',
        color: '#eeeeee',
      },
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'custom.brand',
          color: 'custom.primary',
        },
      },
    },
    Input: {
      variants: {
        primary: {
          field: {
            bg: 'custom.medium',
            border: 'none',
            color: 'custom.primary',
          },
        },
      },
    },
  },
  colors,
});

export default theme;
