import { motion } from "framer-motion";
import imgDinnerMenu from "../../images/undraw_refreshing.svg";
import React from 'react'

const MenuDinner = ({ dinner, items }) => {
  const itemContainer = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <>
      {dinner &&
        items
          .filter((item) => item.category === "Dinner")
          .map((item, i) => (
            <motion.div
              className="menu-items"
              key={item.id}
              variants={itemContainer}
              transition={{ delay: i * 0.2 }}
            >
              <img src={imgDinnerMenu} alt="food burger" />
              <motion.div className="item-content">
                <motion.div className="item-title-box">
                  <motion.h5 className="item-title">{item.title}</motion.h5>
                  <motion.h5 className="item-price">${item.price}</motion.h5>
                </motion.div>
                <motion.p className="item-desc">{item.desc}</motion.p>
              </motion.div>
            </motion.div>
          ))}
    </>
  );
};

export default MenuDinner;
