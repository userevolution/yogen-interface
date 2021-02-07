/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_NUCTER_ADDRESS: string;
    REACT_APP_WETH_ADDRESS: string;
  }
}
