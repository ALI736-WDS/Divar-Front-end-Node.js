import { useQuery } from "@tanstack/react-query";

//Service
import { getProfile } from "../../services/user";

//styles
import styles from "./Profile.module.css";

function Profile() {
  const { data, isLoading, error } = useQuery(["profile"], getProfile);
  console.log({ data, isLoading, error });

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <p> ID: {data.data._id} </p>
        <p> Phone: {data.data.mobile} </p>
        <p> Role: {data.data.role} </p>
        <p> createdAt: {data.data.createdAt} </p>
      </div>
    </div>
  );
}

export default Profile;
