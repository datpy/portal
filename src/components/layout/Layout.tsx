import { FunctionComponent } from 'react';

import MainNavigation from "./MainNavigation";

import classes from "./Layout.module.css";

interface Props {};

const Layout : FunctionComponent<Props> = (props) => {
  return (
    <div className={classes.layout}>
      <MainNavigation className={classes["main-navigation"]} />
      <main className="m-3 mt-1 flex-grow flex-shrink flex">{props.children}</main>
    </div>
  );
}

export default Layout;
