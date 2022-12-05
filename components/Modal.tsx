import React from "react";
import { useStore } from "zustand";
import useMovieStore from "../store/movieStore";
import MuiModal from "@mui/material/Modal";

const Modal = () => {
  const { showModal, setShowModal } = useMovieStore();
  return (
    <MuiModal open={showModal} onClose={() => setShowModal(false)}>
      <div> Modal</div>
    </MuiModal>
  );
};

export default Modal;
