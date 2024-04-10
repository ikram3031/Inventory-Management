import hero from '../assets/hero.png';

const Hero = () => {
  return (
    <div>
        <img 
            className='w-full max-h-[600px] object-cover'
            src={hero}
        />
    </div>
  )
}

export default Hero