import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import Board from './components/Board';
import LogIn from './components/LogIn';
import SelectOrCreate from './components/SelectOrCreate';
import { useIsAuth } from './hooks/useAuth';
import { Switch, Route, useHistory } from 'react-router-dom';

function App() {
  const [boardId, setBoardId] = useState('');
  const { isError } = useIsAuth();
  const history = useHistory();

  useEffect(() => {
    if (boardId) {
      history.push('/board');
    }
  }, [boardId, history]);

  // if (isError) return <LogIn />;

  return (
    <>
      <Switch>
        <div className='App'>
          <Route exact path='/'>
            <SelectOrCreate setBoardId={setBoardId} />
          </Route>
          <Route path='/board'>
            <Board boardId={boardId} />
          </Route>
        </div>
      </Switch>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}

export default App;
