import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div>
      <Carousel>
        <div>
          <img src="https://i.ibb.co.com/bRQxTS3M/ban1.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co.com/d4GfLBjX/Whats-App-Image-2025-02-13-at-11-58-21-AM-1.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co.com/VW8q6qVv/Whats-App-Image-2025-02-13-at-11-58-21-AM.jpg" />
        </div>
        <div>
          {/* <img src="https://i.ibb.co.com/Ndh7Sx4L/Whats-App-Image-2025-02-13-at-11-58-20-AM.jpg" /> */}
        </div>
      </Carousel>
    </div>
  );
};

// https://i.ibb.co.com/Ndh7Sx4L/Whats-App-Image-2025-02-13-at-11-58-20-AM.jpg
// https://i.ibb.co.com/d4GfLBjX/Whats-App-Image-2025-02-13-at-11-58-21-AM-1.jpg
// https://i.ibb.co.com/VW8q6qVv/Whats-App-Image-2025-02-13-at-11-58-21-AM.jpg

export default Banner;
