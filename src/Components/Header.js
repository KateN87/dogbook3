import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='navbar'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>
                    <img className='nav-logo' src='/favicon.ico' alt='' />
                    DogBook
                </Link>

                <ul className='nav justify-content-center'>
                    <CustomLink to='/'>Home</CustomLink>
                    <CustomLink to='/newDog'>New Dog</CustomLink>
                </ul>
            </div>
        </nav>
    );
};

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={`nav-item ${isActive ? 'active' : ''}`}>
            <Link className='nav-link' to={to}>
                {children}
            </Link>
        </li>
    );
}

export default Header;
