import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import Board from './components/Board';
import LogIn from './components/LogIn';
import SelectOrCreate from './components/SelectOrCreate';
import { useIsAuth } from './hooks/useAuth';
import { Switch, Route, useHistory } from 'react-router-dom';
import NavBar from './components/NavBar';
import CreateBoardModal from './components/CreateBoardModal';
import SelectBoard from './components/SelectBoard';
import Metrics from './components/Metrics';

function App() {
  const { isError } = useIsAuth();
  const history = useHistory();

  // if (isError) return <LogIn />;

  return (
    <div className='App'>
      <header>
        <NavBar />
      </header>
      <Switch>
        <div>
          <Route exact path='/' component={SelectOrCreate} />
          <Route path='/board/:boardId' component={Board} />
          <Route path='/login' component={LogIn} />
          <Route path='/create' component={CreateBoardModal} />
          <Route path='/select' component={SelectBoard} />
          <Route path='/metrics' component={Metrics} />
        </div>
      </Switch>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </div>
  );
}

export default App;
