import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Navigation, Autoplay } from "swiper/modules";
import { getDocumentation } from "../../services/documentation.service";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "../../assets/style/index.css";

const ImageSlider = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getDocumentation((data) => {
      setDatas(data);
    });
  }, []);

  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        cardsEffect={{
          perSlideOffset: 8,
          perSlideRotate: 2,
          rotate: true,
          slideShadows: true,
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        modules={[EffectCards, Pagination, Navigation, Autoplay]}
        className="w-[180px] sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px] py-8 relative mx-auto h-full"
      >
        {datas.map((data, index) => (
          <SwiperSlide
            key={index}
            className="rounded-[4rem] overflow-hidden -mt-7 w-[180px] h-[135px] sm:w-[240px] sm:h-[180px] md:w-[260px] md:h-[195px] lg:w-[280px] lg:h-[210px] lg:-mt-0 xl:w-[300px] xl:h-[225px] xl:-mt-0"
          >
            <img
              src={`${
                import.meta.env.VITE_API_URL
              }/dokumentasi-frontpage/image/${data.image}`}
              alt={data.image}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
