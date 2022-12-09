import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import useMovieStore from "../store/movieStore";
import MuiModal from "@mui/material/Modal";
import { CheckIcon, PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from "@heroicons/react/outline";
import { Genre, Element, Movie } from "../typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { collection, deleteDoc, doc, DocumentData, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import useAuth from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
const Modal = () => {
  const { currentMovie, setCurrentMovie, showModal, setShowModal } = useMovieStore();
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
  const { user } = useAuth();

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  useEffect(() => {
    if (!currentMovie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${currentMovie?.media_type === "tv" ? "tv" : "movie"}/${
          currentMovie?.id
        }?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex((element: Element) => element.type === "Trailer");
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [currentMovie]);

  const handleClose = () => {
    setShowModal(false);
    setCurrentMovie(null);
    toast.dismiss();
  };

  useEffect(() => {
    if (user) {
      return onSnapshot(collection(db, "customers", user.uid, "myList"), (snapshot) => setMovies(snapshot.docs));
    }
  }, [db, currentMovie?.id]);

  useEffect(() => setAddedToList(movies.findIndex((result) => result.data().id === currentMovie?.id) !== -1), [movies]);

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(doc(db, "customers", user!.uid, "myList", currentMovie?.id.toString()!));

      toast(`${currentMovie?.title || currentMovie?.original_name} has been removed from My List`, {
        duration: 8000,
        style: toastStyle,
      });
    } else {
      await setDoc(doc(db, "customers", user!.uid, "myList", currentMovie?.id.toString()!), {
        ...currentMovie,
      });

      toast(`${currentMovie?.title || currentMovie?.original_name} has been added to My List.`, {
        duration: 8000,
        style: toastStyle,
      });
    }
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />

        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`http://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton" onClick={handleList}>
                {addedToList ? <CheckIcon className="h-7 w-7" /> : <PlusIcon className="h-7 w-7" />}
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-6 w-6" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? <VolumeOffIcon className="h-6 w-6" /> : <VolumeUpIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">{currentMovie?.vote_average * 10}% Match</p>
              <p className="font-light">{currentMovie?.release_date || currentMovie?.first_air_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{currentMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span> {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span> {currentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span> {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
