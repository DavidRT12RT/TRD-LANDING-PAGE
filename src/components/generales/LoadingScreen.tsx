import React from "react";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";


interface Props {
  message:string;
};

const LoadingScreen = ({
  message
}:Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col justify-center items-center bg-[#181A1F] z-50"
    >
      <img
        src="/assets/colors.png"
        alt="Carga"
        className="fixed top-0 w-auto mb-4" // Ajusta el tamaño máximo de la imagen
      />
      <Spinner color="white" />
      <p className="text-white mt-4">{message}</p>
    </motion.div>
  );
};

export default LoadingScreen;
