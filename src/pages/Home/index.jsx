import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "app/slices/userSlice";
import styles from "./HomePage.module.sass";
import VKNews from "./VKNews";

const HomePage = () => {
  const user = useSelector(selectUser);
  
  return (
    <div className={styles.homePage}>
      <h3>
        Добро пожаловать на TFC-survival,{" "}
        {user.isAuth ? user.data.nickname : "дружок"}
      </h3>
      <VKNews />
    </div>
  );
};

export default HomePage;
