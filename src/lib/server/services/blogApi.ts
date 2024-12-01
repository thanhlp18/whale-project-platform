// lib/api.ts
import { UserBlogPostData } from "@/lib/common/types/blog";
import axios, { AxiosInstance } from "axios";

function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]); // Only return the Base64 part
      } else {
        reject(new Error("Failed to convert blob to base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob); // Read the Blob as a Base64 Data URL
  });
}

export const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}`,
});

export const getAllPosts = async (
  page: number = 1,
  searchQuery: string = ""
) => {
  try {
    // If search query exists, filter posts based on title
    const searchFilter = searchQuery
      ? `&filters[title][$containsi]=${searchQuery}`
      : ""; // Search filter with the title
    // Fetch posts with pagination and populate the required fields
    const response = await api.get(
      `api/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=${process.env.NEXT_PUBLIC_PAGE_LIMIT}${searchFilter}`
    );
    return {
      posts: response.data.data,
      pagination: response.data.meta.pagination, // Return data and include pagination data
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Server error"); // Error handling
  }
};

// Get post by slug
export const getPostBySlug = async (slug: string) => {
  try {
    const response = await api.get(
      `api/blogs?filters[slug]=${slug}&populate=*`
    ); // Fetch a single blog post using the slug parameter
    if (response.data.data.length > 0) {
      // If post exists
      return response.data.data[0]; // Return the post data
    }
    throw new Error("Post not found.");
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Server error");
  }
};

// Get all posts categories
export const getAllCategories = async () => {
  try {
    const response = await api.get("api/categories"); // Route to fetch Categories data
    return response.data.data; // Return all categories
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Server error");
  }
};

// Upload image with correct structure for referencing in the blog
export const uploadImage = async (image: File | string, refId: number) => {
  try {
    const formData = new FormData();
    if (typeof image === "string") {
      console.log("Image is a string", image);
      const imgBlob = await axios.get(image)
      console.log("Image blob:", imgBlob);
     
      

    } else {
      formData.append("files", image);
    }
    formData.append("ref", "api::blog.blog"); // ref: Strapi content-type name (in this case 'blog')
    formData.append("refId", refId.toString()); // refId: Blog post ID
    formData.append("field", "cover"); // field: Image field name in the blog

    const response = await api.post("api/upload", formData); // Strapi route to upload files and images
    const uploadedImage = response.data[0];
    return uploadedImage; // Return full image metadata
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};

// Create a blog post and handle all fields
export const createPost = async (postData: UserBlogPostData): Promise<{id: number}> => {
  try {
    const reqData = { data: { ...postData } }; // Strapi required format to post data
    const response = await api.post("api/blogs", reqData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};
