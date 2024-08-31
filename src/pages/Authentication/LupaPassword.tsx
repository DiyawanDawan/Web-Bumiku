import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LupaPassword: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="rounded-sm  shadow-defaul  snap-y">
        <div className="bg-gray-100 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white dark:bg-boxdark border border-indigo-900  shadow-2xl rounded-lg p-6">
            <div className="flex items-center pt-4">
              <button
                onClick={() => navigate('/signin')}
                className="dark:text-white text-indigo-700 mb-7 hover:text-blue-800 focus:outline-none"
              >
                <FaArrowLeft className="inline-block mr-2" /> Kembali
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Kontak Kami</h2>
            <form
              action="mailto:diyawan0@gmail.com"
              method="post"
              encType="text/plain"
            >
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subjek
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="" disabled selected>
                    Pilih Subjek
                  </option>
                  <option value="Lupa Password">Lupa Password</option>
                  <option value="Other">Lainnya</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Nama Lengkap"
                  required
                  className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username akun anda"
                  className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email akun anda"
                  required
                  className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Jenis Kelamin
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="w-full rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-400 dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="" disabled selected>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Pesan Lebih Detail
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tulis lebih detail"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
      
    );
};

export default LupaPassword;
