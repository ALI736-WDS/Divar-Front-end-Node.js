import React from "react";
import Header from "./Header";
import Footer from "./Footer";

//Styles
import styles from "./Layouts.module.css";

function Layouts({ children }) {
  return (
    <>
      <Header />
      <div className={styles.main}> {children} </div>
      <Footer />
    </>
  );
}

export default Layouts;
