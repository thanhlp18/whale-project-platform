import Image from "next/image";

const Guide = () => {
  return (
    <section className="flexCenter flex-col mb-16">
      <div className="padding-container max-container w-full pb-24">
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10 ">
        <h2 className="bold-52 text-blue-950 outline-double px-4 rounded-lg">Whale Project giúp bạn: </h2>
       
            <ul className="list-disc pl-5">
            <li className="regular-16 text-gray-30 xl:max-w-[520px]">
              Nhận diện các đối tượng Phật giáo chỉ bằng một bức ảnh.
            </li>
            <li className="regular-16 text-gray-30 xl:max-w-[520px]">
              Tra cứu thông tin chi tiết về ý nghĩa, nguồn gốc, câu chuyện liên quan đến hình ảnh.
            </li>
            <li className="regular-16 text-gray-30 xl:max-w-[520px]">
              Khám phá kho tàng kiến thức Phật giáo đồ sộ được cập nhật liên tục.
            </li>
            <li className="regular-16 text-gray-30 xl:max-w-[520px]">
              Kết nối và chia sẻ với cộng đồng những người yêu thích Phật giáo.
            </li>
            </ul>
        </div>
      </div>

      <div className="flexCenter max-container relative w-full">
        <Image
          src="/landingPage/img-2.png"
          alt="boat"
          width={1440}
          height={230}
          className="w-full object-cover 2xl:rounded-5xl max-h-[300px]"
        />
        <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%]lg:top-20">
          <Image
            src="/meter.svg"
            alt="meter"
            width={16}
            height={158}
            className="h-full w-auto"
          />
          <div className="flexBetween flex-col ">
            <div className="flex w-full flex-col">
              <div className="flexBetween w-full">
                <p className="regular-16 text-gray-20">Chụp một bức ảnh</p>
              </div>
              <p className="bold-20 mt-2 text-blue-70">AI giúp bạn phân tích</p> 
           
              <span className="bold-20 text-green-50">   <span className="regular-12 text-blue-70">trong</span> 10s</span>

            </div>
            <div className="flex w-full flex-col">
              <h4 className="bold-20 mt-2">
                Nhận kết quả và chia sẻ với cộng đồng
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guide;
