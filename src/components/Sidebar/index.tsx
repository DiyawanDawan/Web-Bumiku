import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/icon-72x72.png';
import { CgProfile } from "react-icons/cg";
import { BiSolidDashboard } from "react-icons/bi";
import { FaChartLine, FaTable } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import {jwtDecode} from 'jwt-decode';
import { CiSaveDown2 } from 'react-icons/ci';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface DecodedToken {
  role: string;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
      
      <NavLink to={userRole === 'admin' ? "/admin" : "/"} className="flex items-center">
          <span>
            <img
              src={userRole === 'admin' ? Logo : Logo}
              alt="Logo"
              className="rounded-sm w-9"
            />
          </span>
          <span className="ml-2">
            <h2 className="font-bold text-2xl text-white">
              {userRole === 'admin' ? 'Admin Panel' : 'Cinta Dunia'}
            </h2>
          </span>
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <FaLongArrowAltLeft size={30} className="text-slate-300 hover:text-indigo-300" />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {userRole === 'admin' ? (
                <li>
                  <NavLink
                    to="/admin"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:text-indigo-300 hover:border-b-2 hover:border-indigo-500 hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('admin') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <CgProfile size={20} />
                    Admin Panel
                  </NavLink>
                </li>
              ) : (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/' || pathname.includes('dashboard')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                              pathname.includes('dashboard')) &&
                            'bg-graydark dark:bg-meta-4'
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <BiSolidDashboard size={30} />
                          Dashboard
                        </NavLink>
                        <div
                          className={`translate transform overflow-hidden ${!open && 'hidden'
                            }`}
                        >
                          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-indigo-300 hover:border-b-2 hover:border-indigo-500 ' +
                                  (isActive && '!text-white')
                                }
                              >
                                <BiSolidDashboard size={20} />
                                Dashboards
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}

              <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:text-indigo-300 hover:border-b-2 hover:border-indigo-500 hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <CgProfile size={20} />
                  Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={userRole === 'admin' ? '/download' : '/tables'}
                  className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:text-indigo-300 hover:border-b-2 hover:border-indigo-500 hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  {userRole === 'admin' ? <CiSaveDown2 size={25} /> :  <FaTable size={20} />  }
                  {userRole === 'admin' ? 'Download' : 'Tables'}
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/chart"
                  className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:text-indigo-300 hover:border-b-2 hover:border-indigo-500 hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <FaChartLine size={20} />
                  Chart
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
