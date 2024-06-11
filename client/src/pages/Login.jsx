import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
const Login = () => {
  const navigate = useNavigate();
  const { storeTokens } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [credentialsMatch, setCredentialsMatch] = useState(true);
  //  login from input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Reset credentials match state when input changes
    setCredentialsMatch(true);
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

      setCredentialsMatch(false);
    }
  };
  return (
    <div className='container'>
      <div className='screen'>
        <div className='screen__content'>
          <form className='login' onSubmit={handleSubmit}>
            <div
              className={`login__field ${!credentialsMatch ? 'invalid' : ''}`}
            >
              <i className='login__icon fas fa-user'></i>
              <input
                id='username'
                name='username'
                type='text'
                className={`login__input ${
                  !credentialsMatch ? 'invalid-input' : ''
                }`}
                placeholder='User name'
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            {!credentialsMatch && (
              <span className='error-username'>Incorrect username</span>
            )}
            <div
              className={`login__field ${!credentialsMatch ? 'invalid' : ''}`}
            >
              <i className='login__icon fas fa-lock'></i>
              <input
                name='password'
                id='password'
                type='password'
                className={`login__input ${
                  !credentialsMatch ? 'invalid-input' : ''
                }`}
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {!credentialsMatch && (
              <span className='error-username'>Incorrect Password</span>
            )}
            <button className='button login__submit' type='submit'>
              <span className='button__text'>Log In Now</span>
              <i className='button__icon fas fa-chevron-right'></i>
            </button>
          </form>
          <div className='social-login'>
            <h3>log in via</h3>
            <div className='social-icons'>
              <a href='#' className='social-login__icon'>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href='#' className='social-login__icon'>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href='#' className='social-login__icon'>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>
        <div className='screen__background'>
          <span className='screen__background__shape screen__background__shape4'></span>
          <span className='screen__background__shape screen__background__shape3'></span>
          <span className='screen__background__shape screen__background__shape2'></span>
          <span className='screen__background__shape screen__background__shape1'></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
