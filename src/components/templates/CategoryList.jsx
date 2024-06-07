import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//Components/modules
import Loader from "../modules/Loader";

//Functions
import { deleteCategory, getCategory } from "../../services/admin";

//Styles
import styles from "./CategoryList.module.css";

function CategoryList() {
  const queryClient = useQueryClient();

  //agar bekhaim vaghti catrgory ezafe shod, loading biad bayad be jaye isLoading, isPending ya isFetching bezarim
  //isLoading => isPending && isFetching
  const { data, isLoading, error } = useQuery(["get-categories"], getCategory);
  //   console.log({ data, isLoading, error });

  ///////////
  const deleteMutation = useMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  const deleteHandler = (_id) => {
    deleteMutation.mutate(_id);
    // console.log({ data, isPending, isFetching, isLoading });  v5
    // console.log({ data, isLoading });
  };
  ///////////

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id}>
            <span>
              <img src={`${i.icon}.svg`} alt={`${i.name}`} />
              <h5> {i.name} </h5>
            </span>
            <p className={styles.id}>id: {i._id}</p>
            <span>
              <button type="submit" onClick={() => deleteHandler(i._id)}>
                حذف
              </button>
              <p> Slug: {i.slug} </p>
            </span>
          </div>
        ))
      )}

      {/* <div>
      {data?.status === 200 && <p> آگهی با موفقیت حذف شد. </p> }
      </div> */}
    </div>
  );
}

export default CategoryList;
