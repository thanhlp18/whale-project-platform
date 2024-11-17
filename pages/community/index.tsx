import WhaleModal from "@/components/ui/modal";
import Sidebar from "@/components/ui/sideBar";
import HomeLayout from "@/layout/homeLayout";
import {
  GetAllPublicImagesResponse,
  PublicReligionImage,
} from "@/lib/common/types/imageAnalyzing";
import { useLazyGetReligionsQuery } from "@/redux/services/imageAnalyzingApi";
import { Religion, ReligionImage } from "@prisma/client";
import { Modal } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Gallery() {
  const [pageIndex, setPageIndex] = useState(0);
  const [images, setImages] = useState<PublicReligionImage[]>([]);
  const [selectedReligion, setSelectedReligion] =
    useState<PublicReligionImage | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fetchImage, { data: religionImages, isLoading, isError }] =
    useLazyGetReligionsQuery();

  useEffect(() => {
    fetchImage({ pageSize: 20, pageIndex });
  }, [pageIndex, fetchImage]);

  useEffect(() => {
    if (religionImages && religionImages.data) {
      setImages((prevImages) => [
        ...prevImages,
        ...religionImages?.data?.data!,
      ]);
    }
  }, [religionImages]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showModal = (religion: PublicReligionImage) => {
    setSelectedReligion(religion);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <HomeLayout>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images.map((image) => (
            <div key={image.id} onClick={() => showModal(image)}>
              <BlurImage religion={image} />
              <h3 className="mt-4 text-lg text-gray-700">
                {image.religion.name}
              </h3>
              <p className="mt-1 text-sm text-gray-900">
                {image.religion.origin}
              </p>
            </div>
          ))}
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading images</p>}
      </div>
    </HomeLayout>
  );
}

function BlurImage({ religion }: { religion: PublicReligionImage }) {
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
    console.log({isModalVisible})
  return (
   <>
    <div onClick={() => setIsModalVisible(true)}>
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={religion.url}
          width={320}
          height={240}
          objectFit="cover"
          className={cn(
            "duration-700 ease-in-out group-hover:opacity-75",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-lg text-gray-700">{religion.religion.name}</h3>
      <p className="mt-1 text-sm text-gray-900">
        {religion.religion.description}
      </p>

     
    </div>
     <WhaleModal
     isOpen={isModalVisible}
     title="Thông tin chi tiết về tôn giáo"
     onClose={() => {
       setIsModalVisible(false);
     }}
   >
     <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={religion.url}
          width={320}
          height={240}
          objectFit="cover"
          className={cn(
            "duration-700 ease-in-out group-hover:opacity-75",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-lg text-gray-700">{religion.religion.name}</h3>
      <p className="mt-1 text-sm text-gray-900">{religion.religion.origin}</p>
      <p className="mt-1 text-sm text-gray-900">
        {religion.religion.description}
      </p>
      <p className="mt-1 text-sm text-gray-900">
        Nguồn gốc: {religion.religion.referenceSources}
      </p>
   </WhaleModal></>
  );
}
