import { useState } from "react";
import { deleteCategory } from "../../services/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import ErrorCategoryNotif from "./ErrorCategoryNotif";

function DeleteCategory() {
  const queryClient = useQueryClient();
  const [id, setId] = useState([]);
  const { mutate, isPending, data } = useMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  const changeHandler2 = (event) => {
    setId(event.target.value);
  };
  const submitHandler2 = (event) => {
    event.preventDefault();
    if (!id) return;
    mutate(id);
  };
  return (
    <div>
      <form onChange={changeHandler2} onSubmit={submitHandler2}>
        <h3>حذف دسته بندی</h3>
        {data?.status === 200 && <ErrorCategoryNotif />}
        <label htmlFor="delete">آیدی دسته بندی مورد نظر را وارد کنید</label>
        <input type="text" name="delete" id="delete" />
        <button type="submit" disabled={isPending}>
          حذف
        </button>
      </form>
    </div>
  );
}

export default DeleteCategory;
