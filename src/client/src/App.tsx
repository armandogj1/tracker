import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import Board from './components/Board';
import LogInOrCreate from './components/LogInOrCreate';
import SelectOrCreate from './components/SelectOrCreate';
import { useIsAuth } from './hooks/useAuth';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CreateBoardModal from './components/CreateBoardModal';
import SelectBoard from './components/SelectBoard';
import Metrics from './components/Metrics';

function App() {
  useIsAuth();

  return (
    <div className='App'>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route exact path='/' component={SelectOrCreate} />
        <Route path='/board/:boardId' component={Board} />
        <Route path='/login' component={LogInOrCreate} />
        <Route path='/create' component={CreateBoardModal} />
        <Route path='/select' component={SelectBoard} />
        <Route path='/metrics/:boardId' component={Metrics} />
      </Switch>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </div>
  );
}

export default App;
