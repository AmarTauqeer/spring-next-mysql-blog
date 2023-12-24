import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [all, setAll] = useState(false);
  const userInfo = useContext(UserContext);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(baseUrl);

  const getCategories = async () => {
    const response = await fetch(`${baseUrl}/category`);
    const res = await response.json();
    // console.log(res);
    setCategories(res);
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {userInfo.length !== 0 ? (
        <>
          <div className="bg-white shadow-lg rounded-lg p-8 pb-12">
            <h3 className="text-md mb-4 font-semibold border-b pb-2">
              Categories
            </h3>

            {categories.length > 0 &&
              categories.map((category) => (
                <Link
                  key={category.categoryId}
                  href={`/post/category/${category.categoryId}`}
                >
                  <span className="cursor-pointer block pb-2 mb-2 text-sm">
                    {category.categoryName}
                  </span>
                </Link>
              ))}
            <Link href={`/post/category/all`}>
              <span className="cursor-pointer block pb-2 mb-2 text-sm">
                All
              </span>
            </Link>
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

export default Category;
