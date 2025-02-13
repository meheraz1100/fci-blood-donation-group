
// eslint-disable-next-line
const SectionHeading = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-8 ">
            <p className="text-yellow-600 mb-4">{subHeading}</p>
            <p className=" text-3xl uppercase border-y-4 py-4">---{heading}---</p>
        </div>
    );
};

export default SectionHeading;