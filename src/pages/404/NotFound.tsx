import { Link } from "react-router-dom"
import { FaExclamationTriangle } from "react-icons/fa"
import { AuthLayout } from "../../layout/auth/AuthLayout"
import NotFoutn from '../../images/cover/404.jpg';
const NotFound404 = () => {


    return (
        <AuthLayout>
            <section className="text-center items-center flex flex-col justify-center bg-white mb-4 overflow-auto">
                
                    <img src={NotFoutn} alt="" className="w-1/3"/>
                <p className="text-xl mb-5">This page does not exist</p>
                <Link
                    to="/"
                    className="text-white bg-red-700 hover:bg-red-900 rounded-md px-3 py-2 mt-4 mb-4"
                >Go Back</Link>
            </section>
        </AuthLayout>
    )
}

export default NotFound404