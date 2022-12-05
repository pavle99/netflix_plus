import Image from "next/image";
import useMovieStore from "../store/movieStore";
import { Movie } from "../typings";

interface IProps {
  movie: Movie;
}

function Thumbnail({ movie }: IProps) {
  const { showModal, setShowModal, currentMovie, setCurrentMovie } = useMovieStore();

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        alt="movie poster"
        className="rounded-sm object-cover md:rounded"
        sizes="100%"
        fill
      />
    </div>
  );
}

export default Thumbnail;
