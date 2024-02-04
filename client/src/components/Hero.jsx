import '../index.css';
const Hero = () => {
  return (
    <section className='py-24 flex items-center min-h-screen justify-center bg-white'>
      <div className='mx-auto max-w-[43rem]'>
        <div className='text-center'>
          <p
            className='text-[1.5rem] font-bold leading-8'
            style={{ color: '#344E41' }}
          >
            Welcome to OLEX
          </p>

          <h1
            className='mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight'
            style={{ color: '#3a5a40' }}
          >
            Your E-commerce Home
          </h1>

          <p
            className='mt-3 text-lg leading-relaxed'
            style={{ color: '#588157' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            quaerat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
