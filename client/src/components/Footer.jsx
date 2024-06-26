import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id='footer'>
            <div className='footer__inner container'>
                <div className='footer__info'>
                    <h2 className='footer__logo'>
                        <Link to='/'>kingsong</Link>
                    </h2>
                    <p className='footer__desc'>Connecting people through words and stories.</p>
                </div>
                <nav className='footer__nav'>
                    <ul>
                        <li><Link to='/about'>About Us</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li><Link to='/privacy'>Privacy Policy</Link></li>
                        <li><Link to='/terms'>Terms of Service</Link></li>
                    </ul>
                </nav>
                <div className='footer__social'>
                    <Link to='/facebook' className='github'></Link>
                    <Link to='/twitter' className='youtube'></Link>
                    <Link to='/instagram' className='instagram'></Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
