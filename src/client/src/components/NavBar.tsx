import LogButton from './LogButton';
import { useLocation, Link, useHistory } from 'react-router-dom';
import '../styles/NavBar.css';
import { MouseEventHandler } from 'react';

const NavBar = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  console.log(history);

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <nav>
      <Link to='/'>Home</Link>
      {/\/board\/.+/.test(pathname) && <Link to='/metrics'>Metrics</Link>}
      {pathname === '/metrics' && (
        <a href='/board' onClick={handleClick}>
          Board
        </a>
      )}
      <LogButton />
    </nav>
  );
};

export default NavBar;
