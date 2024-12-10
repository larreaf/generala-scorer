import Users from "../User";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
   <div>
    <Users/>
    {children}
   </div>
  );
};

export default Layout;
