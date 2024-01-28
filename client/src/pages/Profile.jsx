const Profile = () => {
  return (
    <section className='py-20'>
      <div className='container mx-auto'>
        <div className='mt-20'>
          <h1 className='text-3xl font-semibold mb-10 text-center'>
            Your Products
          </h1>
        </div>
        <div
          name=''
          className='bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen text-center md:text-left'
        >
          <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
            <div className='pb-8'>
              <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
                Title{' '}
              </p>
              <p className='py-6'>subtitle</p>
            </div>

            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:px-5'>
              {/* {items.map(({ id, src, link }) => (
                <div
                  key={id}
                  className='shadow-md shadow-gray-600 rounded-lg overflow-hidden'
                >
                  <img
                    src={src}
                    alt=''
                    className='rounded-md duration-200 hover:scale-105'
                  />
                  <div className='flex items-center justify-center'>
                    <button
                      className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105'
                      // onClick={() => window.open(link, '_blank')}
                    >
                      button
                    </button>
                    <button
                      className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105'
                      // onClick={() => window.open(link, '_blank')}
                    >
                      button
                    </button>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
