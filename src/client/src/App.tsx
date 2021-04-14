import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import Board from './components/Board';
import LogIn from './components/LogIn';
import SelectOrCreate from './components/SelectOrCreate';
import { useIsAuth } from './hooks/useAuth';

function App() {
  const [boardId, setBoardId] = useState('');
  const { isError } = useIsAuth();

  if (isError) return <LogIn />;

  return (
    <>
      <div className='App'>
        {boardId ? (
          <Board boardId={boardId} />
        ) : (
          <SelectOrCreate setBoardId={setBoardId} />
        )}
      </div>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}

export default App;
