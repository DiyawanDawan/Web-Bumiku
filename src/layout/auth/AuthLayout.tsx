import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark dark:border-indigo-300">
      {/* <div className="h-screen ove"> */}
        <main className='className="mx-auto max-w-screen-xl p-4 md:p-6 2xl:p-10"'>
          {/* <div > */}
            {children}
          {/* </div> */}
        </main>
      {/* </div> */}
    </div>
  );
}