import SectionHeading from '../../../Components/SectionHeading/SectionHeading'

const Hero = () => {
  return (
    <div className="mt-12">
        <SectionHeading
        subHeading="What Our Client Say"
        heading="Testimonials"
      ></SectionHeading>
      <div
        className="hero min-h-screen bg-fixed"
        style={{
          backgroundImage: "url(https://i.ibb.co/NVMNK0r/Employee-Management-Meaning-Importance-Tips-Tools-More.png)",
        }}
      >
        
        <div className="hero-overlay"></div>
        <div
          className="hero-content
        text-center text-neutral-content"
        >
          
          <div
            className="lg:px-72 lg:py-40
        px-10 py-10 text-black bg-white"
          >
            
            <div className="max-w-md">
              
              <h1 className="mb-5 text-5xl font-bold">EmployEase</h1>
              <p>
                
                Dramatically incentivize plug-and-play customer service through
                accurate e-markets. Proactively enhance stand-alone systems
                through strategic results. Completely initiate visionary
                scenarios before stand-alone niches. Appropriately engineer
                granular human capital through extensive partnerships.
                Appropriately harness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
