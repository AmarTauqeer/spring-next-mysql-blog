import React, { useEffect, useState, useRef, useContext } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { UserContext } from "@/components/UserContext";
import Link from "next/link";

const PostCreate = () => {
  const router = useRouter();

  const [categoryData, setCategoryData] = useState([]);
  const [imagePreviw, setImagePreview] = useState("");
  const [savedImage, setSavedImage] = useState("");
  const [file, setFile] = useState("");
  const inputRef = useRef(null);
  const userInfo = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      postName: "",
      postContent: "",
      postImage: "",
      categoryId: 1,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // console.log(baseUrl);

  const onChangePicture = (e) => {
    let currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    let date = year + "-" + month + "-" + day;
    setValue("postImage", date + "-" + e.target.files[0].name);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleCancel = () => {
    router.push(`/post`);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("postName", data.postName);
    formData.append("postContent", data.postContent);
    formData.append("postImage", data.postImage);
    formData.append("category.categoryId", parseInt(data.categoryId));
    formData.append("user.userName", userInfo.user.userName);

    const response = await fetch(`${baseUrl}/post`, {
      method: "POST",
      Authorization: `Bearer ${userInfo.jwtToken}`,
      body: formData,
    });
    const res = await response.json();
    console.log(res);
    if (res) {
      router.push("/post");
      return true;
    } else {
      alert("There are some errors to insert the record.");
      return false;
    }
  };

  const fetchCategory = async () => {
    const response = await fetch(`${baseUrl}/category`);
    const res = await response.json();
    setCategoryData(res);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      {userInfo.length !== 0 ? (
        <>
          <div className="container bg-white rounded-2xl">
            <form
              className="flex justify-center items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-12 mr-2">
                <h1 className="font-semibold text-md flex justify-center items-center mt-5 md:text-xl">
                  Post Create
                </h1>
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-12 gap-x-2 gap-y-8 md:grid-cols-12 sm:grid-cols-8">
                    <div className="col-span-6">
                      <label
                        htmlFor="postTitle"
                        className="ml-2 md:ml-0 block text-sm font-medium leading-6 text-gray-900"
                      >
                        Post Title
                      </label>
                      <div className="mt-2">
                        <div className="ml-2 md:ml-0 text-sm md:text-md flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            autoComplete="postName"
                            className="text-sm md:text-md block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="enter post title"
                            {...register("postName", {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="text-rose-400">
                          {errors.postName?.type === "required" &&
                            "Post title is required"}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="category"
                        className="ml-2 md:ml-0 block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-2">
                        <select
                          className="ml-2 md:ml-0 text-sm md:text-md flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                          {...register("categoryId", {
                            required: "Category is required.",
                          })}
                        >
                          <option value="">Select...</option>
                          {categoryData !== undefined &&
                            categoryData.map((x) => {
                              return (
                                <>
                                  <option value={x.categoryId}>
                                    {x.categoryName}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                        <div className="text-rose-400">
                          {errors.categoryId?.message}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Post Content
                      </label>
                      <div className="mt-2">
                        <textarea
                          rows={10}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                          {...register("postContent", {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="text-rose-400">
                        {errors.postContent?.type === "required" &&
                          "Post content is required"}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Post Image
                      </label>
                      <div className="ml-2 md:ml-0 mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <input
                          type="hidden"
                          autoComplete="postImage"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="image path"
                          {...register("postImage", {
                            required: false,
                          })}
                        />
                        {imagePreviw && imagePreviw ? (
                          <>
                            <img src={imagePreviw} height={100} width={100} />
                          </>
                        ) : (
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      <div className="ml-2 md:ml-0 mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file"
                                name="file"
                                type="file"
                                className="sr-only"
                                ref={inputRef}
                                onChange={onChangePicture}
                              />
                            </label>
                            {/* <p className="pl-1">or drag and drop</p> */}
                          </div>
                          {/* <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-sm font-semibold leading-6 text-gray-900  mb-4"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold 
              text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-indigo-600  mb-4"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
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

export default PostCreate;
