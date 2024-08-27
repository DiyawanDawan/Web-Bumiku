import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
// import { IoSettingsSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { BsChevronDoubleDown } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import UserOne from '../../images/user/user-01.png';
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';
import LoadingSpiner from '../Spiner/Loading.js';


const DropdownUser = () => {
 
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const data = await DBSourse.profile();
          console.log(data);
          setProfile(data);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          setLoading(true);
        }
      };
  
      fetchProfile();
    }, []);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Apa kau yakin?",
      text: "Anda tidak akan dapat mengembalikannya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, keluar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Keluar!",
          text: "Anda telah keluar.",
          icon: "success"
        }).then(() => {
    localStorage.removeItem('authToken');
    toast.success('Anda telah berhasil keluar');
    navigate('/signin');
  });
}
});
  };

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <>
    {loading ? (
      <LoadingSpiner />
    ) : (
      <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
          {profile.fullName}
          </span>
          <span className="block text-xs"> {profile.email}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>

        <BsChevronDoubleDown size={28}/>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FaUserCircle size={28}/>
              My Profile
            </Link>
          </li>
          {/* <li>
            <Link
              to="#"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FaPhoneSquare size={28}/>
              My Contacts
            </Link>
          </li> */}
          {/* <li>
            <Link
              to="/pages/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
             <IoSettingsSharp size={28}/>
              Account Settings
            </Link>
          </li> */}
        </ul>
        <button onClick={handleLogout} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
          <CiLogout size={28}/>
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    
      <ToastContainer />
    </div>
    )}
</>
  );
};

export default DropdownUser;
