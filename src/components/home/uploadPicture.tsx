// src/components/UploadPicture.tsx
import WhaleButton from "@/components/systemDesign/button";
import React from "react";

type UploadPictureProps = {
  selectedImage: string | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: (file: File) => Promise<void>;
};

const UploadPicture: React.FC<UploadPictureProps> = ({
  selectedImage,
  handleImageChange,
}) => {
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Upload Picture</h2>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
        className="mb-4 hidden"
        id="file-upload"
      />

      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-white py-2 px-4 border-2 border-gray-200 rounded-lg text-primary-80 hover:text-primary-100 active:text-primary-100 font-semibold"
      >
        Choose File or Take Picture
      </label>
      {selectedImage && (
        <div className="mt-4">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-64 h-64 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default UploadPicture;
