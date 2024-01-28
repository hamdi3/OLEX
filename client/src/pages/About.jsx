import { useEffect, useState } from 'react';
const About = () => {
  const [isActive, setIsActive] = useState(false);
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
    <section className='py-20'>
      <div className='container mx-auto'>
        <h2>About Page</h2>
      </div>
    </section>
  );
};

export default About;
