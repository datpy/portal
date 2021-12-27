import React from "react";
import { Link } from 'react-router-dom';

import logo from '../../img/logo.png';

interface Props {
  className?: string;
};

const MainNavigation: React.FunctionComponent<Props> = (props) => {
  return (
    <header className={`${props.className} bg-gray-700`}>
      <nav className="flex border-b-2 border-gray-100 py-1 h-full">
        <Link to="/" className="flex justify-start ml-2">
          <span className="sr-only">Inicio</span>
          <img src={logo} alt="Logo" />
        </Link>
      </nav>
    </header>
  );
};

export default MainNavigation;
