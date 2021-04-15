import LogButton from './LogButton';
import { useLocation, Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <nav>
      <Link to='/'>Home</Link>
      {/\/board\/.+/.test(pathname) && <Link to='/metrics'>Metrics</Link>}
      <LogButton />
    </nav>
  );
};

export default NavBar;
