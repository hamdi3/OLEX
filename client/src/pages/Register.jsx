import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    username: '',
    password: '',
    seller: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://127.0.0.1:8000/users_api/register/',
        {
          ...formData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='h-screen'>
      <div className='g-6 flex h-full flex-wrap items-center justify-center lg:justify-between'>
        <div className='mb-12 md:mb-0 md:w-8/12 lg:w-6/12'>
          <img
            src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
            className='w-full'
            alt='Phone image'
          />
        </div>

        <div className='md:w-8/12 lg:ml-12 lg:w-5/12'>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <div className='mb-2'>
              <h2 className='text-center font-bold text-2xl'>
                Welcome to OLEX
              </h2>
            </div>
            <div className='mb-4'>
              <label htmlFor='first_name'>First Name :</label>
              <input
                className='shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-500'
                name='first_name'
                id='first_name'
                type='text'
                placeholder='First Name'
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='last_name'>Last Name :</label>
              <input
                className='shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-500'
                name='last_name'
                id='last_name'
                type='text'
                placeholder='Last Name'
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='last_name'>Email Address :</label>
              <input
                className='shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-500'
                name='email'
                id='email'
                type='email'
                placeholder='Email Address'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='last_name'>Username :</label>
              <input
                className='shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-500'
                name='username'
                id='username'
                type='text'
                placeholder='Username'
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='address'>Address :</label>
              <input
                className='shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-500'
                name='address'
                id='address'
                type='text'
                placeholder='Address'
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password'>Password :</label>
              <input
                className='shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 mb-3 leading-tight focus:ring-blue-500 focus:border-blue-500'
                name='password'
                id='password'
                type='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className='mb-6 flex items-center justify-start'>
                <div className='mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]'></div>

                <div className='mb-4  text-center'>
                  <a
                    href='#!'
                    className='text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600'
                  >
                    Forgot password?
                  </a>
                </div>
              </div> */}
            <button
              type='submit'
              className='inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white'
              style={{ cursor: 'pointer' }}
            >
              Sign IN
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
