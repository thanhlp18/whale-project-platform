import Image from "next/image";
import Button from "./Button";
import WhaleButton from "@/components/systemDesign/button";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

const Hero = () => {
  return (
    <section className="bg-pattern-3 before-overlay max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row ">
      {/* <div className="hero-map bg-blend-overlay" /> */}
      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2  items-center justify-center">
        {/* <Image
          src="/camp.svg"
          alt="camp"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        /> */}
        <h1 className="bold-52 lg:bold-88 text-blue-950 outline-double px-4 rounded-lg">Whale Project</h1>
        <h1 className="semibold-32 lg:semibold-52 text-white mt-3">
          Khám phá kho tàng tri thức Phật giáo qua hình ảnh
        </h1>
        <p className="regular-16 mt-6 text-white xl:max-w-[400px] text-center">
          Ứng dụng web tiên phong kết hợp công nghệ nhận diện hình ảnh và kho
          tàng tri thức Phật giáo, giúp bạn dễ dàng tra cứu thông tin, tìm hiểu
          và chia sẻ kiến thức Phật pháp.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row my-11 w-200">
          {/* <Button type="button" title="Download App" variant="btn_green" /> */}
          <WhaleButton variant="secondary" >
            <div className="flex flex-row gap-2 ">
              <MagnifyingGlassCircleIcon width={24} />
              <span>Tìm hiểu thêm</span>
            </div>
          </WhaleButton>
        </div>
      </div>
      {/* 
      <div className="relative flex flex-1 items-start">
        <div className="relatvie z-20 w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8 flex">
          <div className="flex flex-col ">
            <div className="flexBetween">
              <p className="regular-16 text-gray-20 ">Location</p>
              <Image src="/close.svg" alt="close" width={24} height={24} />
            </div>

            <p className="bold-20 text-white">Aguas Calientes</p>
          </div>

          <div className="flexBetween">
            <div className="flex flex-col ">
              <p className="regular-16 block text-gray-20">Distance</p>
              <p className="text-white bold-20">173.28 mi</p>
            </div>
            <div className="flex flex-col ">
              <p className="regular-16 block text-gray-20">Elevation</p>
              <p className="text-white bold-20">2.040 km</p>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
