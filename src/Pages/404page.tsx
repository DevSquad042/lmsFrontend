
import { Link } from 'react-router-dom';
import Header1 from '../Components/shared/Header1';
import Footer from '../Components/Layout/Footer';

const NotFoundPage: React.FC = () => (
    <>
    <Header1/>
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center'
    }}>
        <h1>404</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
            Go back to Home
        </Link>
    </div>
    <Footer/>
    </>
);

export default NotFoundPage;