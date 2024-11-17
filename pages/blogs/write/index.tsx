"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { createPost, uploadImage } from "@/lib/client/blogApi";
import slugify from "react-slugify";
import dynamic from "next/dynamic";
import Editor from "@/components/blog/editor";
import HomeLayout from "@/layout/homeLayout";
import { routeMap } from "@/auth/utils/routeMap";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});

const WritePost = () => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  // Handle image upload and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setCoverImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  // Handle post submission
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Create slug from the title
      const postSlug = slugify(title);
      // Create the post initially without the image
      const postData = {
        title,
        description,
        slug: postSlug,
        content: markdownContent,
      };

      // Step 1: Create the blog post without the cover image
      const postResponse = await createPost(postData);
      const postId = postResponse.id;
      console.log(postId);

      // Step 2: Upload cover image (if provided) and associate with blog post
      if (coverImage) {
        const uploadedImage = await uploadImage(coverImage, postId);
        console.log("Image uploaded:", uploadedImage);
      }

      // Redirect after successful post creation
      router.push(`/blogs/${postSlug}`);
      toast.success("Post created successfully");
    } catch (error) {
      console.error("Failed to create post:", error);
      setError("Failed to create post. Please try again.");
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <HomeLayout>
     <div className="max-w-screen-lg mx-auto p-4">
      <button
        onClick={() => router.push(routeMap.login.allBlogs)}
        className="text-primary-80 hover:text-primary-100 mb-6 flex items-center space-x-2"
      >
        <FaArrowLeft /> <span>Trở về</span>
      </button>

      <h1 className="text-xl font-bold mb-4 text-blue-70 font-jet-brains">
       Thêm bài viết mới
      </h1>
      {/* Render a message if there is an error */}
      {error && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-md">{error}</div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nhập tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 font-jet-brains text-3xl font-semibold bg-white rounded-lg text-blue-950 border-b border-gray-600 focus:border-primary-100 focus:outline-none placeholder-gray-400"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Nhập mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 font-jet-brains bg-white rounded-lg font-semibold text-blue-950 border-b border-gray-600 focus:border-primary-100 focus:outline-none placeholder-gray-400"
        />
      </div>
      <div className="mb-6">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 hidden"
        id="file-upload"
        required
      />

      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-white py-2 px-4 border-2 border-gray-200 rounded-lg text-primary-80 hover:text-primary-100 active:text-primary-100 font-semibold"
      >
        Chọn ảnh bìa cho bài viết
      </label>
        {imagePreview && (
          <div className="mt-4">
            <Image
              src={imagePreview}
              alt="Selected Cover"
              width="100"
              height="100"
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        {/* <MarkdownEditor
          value={markdownContent}
          height="200px"
          onChange={(value) => setMarkdownContent(value)}
          className="bg-white rounded-lg text-gray-100"
        /> */}
        <Editor onChange={(value) => setMarkdownContent(value)} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || (!title && !description)}
        className="bg-primary-80 text-gray-100 py-2 px-4 rounded-md font-semibold hover:bg-primary-100"
      >
        {isLoading ? "Loading" : "Post"}
      </button>
    </div>
   </HomeLayout>
  );
};

export default WritePost;
