import LogButton from './LogButton';
import { useLocation, Link, useHistory } from 'react-router-dom';
import '../styles/NavBar.css';
import { MouseEventHandler } from 'react';

const NavBar = () => {
  const { pathname } = useLocation();
  const [boardId] = pathname.split('/').slice(-1);
  const history = useHistory();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <nav>
      <Link to='/'>Home</Link>
      {/\/board\/.+/.test(pathname) && <Link to={`/metrics/${boardId}`}>Metrics</Link>}
      {/\/metrics\/.+/.test(pathname) && (
        <a href={`/board/${boardId}`} onClick={handleClick}>
          Board
        </a>
      )}
      <LogButton />
    </nav>
  );
};

export default NavBar;
