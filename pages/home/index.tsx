import ReligionInformation from "@/components/home/religionInformation";
import UploadPicture from "@/components/home/uploadPicture";
import WhaleButton from "@/components/systemDesign/button";
import HomeLayout from "@/layout/homeLayout";
import { useUploadImageMutation } from "@/redux/services/imageAnalyzingApi";
import { Religion } from "@prisma/client";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [pagodaName, setPagodaName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadImage, { data: regionData, isLoading: isAnalyzingRegionData }] =
    useUploadImageMutation();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

      // Store the selected file in state
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("location", location);
    formData.append("pagodaName", pagodaName);
    formData.append("description", description);

    uploadImage(formData);
  };

  return (
    <HomeLayout>
      <div className="flex flex-row items-center justify-center w-full h-full gap-12 rounded-lg overflow-hidden bg-white">
        <div className="w-2/5 flex flex-col h-full bg-pattern-3 before-overlay rounded-lg overflow-hidden">
          <UploadPicture
            selectedImage={selectedImage}
            handleImageChange={handleImageChange}
            handleUpload={handleUpload}
          />
          {selectedImage && (
            <div className="flex flex-col items-center p-4 gap-4">
              <input
                id="location"
                name="location"
                placeholder="Nhập vị trí"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white w-full py-2 px-4 border-2 border-gray-200 rounded-lg   font-semibold focus-visible:outline-primary-40"
              />
              <input
                type="text"
                placeholder="Nhập tên địa danh"
                value={pagodaName}
                onChange={(e) => setPagodaName(e.target.value)}
                className="bg-white w-full py-2 px-4 border-2 border-gray-200 rounded-lg   font-semibold focus-visible:outline-primary-40"
              />
              <textarea
                maxLength={200}
                placeholder="Mô tả về hình ảnh để giúp AI phân tích tốt hơn"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white w-full py-2 px-4 border-2 border-gray-200 rounded-lg   font-semibold focus-visible:outline-primary-40"
              />
              <WhaleButton
                variant={!isAnalyzingRegionData ? "secondary" : "disabled"}
                onClick={handleUpload}
                disabled={isAnalyzingRegionData}
                className="hover:bg-primary-20 hover:text-primary-100"
              >
                {isAnalyzingRegionData ? "Đang phân tích..." : "Phân tích"}
              </WhaleButton>
            </div>
          )}
        </div>
        <div className="w-3/5 h-full flex flex-col gap-4 ">
          {(!isAnalyzingRegionData) ? (
            regionData?.data ? <ReligionInformation religion={regionData.data} /> : <div className="flex flex-col justify-center items-center h-full mb-48"></div>
          ) :  <div className="flex flex-col justify-center items-center h-full mb-48">
          <video
             src="/home/ai_analyzing.mp4"
             autoPlay={true}
             muted={true}
             loop={true}
             width={300}
           ></video>
           <h2 className="text-xl font-semibold text-center">
             AI đang phân tích hình ảnh của bạn
           </h2>
          </div>}

        
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
