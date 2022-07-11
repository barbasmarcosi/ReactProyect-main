import React from 'react';
import { MainProvider } from '../components/generalComponents/MainContext/index';
import { AppUI } from './AppUI';

function App() {
  return (
    <MainProvider>
      <AppUI />
    </MainProvider>
  );
}

export default App;
