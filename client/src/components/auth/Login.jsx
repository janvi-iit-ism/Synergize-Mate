import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Loginpng from '../CardsImg/Loginpng.jpg'
import auth from '../CardsImg/auth.png'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // console.log('Backend response:', res.data);
      if (res.data.success) {
        localStorage.setItem('authToken', res.data.token);
        // console.log('Token stored:', res.data.token);
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      // toast.error(error.response?.data?.message || 'An unexpected error occurred');
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center bg-slate-100">
        {/* <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl"> */}
          {/* <div className="md:flex"> */}
        

            <div className="md:w-1/2 p-8">
              {/* <div className='flex items-center justify-center max-w-7xl mx-auto'> */}
              <form
                onSubmit={submitHandler}
                // className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
                className="border bg-white border-gray-200 h-[425px] rounded-xl p-4 my-20 shadow-xl"
              >
                <h1 className="flex font-bold text-xl mb-2 justify-center">
                  Login
                </h1>
                <p className="text-center mt-1">Welcome Back!</p>
                <div className="my-4">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="Email Id"
                    className="rounded-lg shadow-md"
                  />
                </div>

                <div className="my-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="Password"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="flex items-center justify-between">
                  {/* <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup> */}
                </div>
                {loading ? (
                  <Button className="w-full my-4 bg-slate-600">
                    {" "}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait{" "}
                  </Button>
                ) : (
                  <Button type="submit" className="w-full my-4 rounded-xl shadow-md bg-slate-600">
                    Login
                  </Button>
                )}
                <span className="text-center">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-cyan-500 text-center">
                    Signup
                  </Link>
                </span>
              </form>
            {/* </div> */}
          </div>
        {/* </div> */}
        <img src={auth}   className="absolute bottom-0 left-0 w-72 h-72"></img>
      </div>
    </div>
  );
};

export default Login;
