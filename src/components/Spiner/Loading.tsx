import { FaSpinner } from 'react-icons/fa';
const LoadingSpiner: React.FC = () => {
    return (
        <div className="flex-grow flex items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
    )
}
    export default LoadingSpiner;