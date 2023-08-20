import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <NextUIProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NextUIProvider>
);

