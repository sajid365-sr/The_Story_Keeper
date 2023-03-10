import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/AuthContext/AuthContext";
import UseToken from "../../Hooks/UseToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, googleSignIn, facebookSignIn } =
    useContext(UserContext);

  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const token = UseToken(userEmail);

  if(token){
    navigate('/');
  }


  const handleLogin = (data, event) => {
    let { name, email, password } = data;

    // email/password sign in
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user.uid) {
          toast.success("User created successfully");
          setCheck(false);
          event.target.reset();
        }

        // Update user
        const userInfo = {
          displayName: name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(name, email);
          })
          .catch((e) => setError(e.message));
      })

      .catch((e) => setError(e.message));
  };


  // Save user to db
  const saveUser = (name, email) => {

    
    const newUser = {
      name,
      email,
      type: `${check ? "seller" : "buyer"}`,
    };

    if(check){
      newUser.verified = false
    } 

    fetch("https://the-story-keeper-server-sajid365-sr.vercel.app/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ newUser }),
    })
    .then((res) => res.json())
    .then(data => {
      if(data.acknowledged){
        setUserEmail(email);
      }
    })

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
    <div className="flex justify-center items-center  h-[100vh] lg:h-[95vh] lg:rounded-2xl my-12">
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
            <label className="text-gray-700 font-medium" htmlFor="name">
              Enter Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Type here"
              className="input text-gray-700 mt-1 font-medium w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-error">{errors.name?.message}</span>
            )}
          </div>
          <div>
            <label className="text-gray-700 font-medium" htmlFor="name">
              Enter Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Type here"
              className="input text-gray-700 mt-1 font-medium w-full"
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
          </div>
          {error && <span className="text-error text-center">{error}</span>}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-gray-700 font-semibold text-xl tracking-widest">
                Seller Account?
              </span>
              <input
                onClick={() => setCheck(true)}
                type="checkbox"
                name="checkbox"
                className="toggle toggle-primary"
              />
            </label>
          </div>

          <div className="divider font-medium">OR</div>
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
            Already have an account?{" "}
            <Link className="underline text-primary" to="/login">
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
