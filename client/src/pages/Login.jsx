import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';
const Login = () => {
  const navigate = useNavigate();
  const { storeTokens } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  //  login from input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/users_api/login/',
        {
          ...formData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { access_token, refresh_token, user_access } = res.data;
      storeTokens(access_token, refresh_token, user_access);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='min-h-screen login-background py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 gradient-custom shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>

        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <div className='max-w-md mx-auto'>
            <div>
              <h1
                className='text-2xl font-semibold text-center'
                style={{ color: '#344e41' }}
              >
                Welcome back
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='divide-y divide-gray-200'>
                <div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
                  <div className='relative'>
                    <input
                      autoComplete='off'
                      id='username'
                      name='username'
                      type='text'
                      value={formData.username}
                      onChange={handleInputChange}
                      className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:border-588157'
                      style={{
                        color: '#3a5a40',
                      }}
                      placeholder='Username'
                    />

                    <label
                      htmlFor='username'
                      className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
                      style={{
                        color: '#588157',
                        fontWeight: 'bold',
                      }}
                    >
                      Username
                    </label>
                  </div>

                  <div className='relative pb-4'>
                    <input
                      autoComplete='off'
                      id='password'
                      name='password'
                      type='password'
                      value={formData.password}
                      onChange={handleInputChange}
                      className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600'
                      placeholder='Password'
                    />
                    <label
                      htmlFor='password'
                      className='absolute left-0 -top-3.5 text-xl peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm'
                      style={{
                        color: '#588157',
                        fontWeight: 'bold',
                      }}
                    >
                      Password
                    </label>
                  </div>
                  <div className='relative'>
                    <button
                      type='submit'
                      className='login-btn text-1xl font-bold rounded-md px-2 py-1  w-full data-te-submit-btn-ref'
                      style={{ color: '#dad7cd' }}
                    >
                      LOGIN
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
