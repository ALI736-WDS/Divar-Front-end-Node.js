import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//Functions
import { addCategory } from "../../services/admin";

//Styles
import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const { mutate, isLoading, data, error } = useMutation(addCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"), 
    //onSuccess baraye zadane button ke harchi ezafe shod, page reload beshe, va esme "get-categories" behesh midim ke ino reload kone 
  });
  // console.log({ isLoading, data, error });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
    // console.log(form);
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3> دسته بندی جدید </h3>
      {!!error && <p> مشکلی پیش آمده است. </p>}
      {data?.status === 201 && <p> آگهی با موفقیت اضافه شد </p>}
      <label htmlFor="name"> نام دسته بندی </label>
      <input type="text" name="name" id="name" />

      <label htmlFor="slug"> اسلاگ </label>
      <input type="text" name="slug" id="slug" />

      <label htmlFor="icon"> آیکون </label>
      <input type="text" name="icon" id="icon" />

      <button type="submit" disabled={isLoading}>
        {/* css ham midim ke vaghti disabled shod css taghir kone: baraye chand sanie ta inf submit beshe */}
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
