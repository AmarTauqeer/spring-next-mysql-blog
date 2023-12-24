import React, { useContext, useEffect, useState } from "react";
import { PostList } from "../../components/index";
import { UserContext } from "@/components/UserContext";
import Link from "next/link";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const userInfo = useContext(UserContext);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // console.log(baseUrl);

  const getPosts = async () => {
    const response = await fetch(`${baseUrl}/post`);
    const res = await response.json();
    setPosts(res);
  };

  useEffect(() => {
    getPosts();
  }, []);

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

export default Post;
