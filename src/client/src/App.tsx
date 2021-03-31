import React, { useState } from 'react';
import logo from './logo.svg';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import Board from './components/Board';
import CreateBoardModal from './components/CreateBoardModal';

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
            <CreateBoardModal setBoardId={setBoardId} />
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
