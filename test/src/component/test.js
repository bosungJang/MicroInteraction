import React from "react";
import { motion } from "framer-motion";

const Rotatestyles = {
  background: "blue",
  borderRadius: 30,
  width: 150,
  height: 150,
  margin: "auto"
};

export const Rotate = () => (
  <motion.div
    style={Rotatestyles}
    animate={{ rotate: 360 }}
    transition={{ duration: 2 }}
  />
);

const Popstyles = {
    background: "red",
    borderRadius: 30,
    width: 50,
    height: 50,
    margin: "auto"
  };
  
  export const Pop = () => (
    <motion.div
      style={Popstyles}
      animate={{ scale: 3 }}
      transition={{ duration: 0.25 }}
    />
  );

  const Buttonstyles = {
    background: "#7fffd4",
    borderRadius: 30,
    width: 150,
    padding: "10px 20px",
    margin: "auto",
    color: "#333",
    outline: "none",
    border: "none",
    cursor: "pointer"
  };
  
  export const Gesture = () => (
    <motion.button
      style={Buttonstyles}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
    >
      Button
    </motion.button>
  );