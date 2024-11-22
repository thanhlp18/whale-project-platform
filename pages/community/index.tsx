import WhaleModal from "@/components/ui/modal";
import HomeLayout from "@/layout/homeLayout";
import {
  PublicReligionImage
} from "@/lib/common/types/imageAnalyzing";
import { useLazyGetReligionsQuery } from "@/redux/services/imageAnalyzingApi";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const [fetchImage, { data: religionImages, isLoading, isError }] =
    useLazyGetReligionsQuery();

  useEffect(() => {
    fetchImage({ pageSize: 20, pageIndex, searchQuery, filter });
  }, [pageIndex, filter, searchQuery, fetchImage]);

  useEffect(() => {
    if (religionImages && religionImages.data) {
      const previous = !searchQuery && filter == "all" ? images : [];
      setImages((prevImages) => [...previous, ...religionImages?.data?.data!]);
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
        {/* Filter Row */}
        <div className="mb-4 flex justify-between items-center gap-6">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="btn-group gap-2 flex flex-row">
            <button
              className={`btn ${filter === "all" ? "btn-active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Public
            </button>
            <button
              className={`btn ${filter === "private" ? "btn-active" : ""}`}
              onClick={() => setFilter("private")}
            >
              My image
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => showModal(image)}
              className="border-white-200s rounded-lg overflow-hidden border max-h-[600px] p-4 hover:outline-primary-40 hover:outline"
            >
              <BlurImage religion={image} />

              {image.religion.origin && (
                <p className="mt-1 text-sm text-gray-900">
                  Nguồn gốc: {image.religion.origin}
                </p>
              )}
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
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: any) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log({ isModalVisible });
  return (
    <>
      <div onClick={() => setIsModalVisible(true)}>
        <div
          className="relative overflow-hidden rounded-lg bg-gray-200"
          style={{ width: "100%", height: "250px" }}
          onMouseMove={handleMouseMove}
        >
          <Image
            alt=""
            src={religion.url}
            objectFit="cover"
            objectPosition="center"
            width={320}
            height={250}
            className={cn(
              "transform transition-transform duration-300 ease-in-out",
              "hover:scale-125",
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              transform: "scale(1.25)", // Adjust scale value for zoom intensity
            }}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        <h3 className="mt-4 text-lg text-gray-700 font-semibold">
          {religion.religion.name}
        </h3>
        <p className="mt-1 text-sm text-gray-900 line-clamp-2">
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
        <>
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <Image
              alt=""
              src={religion.url}
              objectFit="cover"
              objectPosition="center"
              width={300}
              height={450}
              className={cn(
                "transform transition-transform duration-300 ease-in-out",
                "hover:scale-125",
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              )}
              onLoadingComplete={() => setLoading(false)}
              style={{ width: "100%" }}
            />
          </div>
          <h3 className="mt-4 text-lg text-gray-700 font-semibold">
            {religion.religion.name}
          </h3>
          <p className="mt-1 text-sm text-gray-900">
            {religion.religion.origin}
          </p>
          <p className="mt-1 text-sm text-gray-900 line-clamp-2">
            {religion.religion.description}
          </p>
          <p className="mt-1 text-sm text-gray-900">
            Nguồn gốc: {religion.religion.referenceSources}
          </p>
        </>
      </WhaleModal>
    </>
  );
}
