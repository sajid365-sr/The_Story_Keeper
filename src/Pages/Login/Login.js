import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="bg-gradient-to-bl from-[#270a6b] to-secondary flex justify-center items-center h-[90vh] rounded-2xl">
      <div className="w-2/6 bg-info py-10 rounded-lg bg-opacity-30">
        <h2 className="text-center mb-10 text-5xl text-gray-900">Login</h2>
        <form className="px-6 flex flex-col gap-4" action="">
          <div>
          <label className="text-gray-300" htmlFor="name">Enter Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input text-gray-700 mt-1 font-medium focus:outline-secondary w-full"
            {...register('name')}
          />
          </div>
          <div>
          <label className="text-gray-300" htmlFor="name">Enter Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Type here"
            className="input text-gray-700 mt-1 font-medium focus:outline-secondary w-full"
            {...register('email')}
          />
          </div>
          <div>
          <label className="text-gray-300" htmlFor="name">Enter Your password</label>
          <input
            type="password"
            name="password"
            placeholder="Type here"
            className="input text-gray-700 mt-1 font-medium focus:outline-secondary w-full"
            {...register('password')}
          />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
