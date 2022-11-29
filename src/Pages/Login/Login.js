import React from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();


  const handleLogin = (data) =>{

    const {email, password} = data;

  }

  return (
    <div className="bg-gradient-to-bl from-[#270a6b] to-secondary flex justify-center items-center h-[90vh] rounded-2xl">
      <div className="w-2/6 bg-info py-10 rounded-lg bg-opacity-30">
        <h2 className="text-center mb-10 text-5xl text-gray-900">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)} className="px-6 flex flex-col gap-4" action="">
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
          <label role='button' className="text-gray-300 hover:text-info underline text-sm" htmlFor="name">Forgot Your password?</label>
          </div>
          <div className="divider">OR</div>
          <div className="flex justify-center gap-5">
              <FaFacebook className="text-3xl hover:text-info" role='button'
              />
              <FaGoogle className="text-3xl hover:text-info" role='button'
              />
          </div>
          <p className="text-sm mt-3">Don't have any account? Please <Link className="underline text-info" to='/signup'>register</Link> here.</p>
            <input className="btn text-lg tracking-widest" type="submit" value='Login' />
        </form>
      </div>
    </div>
  );
};

export default Login;
