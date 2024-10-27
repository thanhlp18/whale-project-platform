import React, { useState } from 'react';

const UploadPicture: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
                setSelectedFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = async () => {
        if (!selectedFile) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Upload successful');
                // Handle successful upload
            } else {
                console.error('Upload failed');
                // Handle upload failure
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Upload Picture</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 hidden"
                id="file-upload"
            />
            <label
                htmlFor="file-upload"
                className="cursor-pointer py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded mb-4"
            >
                Choose File
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
            <button
                onClick={handleUploadClick}
                className={`mt-4 py-2 px-4 rounded ${uploading ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'} text-white`}
                disabled={uploading}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default UploadPicture;