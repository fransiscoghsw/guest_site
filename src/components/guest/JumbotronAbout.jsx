import TentangKami from "../../assets/images/jumbotron-aboutus.png";

const JumbotronAbout = (props) => {
    const { abouts } = props;

    const imagePath = abouts.image_background;

    return (
        <div className="relative -z-10">
            <img
                src={`${
                    import.meta.env.VITE_API_URL
                }/tentang-kami/image/${imagePath}`}
                alt={imagePath}
                className="object-cover object-left w-full -mt-3 rounded-br-[100px] h-[13rem] lg:h-[26rem] lg:rounded-br-[250px]"
            />

            <h1 className="absolute top-[1rem] left-3 lg:top-[1.5rem] lg:left-0 font-inter font-bold text-[4rem] md:text-[7rem] text-[#ffffb6] lg:px-24">
                <span className="text-[4rem] lg:text-[6.5rem]">
                    {/* {judulArray[0]} */}
                    {t("about.about")}
                </span>{" "}
                <br />
                <span className="text-[5rem] lg:text-[12rem] leading-none">
                    {/* {judulArray[1]} */}
                    {t("about.us")}
                </span>
            </h1>
        </div>
    );
};

export default JumbotronAbout;
