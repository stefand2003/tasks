import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import Task from './components/Task';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Task />
      </div>
    </>
  );
}

export default App;
