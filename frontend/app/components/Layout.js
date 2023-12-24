import React, { useEffect, useState } from "react";
import { Header, Category } from "./index";
import { UserContext } from "./UserContext";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [isCategory, setIsCategory] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const router =useRouter();

  useEffect(() => {
    let page = children.type.name;
    if (page == "Post" || page == "Index") {
      setIsCategory(true);
    } else {
      setIsCategory(false);
    }

    let userData = JSON.parse(localStorage.getItem("userInfo"));

    if (userData) {
      console.log(userData)
      setUserInfo(userData);
    }
    
  }, [children]);


  return (
    <>
      <UserContext.Provider value={userInfo}>
        <div className="container w-full max-auto">
          <Header />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {isCategory == true ? (
              <>
                <div className="lg:col-span-4 col-span-1">
                  <div className="top-8 ml-1 mr-1 md:ml-0 md:mr-0">
                    <Category />
                  </div>
                </div>
                <div className="lg:col-span-8 col-span-1">{children}</div>
              </>
            ) : (
              <div className="lg:col-span-12">{children}</div>
            )}
          </div>
        </div>
      </UserContext.Provider>
    </>
  );
};

export default Layout;
