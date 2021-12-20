import { FunctionComponent } from 'react';

import MainNavigation from "./MainNavigation";

interface Props {};

const Layout : FunctionComponent<Props> = (props) => {
  return (
    <>
      <MainNavigation />
      <main className="m-3 mt-1">{props.children}</main>
    </>
  );
}

export default Layout;
