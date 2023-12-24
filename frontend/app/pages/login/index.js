import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: "",
      userPassword: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const response = await fetch(`${baseUrl}/authenticate`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        userName: data.userName,
        userPassword: data.userPassword,
      }),
    });
    if (response.status == 401) {
      alert("Invalid username or password.");
      return false;
    }
    if (response.status == 200) {
      const res = await response.json();
      // console.log(res)
      localStorage.setItem("userInfo", JSON.stringify(res));
      router.push("/");
      return true;
    } else {
      console.log("There are some issues to register.");
      return false;
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-cyan-500 w-96 p-6 rounded shadow-sm">
          <div className="flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-16 h-16 text-white p-2 bg-green-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div className="flex items-center justify-center mb-4">
            <h3 className="text-white font-semibold text-xl">
              LOGIN TO YOUR ACCOUNT
            </h3>
          </div>
          <label className="text-white font-semibold">Name</label>
          <input
            className="w-full py-2 rounded bg-white px-1 outline-none"
            {...register("userName", { required: true })}
          />
          <div className="text-rose-900 mb-2">
            {errors.userName?.type === "required" && "Username is required"}
          </div>
          <label className="text-white font-semibold">Password</label>
          <input
            className="w-full py-2 rounded bg-white px-1 outline-none"
            type="password"
            {...register("userPassword", { required: true })}
          />
          <div className="text-rose-900 mb-2">
            {errors.userPassword?.type === "required" && "Password is required"}
          </div>

          <button
            className="w-full py-2 rounded bg-cyan-700 text-white font-semibold hover:bg-cyan-400 hover:text-white"
            type="submit"
            onSubmit={handleSubmit(onSubmit)}
          >
            LOGIN
          </button>
          <span className="flex items-end justify-end text-white font-semibold py-4">
            Don't have a account? &nbsp;
            <Link
              className="cursor-pointer hover:text-cyan-300"
              href="/register"
            >
              REGISTER
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
};

export default Login;
