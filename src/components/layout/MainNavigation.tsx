import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

const MainNavigation = () => {
  return (
    <header className="bg-gray-700">
      <nav className="flex border-b-2 border-gray-100 h-8 lg:flex-1 py-1">
        <Link to="/" className="flex justify-start ml-2">
          <span className="sr-only">Inicio</span>
          <img src={logo} alt="Logo" />
        </Link>
      </nav>
    </header>
  );
};

export default MainNavigation;
