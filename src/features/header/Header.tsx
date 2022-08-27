import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <header className='py-10'>
            <nav>
                <Link
                    className='text-3xl font-semibold text-slate-900'
                    to={'/'}
                >
                    Freeleash
                </Link>
            </nav>
        </header>
    );
};
