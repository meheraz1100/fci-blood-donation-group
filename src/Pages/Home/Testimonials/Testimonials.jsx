import { useEffect, useState } from "react";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('testimonials.json')
        .then((res) => res.json())
        .then((data) => setTestimonials(data))
    }, [])

    // console.log(testimonials);
    return (
        <div>
            
        </div>
    );
};

export default Testimonials;