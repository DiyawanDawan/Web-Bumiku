import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Chart from './pages/Chart';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import NotFound404 from './pages/404/NotFound';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { AuthLayout } from './layout/auth/AuthLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './admin/components/AdminDasboard';
import UpdateUserForm from './admin/components/UpdateUser';

interface MyJwtPayload {
  role: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode<MyJwtPayload>(token);
      setUserRole(decodedToken.role || null);
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>

          <Route
            path="/signin"
            element={
              <AuthLayout>
                <PageTitle title="Signin " />
                <SignIn />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <PageTitle title="Signup" />
                <SignUp />
              </AuthLayout>
            }
          />
        </Route>

        {/* Protected Routes Admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route
            path="/admin"
            element={
              <>
                <PageTitle title="Dashboard Admin | Cinta Dunia" />
                <AdminDashboard />
              </>
            }
          />
          <Route
            path="/admin/update-user/:id"
            element={
              <>
                <PageTitle title="Update User | Cinta Dunia" />
               <UpdateUserForm />
              </>
            }
          />
        </Route>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title="Dashboard | Cinta Dunia" />
                <DashboardPage />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | Cinta Dunia" />
                <Profile />
              </>
            }
          />
        <Route
            path={userRole === 'admin' ? '/download' : '/tables'}
            element={
              <>
                <PageTitle title={userRole === 'admin' ? 'Download' : 'Tables'} />
                <Tables userRole={userRole} />
              </>
            }
          />

          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | Cinta Dunia" />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | Cinta Dunia" />
                <Chart />
              </>
            }
          />
        </Route>

        {/* Not Found Route */}
        <Route
          path="*"
          element={
            <AuthLayout>
              <PageTitle title="Not Found 404" />
              <NotFound404 />
            </AuthLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
