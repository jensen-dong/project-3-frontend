import { Link } from 'react-router-dom';
import './404.css';

const Error404 = () => {
    return (
        <main className="e404">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="btn btn1">Go to Home</Link>
        </main>
    );
};

export default Error404;