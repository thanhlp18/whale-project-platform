import ReligionInformation from "@/components/home/religionInformation";
import UploadPicture from "@/components/home/uploadPicture";
import HomeLayout from "@/layout/homeLayout";
import { Religion } from "@prisma/client";
import React, { useState } from "react";

const Home: React.FC = () => {
  const dummyReligion: Religion = {
    id: "1",
    name: "Đạo Phật",
    origin: "Ấn Độ cổ đại",
    description:
      "Đạo Phật là một tôn giáo và triết lý bắt nguồn từ Ấn Độ vào khoảng thế kỷ VI TCN. Tôn giáo này được truyền bá vào Việt Nam qua Trung Hoa và có ảnh hưởng lớn đến văn hóa và đạo đức người Việt.",
    specialFestival:
      "Chủ yếu ở châu Á, đặc biệt là Việt Nam, Trung Quốc, Nhật Bản, và Đông Nam Á.",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Automatically upload the image after selection
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Upload successful");
        // Handle successful upload
      } else {
        console.error("Upload failed");
        // Handle upload failure
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    } finally {
      setUploading(false);
    }
  };

  return (
    <HomeLayout>
      <div className="flex flex-row items-center justify-center w-full h-full p-4 gap-12">
        <div className="w-2/5 h-full bg-pattern-3 before-overlay rounded-lg overflow-hidden">
          <UploadPicture
            selectedImage={selectedImage}
            uploading={uploading}
            handleImageChange={handleImageChange}
            handleUpload={handleUpload}
          />
        </div>
        <div className="w-3/5 h-full">
          <ReligionInformation religion={dummyReligion} />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
