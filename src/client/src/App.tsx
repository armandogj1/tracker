import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import Board from './components/Board';
import SelectOrCreate from './components/SelectOrCreate';

const queryClient = new QueryClient();

function App() {
  const [boardId, setBoardId] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <header className='App-header'>
          {boardId ? (
            <Board boardId={boardId} />
          ) : (
            <SelectOrCreate setBoardId={setBoardId} />
          )}
        </header>
      </div>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
