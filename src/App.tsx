import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/DashboardPage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import NotFound404 from './pages/404/NotFound';
import DashboardPage from './pages/Dashboard/DashboardPage';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard | Cinta Bumi" />
              <DashboardPage />
            </>
          }
        />
      
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Cinta Bumi" />
              <Profile />
            </>
          }
        />
       
       
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Cinta Bumi" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Cinta Bumi" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Cinta Bumi" />
              <Chart />
            </>
          }
        />
       
        <Route
          path="*"
          element={
            <>
              <PageTitle title="Not Foun 404" />
              <NotFound404 />
            </>
          }
        />
       
        {/* <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
