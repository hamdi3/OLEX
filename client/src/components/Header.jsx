import { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.svg';
import profile from '../assets/profile.svg';
import { BsBag } from 'react-icons/bs';
import '../index.css';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { clearTokens, accessToken } = useAuth();

  // event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {accessToken && (
        <>
          <header
            className={`${
              isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'
            } fixed w-full z-10 lg:px-8 transition-all`}
          >
            <div className='container mx-auto flex items-center justify-between h-full cart-container'>
              <div>
                <Link to={'/'}>
                  <div className='w-[40px]'>
                    <img src={Logo} alt='' />
                  </div>
                </Link>
              </div>
              <div className='flex-grow flex items-center justify-center'>
                <ul className='flex space-x-12'>
                  <li>
                    <Link to='/' className='link-btn  text-[18px]'>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to='/about' className='text-[18px]'>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to='/products' className='text-[18px]'>
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to='/contact' className='text-[18px]'>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Cart */}
              <div className='flex items-center space-x-8'>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='cursor-pointer flex relative'
                >
                  <BsBag className='text-2xl' />
                  <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>
                    {itemAmount}
                  </div>
                </div>
                {/* User image */}
                <Link to='/profile'>
                  <img
                    className='w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500'
                    src={profile}
                    alt='Bordered avatar'
                  />
                </Link>

                <button
                  type='button'
                  className='text-[20px] font-bold logout-btn'
                  onClick={clearTokens}
                >
                  Logout
                </button>
              </div>
              {/* Logout button */}
            </div>
          </header>
        </>
      )}
    </>
  );
};

export default Header;
