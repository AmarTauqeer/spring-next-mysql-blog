import { PhotoIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import Link from "next/link";
import React from "react";

const PostList = ({ posts }) => {
  const folderPath = process.env.NEXT_PUBLIC_FOLDER_PATH;
  return (
    <>
      {posts &&
        posts.map((post) => (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex justify-center items-center">
                {post.postImage && post.postImage ? (
                  <>
                    <img
                      src={`${folderPath}` + post.postImage}
                      alt={post.postName}
                      className="object-center ml-1 h-full object-cover w-64 shadow-lg rounded-t-lg lg:rounded-lg"
                    />
                  </>
                ) : (
                  <PhotoIcon
                    className="object-center ml-1 h-full object-cover w-64 shadow-lg rounded-t-lg lg:rounded-lg"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div>
                <h1
                  className="transition duration-100 text-center mb-8 cursor-pointer hover:text-pink-600 
              text-3xl font-semibold"
                >
                  <Link href={`/post/${post.postId}`}>{post.postName}</Link>
                </h1>
                <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
                  <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                    <img
                      alt={post.user.userName}
                      height="30px"
                      width="30px"
                      className="align-middle rounded-full"
                      src={`${folderPath}` + post.user.userImage}
                    />
                    <p className="inline align-middle text-gray-700 ml-2 text-lg">
                      {post.user.userName}
                    </p>
                  </div>
                  <div className="font-medium text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline mr-2 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
                  </div>
                </div>
                <div className="text-center">
                  <Link href={`/post/${post.postId}`}>
                    <span
                      className="transition duration-500 transform 
            hover:-translate-y-1 inline-block bg-pink-600 text-smlg font-medium rounded-full text-white px-6 
            py-2 cursor-pointer my-4"
                    >
                      Continue Reading
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <hr className="mb-4 mt-4" />
          </>
        ))}
    </>
  );
};

export default PostList;
