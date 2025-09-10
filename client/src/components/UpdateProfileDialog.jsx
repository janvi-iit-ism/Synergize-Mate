import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { X } from "lucide-react";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
    // new
    github: user?.profile?.github || "",
    description: user?.profile?.description || "",
    experience: user?.profile?.experience || "",
    year: user?.profile?.year || "",
    dept: user?.profile?.dept || "",
    course: user?.profile?.course || "",
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    formData.append("github", input.github);
    formData.append("instagram", input.instagram);
    // formData.append("location", input.location);
    formData.append("description", input.description);
    formData.append("experience", input.experience);
    formData.append("year", input.year);
    formData.append("dept", input.dept);
    formData.append("course", input.course);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        // console.log("dataaaa::", res.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[440px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="mb-1 mt-0">Update Profile</DialogTitle>
            {/* <DialogClose asChild> */}
            <div>
              <X
                className="absolute right-4 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:cursor-pointer hover:border"
                onClick={() => setOpen(false)}
              />
            </div>
            {/* </DialogClose> */}
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-3 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="bio"
                  className="text-right block font-medium text-gray-700"
                >
                  Industry
                </label>
                <select
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={(event) => {
                    changeEventHandler(event);
                  }}
                  className="mt-0 block w-72 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select an Industry</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>
                  <option value="Data Science">Data Science</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="AI/ML Developer">AI/ML Developer</option>
                  <option value="Other">Other</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="course"
                  className="text-right block font-medium text-gray-700"
                >
                  Programme
                </label>
                <select
                  id="course"
                  name="course"
                  value={input.course}
                  onChange={(event) => {
                    changeEventHandler(event);
                    //   handleChange(event); // Call additional handler if needed
                  }}
                  className="mt-1 block w-72 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select your course</option>
                  <option value="B.Tech">Bachelor of Technology</option>
                  <option value="M.Tech">Masters of Technology</option>
                  <option value="Ph.D"> Doctor of Philosophy </option>
                  <option value="MBA">Master of Business Administration</option>
                  <option value="Integrated M.Tech">
                    Integrated Masters of Technology
                  </option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="year"
                  className="text-right block font-medium text-gray-700"
                >
                  Year
                </label>
                <select
                  id="year"
                  name="year"
                  value={input.year}
                  onChange={(event) => {
                    changeEventHandler(event);
                  }}
                  className="mt-1 block w-72 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select your Year</option>
                  <option value="1st Year">First Year</option>
                  <option value="2nd Year">Second Year</option>
                  <option value="3rd Year">Third Year</option>
                  <option value="4th Year">Fourth Year</option>
                  <option value="5th Year">Fifth Year</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="dept"
                  className="text-right block font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  id="dept"
                  name="dept"
                  value={input.dept}
                  onChange={(event) => {
                    changeEventHandler(event);
                  }}
                  className="mt-1 block w-72 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Your Department</option>
                  <option value="Chemical Engineering">
                    Chemical Engineering
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Computer Science and Engineering">
                    Computer Science Engineering
                  </option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Electronics Engineering">
                    Electronics Engineering
                  </option>
                  <option value="Environmental Engineering">
                    Environmental Engineering
                  </option>
                  <option value="Metallurgical Engineering">
                    Metallurgical Engineering
                  </option>
                  <option value="Mathematics and Computing">
                    Mathematics and Computing
                  </option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Mining Engineering">Mining Engineering</option>
                  <option value="Petroleum Engineering">
                    Petroleum Engineering
                  </option>
                  <option value="Applied Geology">Applied Geology</option>
                  <option value="Applied Geophysics">Applied Geophysics</option>
                  <option value="Humanities and Social Science">
                    Humanities and Social Science
                  </option>
                  <option value="Management Studies">Management Studies</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="experience" className="text-right">
                  Experience
                </Label>
                <Input
                  id="experience"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="github" className="text-right">
                  Github
                </Label>
                <Input
                  id="github"
                  name="github"
                  value={input.github}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-3 bg-slate-300">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin " /> Please wait{" "}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-2 bg-slate-500 shadow-xl"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
