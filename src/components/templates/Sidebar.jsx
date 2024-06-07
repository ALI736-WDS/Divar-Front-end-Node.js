// import { useQuery } from "@tanstack/react-query";

//Service
// import { getCategory } from "../../services/admin";

//svg
import { AiOutlineEye } from "react-icons/ai";

//Styles
import styles from "./Sidebar.module.css";

function Sidebar({ categories, posts, selectedCategory, setSelectedCategory }) {
  /*  chun (Sidebar) az query dige va (Main) ham az query dige gerefte shodan pas harkodum joda va ba takhir khodeshun neshun dade mishan
      rahe hal: har dota ro ye ja tarif konim dar (HomePage) */
  // const { data } = useQuery(["get-categories"], getCategory);
  // console.log(data);
  // console.log({ posts });
  // console.log(categories);
  console.log({ selectedCategory });
  //(category._id === (props)posts.data.posts.category)

  //mitunim ham, inja ba click ruye har category _id ono begirim va ba props posts az HomePage ba category posts filter bezanim
  const categoryHandler = (_id) => {
    const newPosts = posts.data.posts.filter(
      (category) => category.category === _id
    );
    setSelectedCategory(newPosts);
    // console.log({ newPosts });
  };

  //selectCategory meghdar default null hast va vaghti setSelectCategory (null) bashe pas khali hast va Homepage az posts estefade mikone va
  const allCategoryHandlers = () => {
    setSelectedCategory(null);
  };

  return (
    <div className={styles.sidebar}>
      <h4> دسته بندی‌ها </h4>
      {/* {categories?.data.map((category) => ( */}
      {/* .? ham niaz nist chun dar HomePage goftim hardo fetch beshan... , pas vaghti 2ta fetch shodan neshun dade mishan */}
      <ul>
        <li className={selectedCategory === null ? styles.selected : null}>
          <p onClick={allCategoryHandlers} className={styles.all_category}>
            <AiOutlineEye />
            همه
          </p>
        </li>
        {categories.data.map((category) => (
          <li
            key={category._id}
            className={
              selectedCategory && selectedCategory[0].category === category._id
                ? styles.selected
                : null
            }
          >
            <img src={`${category.icon}.svg`} alt={category.name} />
            <p onClick={() => categoryHandler(category._id)}>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
