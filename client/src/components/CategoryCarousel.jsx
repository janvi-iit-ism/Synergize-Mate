import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/authSlice";
// import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
  "AI/ML Developer",
];

const CategoryCarousel = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchUserHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  const searchUserSignUp = () => {
    // dispatch(setSearchedQuery(query));
    navigate("/signup");
  };

  return (
    <div>
      <Carousel className="w-3/4 max-w-xl my-2">
        <CarouselContent>
          {category.map((cat, index) => (
            // px-3 py-2 bg-gray-800 rounded-full text-white
            <CarouselItem className="md:basis-2/5 lg-basis-1/3 ">
              {user ? (
                <>
                  <Button
                    onClick={() => searchUserHandler(cat)}
                    variant="outline"
                    className="rounded-full border-1 border-gray-800 bg-white text-slate-800 hover:bg-slate-400 hover:text-gray-800 transition-colors duration-300 p-4"
                  >
                    {cat}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => searchUserSignUp()}
                    variant="outline"
                    className="rounded-full bg-white border-1 border-gray-800 text-slate-800 hover:bg-slate-400 hover:text-gray-800 transition-colors duration-300 p-4"
                  >
                    {cat}
                  </Button>
                </>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white border-1 border-gray-800" />
        <CarouselNext className="bg-white border-1 border-gray-800" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
