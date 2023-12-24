import moment from "moment";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { UserContext } from "@/components/UserContext";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";

const PostDetail = () => {
  const params = useParams();
  let postId = "";
  if (params) {
    console.log(params.postId);
    postId = params.postId;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      description: "",
    },
  });

  const router = useRouter();
  const userInfo = useContext(UserContext);

  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const [visible, setVisible] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // console.log(baseUrl);

  const getPosts = async () => {
    const response = await fetch(`${baseUrl}/post/${postId}`);
    if (response.status === 200) {
      const res = await response.json();
      console.log(res.comments);

      if (res && userInfo.length != 0) {
        if (res.user.userName === userInfo.user.userName) {
          setVisible(true);
        }
        setPost(res);
        setComment(res.comments);
      }
    }
  };

  const handleEdit = (e) => {
    if (postId > 0) {
      console.log(postId);
      router.push(`/post/post-edit/${postId}`);
    }
  };

  const handleDelete = (e) => {
    if (postId > 0) {
      console.log(postId);

      const deletePost = async () => {
        const response = await fetch(`${baseUrl}/post/delete/${postId}`, {
          method: "DELETE",
        });
        // const res = await response.json();
        if (response.status == 200) {
          router.push(`/post`);
        } else {
          alert("There are issues to delete this record.");
          return false;
        }
        return true;
      };
      deletePost();
    }
  };
  const onSubmit = async (data) => {
    const response = await fetch(`${baseUrl}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      Authorization: `Bearer ${userInfo.jwtToken}`,
      // body:formData
      body: JSON.stringify({
        description: data.description,
      }),
    });

    const res = await response.json();
    console.log(res);

    // assign comment to post

    if (res) {
      const assignResponse = await fetch(
        `${baseUrl}/post/assign-post-comment/${postId}/${res.commentId}/${userInfo.user.userName}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          Authorization: `Bearer ${userInfo.jwtToken}`,
        }
      );
      const assignRes = await assignResponse.json();
      if (assignRes) {
        setValue("description", "");
        getPosts();
      }
    }
  };

  useEffect(() => {
    if (postId !== undefined || postId !== "") {
      getPosts();
    }
  }, [postId]);

  return (
    <>
      {userInfo.length !== 0 ? (
        <>
          <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 m-2 md:m-0">
            {post && post !== undefined && (
              <>
                <div className="overflow-hidden shadow-md mb-6 m-2">
                  {post.postImage && post.postImage ? (
                    <img
                      src={process.env.NEXT_PUBLIC_FOLDER_PATH + post.postImage}
                      alt={post.postName}
                      className="object-center ml-1 h-full object-cover w-64 shadow-lg rounded-t-lg lg:rounded-lg"
                    />
                  ) : (
                    <PhotoIcon
                      className="object-center ml-1 h-full object-cover w-64 shadow-lg rounded-t-lg lg:rounded-lg"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="px-4 lg:px-0">
                  <div className="flex items-center mb-8">
                    <div className="flex items-center justify-center mb-4 lg:mb-0 lg:w-auto mr-8">
                      <img
                        alt={post.user.userName}
                        height="40px"
                        width="40px"
                        className="align-middle rounded-full"
                        src={
                          process.env.NEXT_PUBLIC_FOLDER_PATH +
                          post.user.userImage
                        }
                      />
                      <p className="inline align-middle text-gray-700 ml-2 mr-2 text-lg">
                        {post.user.userName}
                      </p>
                    </div>
                    <div className="font-sm text-gray-700">
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
                      <span>
                        {moment(post.createdAt).format("MMM DD, YYYY")}
                      </span>
                    </div>
                  </div>
                  {visible && (
                    <>
                      <div className="flex justify-center items-center mb-3 md:mb-0 md:justify-end">
                        <button
                          className="bg-orange-600 text-white font-semibold font-[Poppins] duration-500 
                px-4 py-1 hover:bg-orange-700 rounded"
                          onClick={() => handleEdit()}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-rose-600 text-white font-semibold font-[Poppins] duration-500 
                px-4 py-1 mx-2 hover:bg-rose-700 rounded"
                          onClick={() => handleDelete()}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}

                  <h1 className="mb-8 text-3xl font-semibold text-center">
                    {post.postName}
                  </h1>
                  {post.postContent}
                </div>
              </>
            )}
            <div className="max-w-xl mt-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <span className="text-md ml-2 md:ml-0 md:text-xl font-semibold">
                    Comment
                  </span>
                </div>

                <div className="flex mb-2 p-2 rounded-lg bg-gray-200">
                  <div className="flex items-start mb-4 lg:mb-0 lg:w-auto">
                    <img
                      alt={userInfo.user.userName}
                      height="40px"
                      width="40px"
                      className="align-middle rounded-full"
                      src={
                        process.env.NEXT_PUBLIC_FOLDER_PATH +
                        userInfo.user.userImage
                      }
                    />
                  </div>
                  <input
                    type="text"
                    autoComplete="description"
                    className="text-sm md:text-md block border-0 flex-1 bg-transparent py-3 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="enter your comment"
                    {...register("description", {
                      required: false,
                    })}
                  />
                  <button
                    className="bg-cyan-700 text-white font-semibold font-[Poppins] duration-500 
                px-3  hover:bg-cyan-300 rounded-xl"
                    onClick={() => handleSubmit(onSubmit)}
                  >
                    <MdSend size={25} />
                  </button>
                </div>
                <div className="flex flex-col p-2 md:p-0">
                  {comment !== undefined &&
                    comment.map((c) => (
                      <div className="border border-blue-500 rounded-xl pl-2 mb-2 py-3 bg-gray-200">
                        <span className="font-semibold text-xl mb-2">
                          <div className="flex items-start mb-4 lg:mb-0 lg:w-auto mr-8">
                            <img
                              alt={c.user.userName}
                              height="40px"
                              width="40px"
                              className="align-middle rounded-full"
                              src={
                                process.env.NEXT_PUBLIC_FOLDER_PATH +
                                c.user.userImage
                              }
                            />
                            <p className="inline align-middle text-gray-700 ml-2 mr-2 text-lg">
                              {c.user.userName}
                            </p>
                          </div>
                        </span>
                        <div className="mt-3 mb-3" key={c.commentId}>
                          {c.description}
                        </div>
                        <span className="mt-2 text-sm">
                          {c.createdAt !== null && c.createdAt}
                        </span>
                      </div>
                    ))}
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center h-screen bg-white">
            <span className="font-semibold text-xl">
              You are not logged in.
            </span>
            <div className="font-semibold text-2xl text-blue-800 pl-6 cursor-pointer hover:text-cyan-800">
              <Link href={"/login"}>Login</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostDetail;
