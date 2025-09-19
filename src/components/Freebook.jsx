import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";

import Cards from "./Cards";
function Freebook() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/book`);
        console.log("API Response:", res.data);
        
        if (res.data && res.data.length > 0) {
          const data = res.data.filter((data) => data.category === "free");
          console.log("Filtered free books:", data);
          setBook(data);
        } else {
          console.log("No data received from API, using fallback data");
          // Fallback data if API fails
          const fallbackData = [
            {
              id: 1,
              name: "Fiction",
              title: "A mysterious journey unfolds, revealing secrets, magic, betrayal, and destiny.",
              price: 0,
              category: "free",
              image: "https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5918.jpg?t=st=1743431298~exp=1743434898~hmac=d1bf5b3b27682515b7d0c63843ce4949df58de8509535a0c354b81fe19740e20&w=1380"
            },
            {
              id: 4,
              name: "Magic Book",
              title: "A mysterious journey unfolds, revealing secrets, magic, betrayal, and destiny.",
              price: 0,
              category: "free",
              image: "https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5918.jpg?t=st=1743431298~exp=1743434898~hmac=d1bf5b3b27682515b7d0c63843ce4949df58de8509535a0c354b81fe19740e20&w=1380"
            },
            {
              id: 7,
              name: "Medical",
              title: "An educational journey of healing, knowledge, science, and medical discovery.",
              price: 0,
              category: "free",
              image: "https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5918.jpg?t=st=1743431298~exp=1743434898~hmac=d1bf5b3b27682515b7d0c63843ce4949df58de8509535a0c354b81fe19740e20&w=1380"
            }
          ];
          setBook(fallbackData);
        }
      } catch (error) {
        console.log("API Error:", error);
        // Use fallback data on error
        const fallbackData = [
          {
            id: 1,
            name: "Fiction",
            title: "A mysterious journey unfolds, revealing secrets, magic, betrayal, and destiny.",
            price: 0,
            category: "free",
            image: "https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5918.jpg?t=st=1743431298~exp=1743434898~hmac=d1bf5b3b27682515b7d0c63843ce4949df58de8509535a0c354b81fe19740e20&w=1380"
          },
          {
            id: 4,
            name: "Magic Book",
            title: "A mysterious journey unfolds, revealing secrets, magic, betrayal, and destiny.",
            price: 0,
            category: "free",
            image: "https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5918.jpg?t=st=1743431298~exp=1743434898~hmac=d1bf5b3b27682515b7d0c63843ce4949df58de8509535a0c354b81fe19740e20&w=1380"
          },
          {
            id: 7,
            name: "Medical",
            title: "An educational journey of healing, knowledge, science, and medical discovery.",
            price: 0,
            category: "free",
            image: "https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5918.jpg?t=st=1743431298~exp=1743434898~hmac=d1bf5b3b27682515b7d0c63843ce4949df58de8509535a0c354b81fe19740e20&w=1380"
          }
        ];
        setBook(fallbackData);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
          A free book is a gateway to knowledge, adventure, and inspiration, offering readers the chance to explore new worlds, ideas, and perspectives without cost. It fuels imagination, enriches minds, and provides wisdom, creativity, and learning to all who seek it. Whether it’s a gripping novel, an insightful self-help guide, or an educational resource, a free book removes barriers to literacy and intellectual growth. It empowers individuals, fosters curiosity, and nurtures a lifelong love for reading and discovery.
          </p>
        </div>

        <div>
          {book.length > 0 ? (
            <Slider {...settings}>
              {book.map((item) => (
                <Cards item={item} key={item.id} />
              ))}
            </Slider>
          ) : (
            <div className="text-center py-8">
              <p>Loading books...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Freebook;
