import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../features/authSlice";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const useData = await authService.createAccount(data);
      if (useData) {
        const useDatas = await authService.getCurrentUser();
        if (useDatas) {
          dispatch(login(useDatas));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base pb-2 text-black/60">
          If you have already account
          <Link
            to="/login"
            className="font-medium text-primary text-black transition-all duration-200 hover:underline mx-1"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5 inline-block md:flex md:flex-col md:items-center md:justify-center  w-full ">
            <label className="mx-5 block md:flex text-md items-center md:whitespace-nowrap md:overflow-hidden">
              Full Name:
              <Input
                className="md:mx-2 text-md"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </label>
            {errors.name && (
              <p className=" bg-red-400 rounded-md p-1 ">
                {errors.name.message}
              </p>
            )}
            <label className="md:flex block mx-5 md:items-center">
              Email:
              <Input
                placeholder="Enter your email"
                type="email"
                className="md:ml-7 mr-1 flex py-1 text-md"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
            </label>
            {errors.email && (
              <p className=" bg-red-400 rounded-md p-1 ">
                {errors.email.message}
              </p>
            )}
            <label className="md:flex block mx-5 md:items-center">
              Password:
              <Input
                type="password"
                placeholder="Enter your password"
                className="md:mx-4 text-md"
                {...register("password", {
                  required: "passwrod is required",
                  minLength: {
                    value: 8,
                    message: "password must be 8 character",
                  },
                })}
              />
            </label>
            {errors.password && (
              <p className=" bg-red-400 rounded-md p-1 ">
                {errors.password.message}
              </p>
            )}
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
