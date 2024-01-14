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
          If you have allready account
          <Link
            to="/login"
            className="font-medium text-primary text-black transition-all duration-200 hover:underline mx-1"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className=" bg-red-400 rounded-md p-1 ">
                {errors.name.message}
              </p>
            )}
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email && (
              <p className=" bg-red-400 rounded-md p-1 ">
                {errors.email.message}
              </p>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "passwrod is required",
                minLength: {
                  value: 8,
                  message: "password must be 8 character",
                },
              })}
            />
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
