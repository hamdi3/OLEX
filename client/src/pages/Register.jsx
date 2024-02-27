import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const navigate = useNavigate();
  // register form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    username: '',
    password: '',
    seller: false,
  });
  // register input onChange
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };
  // register form submit
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
            <div className='mb-4'>
              <label htmlFor='seller'>
                <input
                  type='checkbox'
                  id='seller'
                  name='seller'
                  checked={formData.seller}
                  onChange={handleInputChange}
                  className='mr-2'
                />
                seller
              </label>
            </div>
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
