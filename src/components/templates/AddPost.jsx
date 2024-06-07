import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//service
import { getCategory } from "../../services/admin";

//utils
import { getCookie } from "../../utils/cookie";

//hot-toast
import toast from "react-hot-toast";

//Styles
import styles from "./AddPost.module.css";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    city: "",
    amount: null,
    images: null,
  });

  const { data, isLoading, error } = useQuery(["get-categories"], getCategory);
  // console.log({ data, isLoading, error });

  const addHandler = (event) => {
    event.preventDefault(); //chun tuye form hast, reload mikone

    //be jaye inke taki taki begiim formData.append(title, form["title"]), az loop zir estefade mikonim
    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]); // key , value
    }
    // console.log(form);
    // console.log(formData);
    const token = getCookie("accessToken");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        }, //header baraye image ya type file fargh dare va bayad inshekl bashe
      })
      .then((res) => toast.success(res.data.message))
      //   setForm({
      //     title: "",
      //     content: "",
      //     category: "",
      //     city: "",
      //     amount: null,
      //     images: null,
      //   });
      // }
      .catch((error) => toast.error("مشکلی پیش آمده است.", console.log(error)));
  };

  //harjaye form taghirat bedim, onChange mishe
  const changeHandler = (event) => {
    // console.log(event);
    // console.log(event.target.name);
    const name = event.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
      // console.log(form);
    } else {
      console.log(event);
      // console.log(event.target.files);
      // console.log(event.target.files[0]);
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  return (
    <form onChange={changeHandler} className={styles.form}>
      <h3> افزودن آگهی </h3>
      <label htmlFor="title"> عنوان </label>
      <input type="text" name="title" id="title" />

      <label htmlFor="title"> توضیحات </label>
      <textarea name="content" id="content" />

      <label htmlFor="amount"> قیمت </label>
      <input type="number" name="amount" id="amount" />

      <label htmlFor="city"> شهر </label>
      <input type="text" name="city" id="city" />

      <label htmlFor="category"> دسته بندی </label>
      <select name="category" id="category">
        {/* optional chaining(?): ke agar data undefine bud error nade: dar lahze aval hanuz data fetch nashode va undefine mide */}
        {data?.data.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>

      <label htmlFor="images"> عکس </label>
      <input type="file" name="images" id="images" />
      <button onClick={addHandler}> ایجاد </button>
    </form>
  );
}

export default AddPost;
