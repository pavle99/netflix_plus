import { DocumentData } from "firebase/firestore";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Movie } from "../typings";

interface IMovieState {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  currentMovie: Movie | DocumentData | null;
  setCurrentMovie: (currentMovie: Movie | DocumentData | null) => void;
}

const useMovieStore = create<IMovieState>()(
  devtools(
    persist(
      (set) => ({
        showModal: false,
        setShowModal: (showModal: boolean) => set({ showModal }),
        currentMovie: null,
        setCurrentMovie: (currentMovie: Movie | DocumentData | null) => set({ currentMovie }),
      }),
      {
        name: "movie-storage",
      }
    )
  )
);

export default useMovieStore;
