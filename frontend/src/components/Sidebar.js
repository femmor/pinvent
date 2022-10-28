import '../styles/Sidebar.scss';
import SidebarItem from './SidebarItem';

const Sidebar = ({ children }) => {
  return (
    <div className="layout">
      <div className="sidebar">
        <h2>Sidebar</h2>
        <SidebarItem />
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;
