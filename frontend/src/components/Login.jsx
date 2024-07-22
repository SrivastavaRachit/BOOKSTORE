import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';

import toast from 'react-hot-toast'

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    // ADD LOGIN WITH BACKEND WITH API
    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        }
        await axios.post("http://localhost:4001/user/login", userInfo)
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    toast.success('Logged In Successfull!');
                    document.getElementById("my_modal_3").close()
                    setTimeout(() => {

                        window.location.reload();
                        // STORE IT IN LOCAL STORAGE
                        localStorage.setItem("Users", JSON.stringify(res.data.user))
                    }, 1000);
                }

            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error:" + err.response.data.message);
                    setTimeout(() => {

                    }, 2000);
                }
            })
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => document.getElementById("my_modal_3").close()}>✕</Link>

                        <h3 className="font-bold text-lg">Login!</h3>

                        <div className='mt-4 space-y-2'>
                            <span>Email</span>
                            <br />
                            <input type="email" placeholder='Enter Your Email'
                                className='w-80 py-1 px-3 border rounded-md outline-none'
                                {...register("email", { required: true })}
                            />
                            <br />
                            {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>

                        <div className='mt-4 space-y-2'>
                            <span>Password</span>
                            <br />
                            <input type="password" placeholder='Enter Your Password'
                                className='w-80 py-1 px-3 border rounded-md outline-none'
                                {...register("password", { required: true })}
                            />
                            <br />
                            {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>

                        {/* Button */}
                        <div className='flex justify-around mt-4'>
                            <button className='bg-pink-500 text-white rounded px-3 py-1 hover:bg-pink-700 duration-200'>Login</button>
                            <p>Not Registered? <Link to='/signup' className='underline text-blue-500 cursor-pointer'>SignUp</Link>{" "}
                            </p>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Login