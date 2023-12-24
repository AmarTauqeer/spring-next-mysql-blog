import React, { useContext, useEffect, useState } from "react";
import { PostList } from "../../../components/index";
import { useParams } from "next/navigation";
import { UserContext } from "@/components/UserContext";
import Link from "next/link";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  let categoryId = "";
  if (params) {
    console.log(params.categoryId);
    categoryId = params.categoryId;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const userInfo = useContext(UserContext);
  // console.log(baseUrl);

  const getPosts = async () => {
    const response = await fetch(`${baseUrl}/post`);
    const res = await response.json();
    if (categoryId && res) {
      // console.log(res[1].category.categoryId);

      const filterPosts = res.filter(
        (r) => r.category.categoryId == categoryId
      );
      if (categoryId !== "all") {
        setPosts(filterPosts);
      } else {
        setPosts(res);
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, [categoryId]);

  return (
    <>
      {userInfo.length !== 0 ? (
        <PostList posts={posts} />
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

export default Index;
