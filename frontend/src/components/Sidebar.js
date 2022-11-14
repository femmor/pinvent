import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import { RiProductHuntLine, HiMenuAlt3 } from '../utils/icons';

import menu from '../data/sidebar';
import '../styles/Sidebar.scss';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

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
              onClick={goHome}
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
        {menu.map((item, index) => (
          <SidebarItem key={index} item={item} isOpen={isOpen} />
        ))}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? '230px' : '60px',
          transition: 'all 0.5s',
        }}
      >
        {children}
      </main>
    </div>
  );
};
export default Sidebar;
