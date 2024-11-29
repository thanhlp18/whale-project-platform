import Link from "next/link";
import Image from "next/image";
import {
  FOOTER_CONTACT_INFO,
  FOOTER_LINKS,
  SOCIALS,
} from "@/constants/constants.index";

const Footer = () => {
  return (
    <footer className="bg-white">
      <hr className=" border-gray-200 sm:mx-auto" />
      <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
              Công ty
            </h3>
            <ul className="text-gray-500 ">
              <li className="mb-4">
                <a href="#" className=" hover:underline">
                  Giới thiệu
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Nghề nghiệp
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Trung tâm thương hiệu
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
              Trung tâm trợ giúp
            </h3>
            <ul className="text-gray-500 ">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Máy chủ Discord
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
              Pháp lý
            </h3>
            <ul className="text-gray-500 ">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Chính sách bảo mật
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Giấy phép
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
              Công ty
            </h3>
            <ul className="text-gray-500 ">
              <li className="mb-4">
                <a href="#" className=" hover:underline">
                  Giới thiệu
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Nghề nghiệp
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Trung tâm thương hiệu
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
              Tải xuống
            </h3>
            <ul className="text-gray-500 ">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  iOS
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Android
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Windows
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5 ">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
