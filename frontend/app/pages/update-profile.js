import React, { useEffect, useState, useRef, useContext } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import moment from "moment";
import { UserContext } from "@/components/UserContext";
import Link from "next/link";

const UpdateProfile = () => {
  const router = useRouter();

  const [imagePreviw, setImagePreview] = useState("");
  const [savedImage, setSavedImage] = useState("");
  const [file, setFile] = useState("");
  const inputRef = useRef(null);
  const userInfo = useContext(UserContext);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      userName: "",
      userFirstName: "",
      userLastName: "",
      email: "",
      userImage: "",
      createdAt: "",
      password: "",
    },
  });

  const onChangePicture = (e) => {
    let currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    let date = year + "-" + month + "-" + day;
    setValue("userImage", date + "-" + e.target.files[0].name);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleCancel = () => {
    router.push(`/post`);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("userName", data.userName);
    formData.append("userFirstName", data.userFirstName);
    formData.append("userLastName", data.userLastName);
    formData.append("email", data.email);
    formData.append("userImage", data.userImage);
    // formData.append("createdAt", data.createdAt);

    const response = await fetch(`${baseUrl}/user/update`, {
      method: "PUT",
      Authorization: `Bearer ${userInfo.jwtToken}`,
      body: formData,
    });
    // console.log(await response.json())
    const res = await response.json();
    if (res) {
      // console.log(data.password);
      const response = await fetch(`${baseUrl}/authenticate`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          userName: res.userName,
          userPassword: data.password,
        }),
      });

      if (response.status == 401) {
        alert("Password is not correct.");
        return false;
      } else {
        const loginResponse = await response.json();
        console.log(loginResponse);

        if (loginResponse) {
          // make a request for login

          localStorage.setItem("userInfo", JSON.stringify(loginResponse));

          router.push("/post");
          return true;
        } else {
          alert("There are some errors to update the record.");
          return false;
        }
      }
    }
  };

  useEffect(() => {
    if (userInfo !== undefined && userInfo.length !== 0) {
      //   console.log(userInfo.user.userImage)
      setValue("userName", userInfo.user.userName);
      setValue("userFirstName", userInfo.user.userFirstName);
      setValue("userLastName", userInfo.user.userLastName);
      setValue("email", userInfo.user.email);
      setValue("createdAt", userInfo.user.createdAt);
      setValue("userImage", userInfo.user.userImage);
      setSavedImage(userInfo.user.userImage);
    }
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
                  Update Profile
                </h1>
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-12 gap-x-2 gap-y-8 md:grid-cols-12 sm:grid-cols-8">
                    {/* <div className="ml-2 md:ml-0 mr-2 text-sm md:text-md col-span-6">
                      <label
                        htmlFor="userName"
                        className="ml-2 md:ml-0 block text-sm font-medium leading-6 text-gray-900"
                      >
                        User Name
                      </label>
                      <div className="mt-2">
                        <div className="ml-2 md:ml-0 text-sm md:text-md flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            autoComplete="userName"
                            className="text-sm md:text-md block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="enter user name"
                            {...register("userName", {
                              required: true,
                            })}
                          />
                        </div>
                      </div>
                    </div> */}

                    <div className="ml-2 md:ml-0 mr-2 text-sm md:text-md col-span-6">
                      <label
                        htmlFor="userFirstName"
                        className="ml-2 md:ml-0 text-sm md:text-md block font-medium leading-6 text-gray-900"
                      >
                        First Name
                      </label>
                      <div className="ml-2 md:ml-0 text-sm md:text-md flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          autoComplete="userFirstName"
                          className="text-sm md:text-md block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                          placeholder="enter first name"
                          {...register("userFirstName", {
                            required: false,
                          })}
                        />
                      </div>
                    </div>
                    <div className="ml-2 md:ml-0 mr-2 text-sm md:text-md col-span-full">
                      <label
                        htmlFor="userLastName"
                        className="ml-2 md:ml-0 text-sm md:text-md block font-medium leading-6 text-gray-900"
                      >
                        Last Name
                      </label>
                      <div className="ml-2 md:ml-0 text-sm md:text-md flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          autoComplete="userFirstName"
                          className="text-sm md:text-md block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                          placeholder="enter last name"
                          {...register("userLastName", {
                            required: false,
                          })}
                        />
                      </div>
                    </div>
                    <div className="ml-2 md:ml-0 mr-2 text-sm md:text-md col-span-full">
                      <label
                        htmlFor="email"
                        className="ml-2 md:ml-0 text-sm md:text-md block font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="ml-2 md:ml-0 text-sm md:text-md flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="email"
                          autoComplete="userFirstName"
                          className="text-sm md:text-md block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                          {...register("email", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="ml-2 md:ml-0 text-sm md:text-md block font-medium leading-6 text-gray-900"
                      >
                        User Image
                      </label>
                      <div className="ml-2 md:ml-0 mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <input
                          type="hidden"
                          autoComplete="userImage"
                          className="ml-2 text-sm md:text-md block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="image path"
                          {...register("userImage", {
                            required: false,
                          })}
                        />
                        {imagePreviw &&
                        imagePreviw !== null &&
                        imagePreviw !== "" ? (
                          <>
                            <img src={imagePreviw} height={100} width={100} />
                          </>
                        ) : (
                          <>
                            {console.log(savedImage)}
                            {savedImage &&
                            savedImage !== null &&
                            savedImage !== "" ? (
                              <>
                                <img
                                  src={
                                    process.env.NEXT_PUBLIC_FOLDER_PATH +
                                    savedImage
                                  }
                                  height={60}
                                  width={60}
                                />
                              </>
                            ) : (
                              <PhotoIcon
                                className="mx-auto h-12 w-12 text-gray-300"
                                aria-hidden="true"
                              />
                            )}
                          </>
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
                              <span>Change/Upload a file</span>
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
                      <div className="ml-2 mt-4 md:ml-0 mr-2 text-sm md:text-md col-span-6">
                        <label
                          htmlFor="password"
                          className="ml-2  mb-2 md:ml-0 text-sm md:text-md block font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="ml-2 md:ml-0 text-sm md:text-md flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="password"
                            autoComplete="password"
                            className="text-sm md:text-md block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                            placeholder="enter password"
                            {...register("password", {
                              required: true,
                            })}
                          />
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

export default UpdateProfile;
