import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { BsFillStarFill } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [Data, setData] = useState("");
  const [MovieName, setMovieName] = useState();
  const [showMovie, setshowMovie] = useState(false);
  const searchMovie = async () => {
    if (MovieName) {
      let url = `https://www.omdbapi.com/?apikey=c50eaee1&t=${MovieName}`;
      const res = await axios.get(url);
      const allData = res.data;
      const {
        Title,
        Year,
        Rated,
        Runtime,
        Genre,
        Director,
        Actors,
        Plot,
        Metascore,
        imdbRating,
        imdbVotes,
        BoxOffice,
        Poster,
      } = allData;
      const movieInfo = {
        Title,
        Year,
        Rated,
        Runtime,
        Genre,
        Director,
        Actors,
        Plot,
        Metascore,
        imdbRating,
        imdbVotes,
        BoxOffice,
        Poster,
      };
      setData(movieInfo);
      setMovieName("");
      setshowMovie(true);
    }else{
      alert("Write a Movie Name")
    }
  };

  return (
    <div className="">
      <div className="text-center text-4xl">
        <h1>Movies Catalogue</h1>
      </div>
      <div className="flex justify-center my-4">
        <input
          className="border-2 border-gray-400 py-2 px-4 rounded-full"
          type="text"
          placeholder="Search Movies"
          name=""
          id=""
          value={MovieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <button
          onClick={searchMovie}
          className="mx-2 border-2 border-gray-400 px-6 rounded-xl"
        >
          Search
        </button>
      </div>
      {showMovie === true ? (
        <div className="flex justify-center">
          <div className="w-6/6 md:w-3/6 border-l border-r h-screen">
            <div className="mx-2 bg-gray-100 flex my-2">
              <div className="w-2/6 flex justify-center items-center">
                <Image src={Data.Poster} alt="" height={100} width={100} />
              </div>
              <div className="ml-4 w-4/6">
                <div className="flex">
                  <h1 className="text-[#70579D] font-bold">{Data.Title}</h1>
                  <h2 className="ml-2 font-light text-gray-800">
                    ({Data.Year})
                  </h2>
                </div>
                <div className="flex my-2 font-light text-sm">
                  <p>
                    {Data.Rated} | {Data.Runtime} | {Data.Genre}
                  </p>
                </div>
                <div className="flex justify-start space-x-2 my-2">
                  <div className="flex">
                    <BsFillStarFill className="mt-1 mr-1 text-[#c39400]" />{" "}
                    <p>{Data.imdbRating}</p>
                  </div>{" "}
                  <p>
                    {" "}
                    <span className="bg-[#61c74f] text-white px-1">
                      {Data.Metascore}
                    </span>{" "}
                    Metascore
                  </p>
                </div>
                <div>
                  <p>{Data.Plot}</p>
                </div>
                <div className="flex my-2">
                  <p>
                    <span className="font-light text-sm">Director: </span>
                    {Data.Director}{" "}
                    <span className="font-light text-sm"> | Stars: </span>
                    {Data.Actors}
                  </p>
                </div>
                <div className="flex">
                  <p>
                    <span className="font-light text-sm">Votes: </span>
                    {Data.imdbVotes}{" "}
                    <span className="font-light text-sm"> | Gross: </span>
                    {Data.BoxOffice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-3/6 border-l border-r h-screen">
            <div className="mx-2 bg-gray-100 flex justify-center my-2">
              <div>Search a movie</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
