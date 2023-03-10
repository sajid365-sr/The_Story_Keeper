import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/AuthContext/AuthContext";
import UseToken from "../../Hooks/UseToken";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, googleSignIn, facebookSignIn } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [userEmail, setUserEmail] = useState("");
  const token = UseToken(userEmail);


  
  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data, event) => {
    const { email, password } = data;
    setUserEmail(email);
    // email/password login
    signIn(email, password)
      .then((result) => {
        
        const user = result.user;
        if (user.uid) {
          toast.success("User login successfully");
          event.target.reset();
        }
      })
      .catch((e) => setError(e.message));
  };

  // Google sign in
  const handleGoogleSignIn = () => {
    
    googleSignIn()
      .then((result) => {
        const user = result.user;
        
        const newUser = {
          email:user?.email,
          verified:false,
          type:'buyer',
          name:user?.displayName
        }
        setUserEmail(user?.email);
        fetch("https://the-story-keeper-server-sajid365-sr.vercel.app/users", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ newUser }),
        })
        .then((res) => res.json())
        .then(data => {

        })
        
      })
      .catch((e) => setError(e.message));
  };
  //Facebook sign in
  const handleFacebookSignIn = () => {
    facebookSignIn()
      .then((result) => {
        const user = result.user;
       
        const newUser = {
          email:user?.email,
          verified:false,
          type:'buyer',
          name:user?.displayName
        }
        setUserEmail(user?.email);
        fetch("https://the-story-keeper-server-sajid365-sr.vercel.app/users", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ newUser }),
        })
        .then((res) => res.json())
        .then(data => {
          
        })
        
      })
      .catch((e) => setError(e.message));
  };

  return (
    <div className="flex justify-center items-center h-[100vh] lg:h-[90vh] lg:rounded-2xl">
      <div className="lg:w-2/6 w-10/12 bg-info py-10 rounded-lg bg-opacity-30">
        <h2 className="text-center mb-10 font-Kaushan text-5xl text-gray-900">
          Login
        </h2>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="px-6 flex flex-col gap-4"
          action=""
        >
          <div>
            <label className="text-gray-700 font-medium" htmlFor="name">
              Enter Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Type here"
              className="input text-gray-700 mt-1 font-medium  w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-error">{errors.email?.message}</span>
            )}
          </div>
          <div>
            <label className="text-gray-700 font-medium" htmlFor="name">
              Enter Your password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Type here"
              className="input text-gray-700 mt-1 font-medium w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-error">{errors.password?.message}</span>
            )}
            <label
              role="button"
              className="text-gray-600 hover:text-primary underline text-sm"
              htmlFor="name"
            >
              Forgot Your password?
            </label>
          </div>
          <div className="divider font-medium">OR</div>
          {error && <span className="text-error text-center">{error}</span>}
          <div className="flex justify-center gap-5">
            <FaFacebook
              onClick={handleFacebookSignIn}
              className="text-3xl hover:text-primary"
              role="button"
            />
            <FaGoogle
              onClick={handleGoogleSignIn}
              className="text-3xl hover:text-primary"
              role="button"
            />
          </div>
          <p className="text-base mt-3">
            Don't have any account? Please{" "}
            <Link className="underline text-primary" to="/signup">
              register
            </Link>{" "}
            here.
          </p>
          <input
            className="btn text-lg tracking-widest"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
