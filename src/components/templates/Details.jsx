import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//Components
import Loader from "../modules/Loader";

//Service
import { getAllPosts } from "../../services/user";

//Utils
import { sp } from "../../utils/numbers";

//svg
import { IoMdPricetag } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { TbHomeCheck } from "react-icons/tb";
import { HiOutlinePencil } from "react-icons/hi";

//Styles
import styles from "./Details.module.css";

function Details() {
  const { id } = useParams();

  const baseURL = import.meta.env.VITE_BASE_URL;
  //   console.log(id);

  const { data, isLoading } = useQuery(["post-list"], getAllPosts);
  // console.log({ data, isLoading });

  const oneData = data?.data.posts.find((post) => post._id === id);
  // console.log(oneData);
  // console.log(`${baseURL}${oneData?.images[0]}`);

  if (isLoading) return <Loader />;

  return (
    // <>
    // {isLoading ? (
    //  <Loader />
    // ) : ( */}
    <div className={styles.container}>
      <div className={styles.information}>
        <h3 className={styles.title}> عنوان: {oneData.options.title}</h3>
        <p className={styles.description}>توضیحات: {oneData.options.content}</p>
        <p className={styles.city}>
          <TbHomeCheck />
          شهر: {oneData.options.city}
        </p>
        <p className={styles.price}>
          <IoMdPricetag />
          قیمت: {sp(oneData.amount)}
        </p>

        <div>
          <span className={styles.date}>
            <HiOutlinePencil />
            {new Date(oneData.createdAt).toLocaleDateString("fa-IR")}
          </span>

          <Link to="/products">
            <span>Back To Shop</span>
            <FaArrowLeft />
          </Link>
        </div>
      </div>
      <img src={`${baseURL}${oneData.images[0]}`} alt={oneData?.title} />
    </div>
    //)}
    // </>
  );
}

export default Details;
