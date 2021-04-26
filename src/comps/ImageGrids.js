import React from "react";
import useFirebase from "../hooks/useFirebase";
import { motion } from "framer-motion"

const ImageGrids = ({setSelectedImg}) => {
  const { docs } = useFirebase("Gallery");
  console.log(docs);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div className="img-wrap" key={doc.id}
          layout
          whileHover={{opacity:1}} onClick={() => setSelectedImg(doc.url)} >
            <motion.img src={doc.url} alt="some pic" 
              initial={{opacity:0}}
              animate ={{ opacity:1}}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay:1
              }}
            />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrids;
