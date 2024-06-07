import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

//Utils
import { deleteCookie } from "../utils/cookie";

//Service
import { getProfile } from "../services/user";

//svg
import { BiCog } from "react-icons/bi";

//Styles
import styles from "./Header.module.css";

function Header() {
  const { data, isLoading, error } = useQuery(["profile"], getProfile);
  // console.log({ data, isLoading, error });

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="/divar.svg" alt="divar" className={styles.logo} />
        </Link>
        <span>
          <img src="/location.svg" alt="location" />
          <p> تهران </p>
        </span>
      </div>

      <div>
        {data && data.data.role === "ADMIN" ? (
          <Link to="/admin" className={styles.admin}>
            <span>
              <BiCog />
              <p> پنل ادمین </p>
            </span>
          </Link>
        ) : null}

        <Link to="/profile">
          <span>
            <img src="/profile.svg" alt="profile" />
            <p> دیوار من </p>
          </span>
        </Link>

        <Link to="/dashboard" className={styles.button_login}>
          ثبت آگهی
        </Link>

        {data ? (
          <Link to="/" className={styles.button_close} onClick={deleteCookie}>
            خروج از حساب کاربری
          </Link>
        ) : (
          <Link to="/auth" className={styles.button_login}>
            ورود
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
