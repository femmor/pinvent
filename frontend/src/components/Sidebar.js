import '../styles/Sidebar.scss';
import SidebarItem from './SidebarItem';
import { RiProductHuntLine } from 'react-icons/ri';
import { HiMenuAlt3 } from 'react-icons/hi';

import menu from '../data/sidebar';
import { useState } from 'react';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="layout">
      <div
        className="sidebar"
        style={{
          width: isOpen ? '230px' : '60px',
        }}
      >
        <div className="top_section">
          <div
            className="logo"
            style={{
              display: isOpen ? 'block' : 'none',
            }}
          >
            <RiProductHuntLine
              style={{
                cursor: 'pointer',
              }}
              size={35}
            />
          </div>
          <div
            className="bars"
            style={{
              marginLeft: isOpen ? '100px' : '0',
            }}
          >
            <HiMenuAlt3
              onClick={toggle}
              style={{
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;
