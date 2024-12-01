// src/app/page.tsx
/* eslint-disable @next/next/no-img-element */
"use client";
import { routeMap } from "@/auth/utils/routeMap";
import Loader from "@/components/blog/Loader";
import Pagination from "@/components/blog/Pagination";
import WhaleButton from "@/components/systemDesign/button";
import HomeLayout from "@/layout/homeLayout";
import { BlogPost } from "@/lib/common/types/blog";
import { useLazyGetAllPostsQuery } from "@/redux/services/blogApi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [getAllPosts] = useLazyGetAllPostsQuery()
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the search query and page from the URL params
  const searchQuery = searchParams.get("search") ?? "";
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1; // Default to page 1 if not present

  useEffect(() => {
    const fetchPosts = async (page: number) => {
      try {
        const { posts, pagination } = await getAllPosts({ page, searchQuery })
          .unwrap()
          .then(
            (res) => res?.data || { posts: [], pagination: { pageCount: 1 } }
          );
        setPosts(posts);
        setTotalPages(pagination.pageCount); // Set total pages
      } catch (error) {
        setError("Error fetching posts.");
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(currentPage);
  }, [currentPage, searchQuery]); // Re-fetch when page or search query changes

  const handlePageChange = (newPage: number) => {
    // Update the page parameter in the URL
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    router.push(`?${newParams.toString()}`);
    setLoading(true); // Show loader while fetching
  };

  return (
    <HomeLayout>
      <div className="max-w-screen-lg h-full mx-auto p-4">
        {loading && (
   <div className=" bg-white h-screen w-full mx-auto flex items-center justify-center">
   <Loader />
 </div>
        )}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <>
            <WhaleButton
              variant="primary"
              onClick={() => router.push(routeMap.login.writeNewBlog)}
            >
              Tôi muốn viết
            </WhaleButton>
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="cursor-pointer bg-pattern-3 before-overlay-blue rounded-lg overflow-hidden border-gray-300 hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/blogs/${post.slug}`} className="block ">
                        {post.cover?.url && (
                          <div className="relative h-36 w-full">
                            <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4 shadow-sm">
                          <h2 className="text-lg font-bold font-jet-brains text-white line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-white opacity-80 mt-2 text-sm leading-6 line-clamp-3">
                            {post.description}
                          </p>
                          <p className="text-gray-10 text-sm mt-4 inline-block cursor-pointer hover:underline">
                            Read More
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No posts available at the moment.
                  </p>
                )}
              </div>

              {/* Pagination Controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange} // Update page when pagination changes
              />
            </div>
          </>
        )}
      </div>
    </HomeLayout>
  );
}
