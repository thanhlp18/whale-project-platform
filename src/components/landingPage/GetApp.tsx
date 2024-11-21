import Button from "./Button";
import Image from "next/image";

const GetApp = () => {
  return (
    <section className=" bg-white">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3x">
          Câu hỏi thường gặp
        </h2>
        <div className="max-w-screen-md mx-auto flex flex-col gap-4">
          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              Ứng dụng có hỗ trợ nhận diện hình ảnh không?
            </div>
            <div className="collapse-content">
              <p>
                Có, ứng dụng hỗ trợ nhận diện các đối tượng Phật giáo phổ biến
                như tượng Phật, chùa chiền, tranh vẽ và biểu tượng văn hóa thông
                qua công nghệ nhận diện hình ảnh tiên tiến.
              </p>
              <p>
                Tìm hiểu thêm về tính năng này qua{" "}
                <a href="#" className="text-primary-80  hover:underline">
                  hướng dẫn sử dụng
                </a>
                .
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              Tôi có thể tra cứu thông tin về đối tượng Phật giáo không?
            </div>
            <div className="collapse-content">
              <p>
                Ứng dụng cung cấp thông tin chi tiết về các đối tượng Phật giáo
                được nhận diện, bao gồm lịch sử, ý nghĩa và nguồn gốc của chúng.
              </p>
              <p>
                Hãy khám phá thêm thông qua tính năng tra cứu của chúng tôi.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              Ứng dụng có hỗ trợ đa ngôn ngữ không?
            </div>
            <div className="collapse-content">
              <p>
                Có, ứng dụng hỗ trợ đa ngôn ngữ để người dùng từ các quốc gia
                khác nhau có thể dễ dàng sử dụng và tìm hiểu về Phật giáo.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              Tôi có thể chia sẻ nội dung với cộng đồng không?
            </div>
            <div className="collapse-content">
              <p>
                Ứng dụng cho phép người dùng chia sẻ hình ảnh và thông tin Phật
                giáo với cộng đồng, đồng thời tạo không gian kết nối và trao đổi
                giữa các thành viên.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetApp;
