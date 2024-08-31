import { Link } from "react-router-dom";
import { AuthLayout } from "../../layout/auth/AuthLayout";
import NotFound from '../../images/cover/404.jpg';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  role: string;
}

const NotFound404 = () => {
    // Retrieve and decode the JWT token
    const token = localStorage.getItem('authToken');
    let userRole = 'user';

    if (token) {
        const decodedToken: DecodedToken = jwtDecode(token);
        userRole = decodedToken.role;
    }

    // Determine the link destination based on the user's role
    const redirectTo = userRole === 'admin' ? '/admin' : '/';

    return (
        <AuthLayout>
            <section className="text-center items-center flex flex-col justify-center bg-white mb-4 overflow-auto">
                <img src={NotFound} alt="404 Not Found" className="w-1/3"/>
                <p className="text-xl mb-5">This page does not exist</p>
                <Link
                    to={redirectTo}
                    className="text-white bg-red-700 hover:bg-red-900 rounded-md px-3 py-2 mt-4 mb-4"
                >
                    Go Back
                </Link>
            </section>
        </AuthLayout>
    );
}

export default NotFound404;
