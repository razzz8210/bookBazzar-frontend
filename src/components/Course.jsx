import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
function Course() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-16 items-center justify-center text-center">
          <div>
            
          </div>
          <h1 className="text-2xl  md:text-4xl">


            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
          Our courses are designed to empower learners with the knowledge, skills, and confidence needed to succeed in today’s fast-paced world. Whether you're a beginner exploring a new field or a professional seeking to upskill, our diverse range of courses covers everything from technology and business to wellness and creativity. Each course is crafted by experts and offers engaging content, practical examples, and real-world applications. Learn at your own pace, from anywhere, with lifetime access. Start your learning journey today and unlock new opportunities for growth, career advancement, and personal development with our high-quality, accessible, and affordable courses.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
