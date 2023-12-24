import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const userInfo = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload(false);
    router.push("/login");
  };

  return (
    <>
      <header className="sticky left-0 top-0 p-2 bg-white md:flex md:items-center md:justify-between mb-3">
        <div className="container flex flex-wrap p-1 flex-col md:flex-row items-center ">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-cyan-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-2 text-l md:text-xl lg:text-xl">
              Spring Boot, MySQL, NextJS Blog
            </span>
          </Link>
          <span className="text-xl cursor-pointer md:hidden block">
            {open ? (
              <ion-icon name="close-outline" onClick={handleClick}></ion-icon>
            ) : (
              <ion-icon name="menu-outline" onClick={handleClick}></ion-icon>
            )}
          </span>
          <ul
            className="mx-auto md:flex md:items-center z-[-] md:z-auto md:static absolute bg-white w-full md:w-auto md:py-0 
            py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[400px] transition-all ease-in duration-500"
          >
            <li className="mx-4 my-4 md:my-0">
              <Link
                className="text-sm hover:text-cyan-500 duration-500"
                href={{
                  pathname: `/`,
                }}
              >
                Home
              </Link>
            </li>

            {userInfo && userInfo.user ? (
              <>
                <li className="mx-4 my-4 md:my-0">
                  <Link
                    className="text-sm hover:text-cyan-500 duration-500"
                    href="/post"
                  >
                    Post
                  </Link>
                </li>
                <li className="mx-4 my-4 md:my-0">
                  <Link
                    className="text-sm hover:text-cyan-500 duration-500"
                    href="/post/create"
                  >
                    Post Create
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

            <li className="mx-4 my-4 md:my-0">
              <Link
                className="text-sm hover:text-cyan-500 duration-500"
                href="/contact"
              >
                Contact
              </Link>
            </li>
            {console.log(userInfo)}
            {userInfo.length == 0 && (
              <Link
                className="bg-cyan-400 text-white font-semibold font-[Poppins] 
                duration-500 px-4 py-1 mx-2 hover:bg-cyan-500 rounded"
                href="/login"
              >
                Login
              </Link>
            )}
            {userInfo.length !== 0 && userInfo !== undefined && (
              <div className="flex items-center justify-center">
                <li className="mx-4 my-4 md:my-0">
                  <Link
                    className="text-sm hover:text-cyan-500 duration-500"
                    href="/update-profile"
                  >
                    Update Profile
                  </Link>
                </li>
                <span className="text-md font-semibold text-gray-500">
                  {userInfo.length !== 0 && userInfo !== undefined ? (
                    <>
                      <div className="flex items-end justify-end mb-4 lg:mb-0 lg:w-auto">
                        <img
                          alt={userInfo.user.userName}
                          height="30px"
                          width="30px"
                          className="align-middle rounded-full"
                          src={
                            process.env.NEXT_PUBLIC_FOLDER_PATH +
                            userInfo.user.userImage
                          }
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </span>
                <button
                  className="bg-cyan-400 text-white font-semibold font-[Poppins] 
            duration-500 px-4 py-1 mx-2 hover:bg-cyan-500 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
          {open && (
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <ul className="absolute bg-white min-h-[35vh] left-0 top-[70%] w-60">
                <li className="mx-4 my-4 md:my-0">
                  <Link
                    className="text-sm hover:text-cyan-500 duration-500"
                    href="/"
                    onClick={handleClick}
                  >
                    Home
                  </Link>
                </li>
                {userInfo && userInfo.user ? (
                  <>
                    <li className="mx-4 my-4 md:my-0">
                      <Link
                        className="text-sm hover:text-cyan-500 duration-500"
                        href="/post"
                        onClick={handleClick}
                      >
                        Post
                      </Link>
                    </li>
                    <li className="mx-4 my-4 md:my-0">
                      <Link
                        className="text-sm hover:text-cyan-500 duration-500"
                        href="/post/create"
                        onClick={handleClick}
                      >
                        Post Create
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
                <li className="mx-4 my-4 md:my-0">
                  <Link
                    className="text-sm hover:text-cyan-500 duration-500"
                    href="/contact"
                    onClick={handleClick}
                  >
                    Contact
                  </Link>
                </li>
                {userInfo.length == 0 && (
                  <Link
                    className="bg-cyan-400 text-white font-semibold font-[Poppins] 
                duration-500 px-4 py-1 mx-2 hover:bg-cyan-500 rounded"
                    href="/login"
                    onClick={handleClick}
                  >
                    Login
                  </Link>
                )}
                {userInfo && userInfo.user && (
                  <div className="flex items-center justify-center">
                    <span className="text-md font-semibold text-gray-500">
                      <>
                        <div className="flex items-end justify-end mb-4 lg:mb-0 lg:w-auto">
                          <img
                            alt={userInfo.user.userName}
                            height="30px"
                            width="30px"
                            className="align-middle rounded-full"
                            src={
                              process.env.NEXT_PUBLIC_FOLDER_PATH +
                              userInfo.user.userImage
                            }
                          />
                          <button
                            className="bg-cyan-400 text-white font-semibold font-[Poppins] duration-500 px-4 py-1 
                      mx-2 hover:bg-cyan-500 rounded"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </div>
                      </>
                    </span>
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
