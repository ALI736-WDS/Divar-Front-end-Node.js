import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

//Components
import Main from "../components/templates/Main";
import Sidebar from "../components/templates/Sidebar";
import Loader from "../components/modules/Loader";

//Service
import { getAllPosts } from "../services/user";
import { getCategory } from "../services/admin";

//Style
const style = { display: "flex" };

function HomePage() {
  const { data: posts, isLoading: postLoading } = useQuery(
    ["post-list"],
    getAllPosts
  );
  const { data: categories, isLoading: categoryLoading } = useQuery(
    ["get-categories"],
    getCategory
  );
  // console.log({ posts, postLoading });
  // console.log({ categories, categoryLoading });

  const [selectedCategory, setSelectedCategory] = useState(null);
  // console.log({selectedCategory});

  //mitunim haminja tarif konim va ba props be Sider beresunim
  // const categoryHandler = (_id) => {
  //   // const ss = categories.data.map((category) => console.log(category));
  //   const newPosts = posts.data.posts.filter(
  //     (category) => category.category === _id
  //   );
  //   setSelectedCategory(newPosts);
  //   console.log({ newPosts });
  // };

  return (
    <>
      {/* intori dige hardo ke fetch shodan, badesh loading mire va data ha neshun neshun dade mishan */}
      {/* {isLoading ? ( */}
      {postLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar
            categories={categories}
            posts={posts}
            // categoryHandler={categoryHandler}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Main posts={posts} selectedCategory={selectedCategory} />
        </div>
      )}
    </>
  );
}

export default HomePage;
