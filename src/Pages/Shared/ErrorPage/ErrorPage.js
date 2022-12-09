
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
    const feedback = ()=>{
        toast.success('Thanks for your feedback. We will solve it as soon as possible.');
    }

    return (
        <div
        className="bg-gradient-to-r from-green-600 to-gray-600 h-[100vh] flex justify-center items-center">
      <div className="h-[70vh] lg:w-[70%] w-[90%] bg-white flex justify-center items-center flex-col lg:p-[10%] p-[2%]">
        <h1 className='font-bold lg:text-[200px] lg:h-[220px] h-[150px] flex items-center px-14 text-[90px] bg-gradient-to-r from-orange-500 to-purple-500'>404</h1>
        <h2 className='font-bold lg:text-[40px] my-10 text-3xl text-gray-700 text-center'>OPPS! PAGE NOT FOUND</h2>
        <p className='text-center lg:text-xl text-base my-5 text-gray-600'>
          Sorry, the page you are looking for doesn't exist. If you think
          something is wrong, report a problem.
        </p>
        <div className="flex lg:gap-8 items-start justify-center w-full gap-3">
          <Link to="/home">
            <button className=' lg:py-4  lg:px-6 px-[10px] btn btn-outline tracking-normal rounded-none lg:tracking-[2px]'>RETURN HOME</button>
          </Link>

          <button className=' lg:py-4  lg:px-6 px-[10px] btn btn-outline tracking-normal rounded-none lg:tracking-[2px]' onClick={feedback}>REPORT PROBLEM</button>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </div>
      </div>
    </div>
    );
};

export default ErrorPage;