import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DBSourse from '../../data/api/db-sourse.js';
import { FaArrowLeft, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Header from '../../components/Header/index.js';
import { MdOutlineEmail } from 'react-icons/md';
interface User {
  fullName: string;
  gender: string;
  username: string;
  email: string;
  role: string;
  password: string;
}

const UpdateUserForm: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // State untuk kontrol visibilitas password

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    fullName: '',
    gender: '',
    username: '',
    email: '',
    role: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await DBSourse.getUserById(id); // Fetch user data by ID
        console.log("Fetched user data:", data);
        setUser({
          fullName: data.fullName || '',
          gender: data.gender || '',
          username: data.username || '',
          email: data.email || '',
          role: data.role || '',
          password: '', // Initialize password as empty
        });
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        toast.error('Failed to fetch user data.');
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { password, ...updateData } = user;

    try {
        const response = await DBSourse.updateUser(id, updateData, password || undefined);
        
        console.log('Response:', response); // Log response to see what's returned

        if (response.success) {
            toast.success(response.message);
            navigate('/admin');
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        // console.error('Error updating user:', error);
        toast.error('Failed to update user.');
    } finally {
        setLoading(false);
    }
};


const toggleShowPassword = () => {
  setShowPassword(!showPassword); // Toggle show/hide password
};
  return (
    <>
 
 <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="dark:bg-black">
       <div className=' py-10'>
        <div className='max-w-lg mx-auto pb-10 shadow-xl px-11 border rounded-lg'>
        <div className="flex items-center pt-10">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="dark:text-white text-indigo-700 mb-7 hover:text-blue-800 focus:outline-none"
          >
            <FaArrowLeft className="inline-block mr-2 " /> Kembali
          </button>
        </div>
        <h2 className="text-2xl dark:text-white font-bold mb-4">Perbarui User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Nama Lengkap
            </label>
           <div className='relative'>
           <input
              type="text"
              id="fullName"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" >
                  <FaUser size={25} />
                </div>
           </div>
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Jenis Kelamin 
            </label>
            <select
              id="gender"
              name="gender"
              value={user.gender}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
              <option value="" disabled selected>Select Gender</option>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Username 
            </label>
            <div className='relative'>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
               <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" >
                  <FaUser size={25} />
                </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Email
            </label>
           <div className='relative'>
           <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 pointer-events-none"
            >
              <MdOutlineEmail size={25} className="text-gray-500 dark:text-gray-400" />
            </div>
           </div>
</div>


          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Role 
            </label>
            <select
              id="role"
              name="role"
              value={user.role}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
              <option value="" disabled selected>Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white mb-2 ">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={30}/>}
              </div>
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? 'Updating...' : 'Update User'}
            </button>
          </div>
        </form>
        </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserForm;
