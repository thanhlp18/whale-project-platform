"use client";
import { getTokenFromServerSideProps } from "@/auth/jwt";
import { routeMap } from "@/auth/utils/routeMap";
import Editor from "@/components/blog/editor";
import { env } from "@/env.mjs";
import HomeLayout from "@/layout/homeLayout";
import { PublicReligionImage } from "@/lib/common/types/imageAnalyzing";
import { useCreateNewPostMutation } from "@/redux/services/blogApi";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import slugify from "react-slugify";

type WritePostProps = {
  regionImage?: PublicReligionImage;
};

const WritePost = ({ regionImage }: WritePostProps) => {
  const [createNewPost, { isSuccess }] = useCreateNewPostMutation();
  const [markdownContent, setMarkdownContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<File | string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  useEffect(() => {
    if (regionImage) {
      const fetchImage = async () => {
        console.log(regionImage);
        setTitle(regionImage.religion.name);
        regionImage.religion.description &&
          setDescription(regionImage.religion.description);
      };
      fetchImage();
    }
  }, [regionImage]);

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
      let postSlug = `${slugify(title)}-${Date.now()}`;
      if (postSlug.length > 255) {
        postSlug = postSlug.substring(0, 200);
      }
      // Create the post initially without the image
      const postData = {
        title,
        description,
        slug: postSlug,
        content: markdownContent,
      };
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("slug", postSlug);
      formData.append("content", markdownContent);
      if (coverImage) {
        formData.append("file", coverImage);
      }
      await createNewPost(formData)
        .unwrap()
        .then((res) => {
          toast.success("Post created successfully");

          router.push(`/blogs/${res?.data?.slug}`);
        });
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
          <div className="mb-4 p-3 bg-red-600 text-white rounded-md">
            {error}
          </div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const regionRefId = query.regionRefId || null;

  if (!regionRefId)
    return {
      props: {
        regionImage: null,
      },
    };
  const token = getTokenFromServerSideProps(context.req);

  const regionImage = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/religions/${regionRefId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);
  return {
    props: {
      regionImage: regionImage,
    },
  };
};

export default WritePost;
