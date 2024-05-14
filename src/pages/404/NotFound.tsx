import { Link } from "react-router-dom"
import { FaExclamationTriangle } from "react-icons/fa"
import { DefaultLayout } from "../../layout/DefaultLayout"

const NotFound404 = () => {


    return (
        <DefaultLayout>
            <section className="text-center items-center flex flex-col justify-center h-96">
                {/* <i className="fas fa-exclamation-triangle text-yellow-400 fa-4x mb-4"></i> */}
                <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
                <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
                <p className="text-xl mb-5">This page does not exist</p>
                <Link
                    to="/"
                    className="text-white bg-red-700 hover:bg-red-900 rounded-md px-3 py-2 mt-4"
                >Go Back</Link>
            </section>
        </DefaultLayout>


    )
}

export default NotFound404