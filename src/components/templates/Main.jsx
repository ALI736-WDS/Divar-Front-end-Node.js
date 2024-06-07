import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";

//Components
// import Loader from "../modules/Loader";

//Utils
import { sp } from "../../utils/numbers";

//Styles
import styles from "./Main.module.css";

function Main({ posts, selectedCategory }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  // console.log(posts);
  // console.log({ selectedCategory });

  // const newPosts = selectedCategory ? selectedCategory : posts?.data.posts;
  const newPosts = selectedCategory ? selectedCategory : posts.data.posts;
  console.log({ newPosts });

  return (
    <>
      <div className={styles.container}>
        {newPosts.map((post) => (
          <div key={post._id} className={styles.card}>
            <div className={styles.info}>
              <p> {posts.options?.title} </p>
              <div>
                <p> {sp(post.amount)} تومان </p>
                <p> {posts.options?.city} </p>
                <span>
                  <Link to={post._id}>
                    <TbListDetails />
                  </Link>
                </span>
              </div>
            </div>
            <img
              src={`${baseURL}${post.images[0]}`}
              alt={posts.options?.title}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Main;
