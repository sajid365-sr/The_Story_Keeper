import React, { useContext, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/AuthContext/AuthContext";

const SignUp = () => {

 
 const {register, handleSubmit,formState: { errors } } = useForm();
  const { createUser, updateUser, googleSignIn, facebookSignIn } =
    useContext(UserContext);

  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);

  const handleLogin = (data, event) => {
    let { name, email, password } = data;
    const newUser = {
      name,
      email,
      type: `${check?'seller':'buyer'}`
    }
    
    
  
    // email/password sign in
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user.uid) {
         
            fetch('http://localhost:5000/users', {
              method:'post',
              headers:{
                'content-type':'application/json',
              },
              body:JSON.stringify({newUser})
            })
            .then(res => res.json())
            .then(data => {
              
                if(data.acknowledged){
                    
                  toast.success("User created successfully");
                  setCheck(false);
                  event.target.reset();
                }
                
                
            })
          
         
        }
      })
      .catch((e) => setError(e.message));

    // Update user
    const userInfo = {
      displayName: name,
    };
    updateUser(userInfo)
      .then(() => {})
      .catch((e) => setError(e.message));
  };

  // Google sign in
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {})
      .catch((e) => setError(e.message));
  };

  //Facebook sign in
  const handleFacebookSignIn = () => {
    facebookSignIn()
      .then(() => {})
      .catch((e) => setError(e.message));
  };

  return (
    <div className="bg-gradient-to-bl from-[#0a3f6b] to-secondary flex justify-center items-center  h-[100vh] lg:h-[95vh] lg:rounded-2xl my-24">
      <div className="lg:w-2/6 w-10/12 bg-info py-10 rounded-lg  bg-opacity-30">
        <h2 className="text-center mb-10 text-5xl font-Kaushan text-gray-900">
          SignUp
        </h2>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="px-6 flex flex-col gap-4"
          action=""
        >
          <div>
            <label className="text-gray-300" htmlFor="name">
              Enter Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Type here"
              className="input text-gray-700 mt-1 font-medium focus:outline-secondary w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-error">{errors.name?.message}</span>
            )}
          </div>
          <div>
            <label className="text-gray-300" htmlFor="name">
              Enter Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Type here"
              className="input text-gray-700 mt-1 font-medium focus:outline-secondary w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-error">{errors.email?.message}</span>
            )}
          </div>
          <div>
            <label className="text-gray-300" htmlFor="name">
              Enter Your password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Type here"
              className="input text-gray-700 mt-1 font-medium focus:outline-secondary w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-error">{errors.password?.message}</span>
            )}
          </div>
          {error && <span className="text-error text-center">{error}</span>}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-white font-medium tracking-widest">Seller Account?</span>
              <input onClick={() => setCheck(true)} type="checkbox" name="checkbox"  className="toggle toggle-secondary"  />
            </label>
          </div>

          <div className="divider">OR</div>
          <div className="flex justify-center gap-5">
            <FaFacebook
              onClick={handleFacebookSignIn}
              className="text-3xl hover:text-info"
              role="button"
            />
            <FaGoogle
              onClick={handleGoogleSignIn}
              className="text-3xl hover:text-info"
              role="button"
            />
          </div>
          <p className="text-sm mt-3">
            Already have an account?{" "}
            <Link className="underline text-info" to="/login">
              login
            </Link>{" "}
            here.
          </p>
          <input
            className="btn text-lg tracking-widest"
            type="submit"
            value="SignUP"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
