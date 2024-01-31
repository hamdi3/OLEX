import axios from 'axios';
import { useProducts } from '../contexts/ProductContext';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  //  calling products from products Context
  const { products } = useProducts();
  // calling user info from useAuth Context
  const { user, accessToken } = useAuth();
  // state for adding products
  const [addNew, setAddNew] = useState(false);
  //  state for the user Products
  const [userProducts, setUserProducts] = useState([]);
  //  showing the product form
  const toggleAddProduct = () => {
    setAddNew((prevAddNew) => !prevAddNew);
  };
  // closing product from
  const closePopup = () => {
    setAddNew(false);
  };
  // adding a new product form
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });
  // dropzone for product images
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*', // Specify accepted file types
    onDrop: (acceptedFiles) => {
      const selectedImage = acceptedFiles[0];
      // Create a preview URL for the selected image
      const previewURL = URL.createObjectURL(selectedImage);
      setProductForm({
        ...productForm,
        image: selectedImage,
        previewURL: previewURL,
      });
    },
  });
  //  product form input onChange
  const handleProductChange = (e) => {
    const { name, value, type } = e.target;
    setProductForm((prevProductForm) => {
      if (type === 'file') {
        const selectedImage = e.target.files[0];
        const previewURL = URL.createObjectURL(selectedImage);
        return {
          ...prevProductForm,
          image: selectedImage,
          previewURL: previewURL,
        };
      } else {
        return {
          ...prevProductForm,
          [name]: value,
        };
      }
    });
  };
  //  product form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', productForm.name);
    formData.append('price', productForm.price);
    formData.append('description', productForm.description);
    formData.append('image', productForm.image);
    formData.append('seller', user.user_id);

    try {
      await axios.post(
        'http://127.0.0.1:8000/products_api/products/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('success');
    } catch (error) {
      console.log(error);
    }
  };
  // fetching user own products
  const fetchingUserProducts = useCallback(() => {
    let newProducts = products.filter((item) => item.seller === user.user_id);
    setUserProducts(newProducts);
    console.log(userProducts);
  }, [products, user.user_id, setUserProducts]);
  useEffect(() => {
    fetchingUserProducts();
  }, [fetchingUserProducts]);

  return (
    <section className='py-20'>
      <div className='container mx-auto'>
        <div className='mt-20'>
          <h1 className='text-3xl font-semibold mb-10 text-center'>
            Your Products
          </h1>
        </div>
        {/* <AddProduct /> */}
        <div className='fixed bottom-16 right-16'>
          <button
            onClick={toggleAddProduct}
            className='bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 focus:outline-none'
          >
            <svg
              className='h-8 w-8 text-white-500'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='16 16 12 12 8 16' />
              <line x1='12' y1='12' x2='12' y2='21' />
              <path d='M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3' />
              <polyline points='16 16 12 12 8 16' />
            </svg>
          </button>
        </div>
        {/* Product Form */}
        {addNew && (
          <>
            <div
              id='login-popup'
              tabIndex='-1'
              className='bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full w-full items-center justify-center flex'
            >
              <div className='relative p-4 w-full max-w-md h-full md:h-auto'>
                <div className='relative bg-white rounded-lg shadow'>
                  <button
                    onClick={closePopup}
                    type='button'
                    className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close'
                  >
                    <svg
                      aria-hidden='true'
                      className='w-5 h-5'
                      fill='#c6c7c7'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>

                  <div className='p-5'>
                    <h3 className='text-2xl mb-0.5 font-medium'></h3>
                    <p className='mb-4 text-sm font-normal text-gray-800'></p>

                    <div className='text-center'>
                      <p className='mb-3 text-2xl font-semibold leading-5 text-slate-900'>
                        Add A New Product
                      </p>
                    </div>

                    <form
                      className='w-full'
                      onSubmit={handleSubmit}
                      encType='multipart/form-data'
                    >
                      <div className='mb-4'>
                        <label htmlFor='name' className='sr-only'>
                          Name :
                        </label>
                        <input
                          name='name'
                          type='text'
                          autoComplete='name'
                          required
                          className='block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1'
                          placeholder='Product Name'
                          value={productForm.name}
                          onChange={handleProductChange}
                        />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor='description' className='sr-only'>
                          Description :
                        </label>
                        <input
                          name='description'
                          type='text'
                          autoComplete='description'
                          required
                          className='block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1'
                          placeholder='Product description'
                          value={productForm.description}
                          onChange={handleProductChange}
                        />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor='price' className='sr-only'>
                          Price :
                        </label>
                        <input
                          name='price'
                          type='number'
                          autoComplete='price'
                          required
                          className='block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1'
                          placeholder='Product Price'
                          value={productForm.price}
                          onChange={handleProductChange}
                        />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor='image' className='sr-only'>
                          Image :
                        </label>
                        <div className='flex items-center justify-center w-full'>
                          <div {...getRootProps()} className='dropzone'>
                            <input
                              {...getInputProps()}
                              name='image'
                              type='file'
                              accept='image/*'
                              onChange={handleProductChange}
                            />

                            {productForm.previewURL && (
                              <img
                                src={productForm.previewURL}
                                alt='Preview'
                                className='max-w-full h-auto mb-2 rounded-lg'
                              />
                            )}
                            <p className='text-gray-500 dark:text-gray-400'>
                              <span className='font-semibold'>
                                Click to upload
                              </span>
                              or drag and drop
                            </p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type='submit'
                        className='inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400'
                      >
                        Continue
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* product detail card */}
        {}
        <section className='bg-white py-11 font-poppins dark:bg-black-800'>
          <div className='max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6'>
            {userProducts.map((product) => (
              <div key={product.id} className='flex flex-wrap -mx-4 mb-12'>
                <div className='w-full px-4 md:w-1/2'>
                  <div className='sticky top-0 z-50 overflow-hidden'>
                    <div className='relative mb-6 lg:mb-10 lg:h-2/4'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='object-cover w-full lg:h-full'
                      />
                    </div>
                  </div>
                </div>
                <div className='w-full px-4 md:w-1/2'>
                  <div className='lg:pl-20'>
                    <div className='mb-8'>
                      <h2 className='max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-black-400 md:text-4xl'>
                        {product.name}
                      </h2>
                      <p className='max-w-md mb-8 text-gray-700 dark:text-gray-400'>
                        {product.description}
                      </p>
                      <p className='inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400'>
                        <span>${product.price}</span>
                      </p>
                    </div>

                    {/* product details buttons */}
                    <div className='flex flex-wrap items-center -mx-4'>
                      <div className='w-full px-4 mb-4 lg:w-1/2 lg:mb-0'>
                        <button className='flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300'>
                          Edit
                        </button>
                      </div>
                      <div className='w-full px-4 mb-4 lg:mb-0 lg:w-1/2'>
                        <button className='flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300'>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Profile;
