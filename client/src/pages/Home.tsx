import React, { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import { backendUrl } from "../App";
import UserCard from "../components/card/UserCard";

const Home = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getAllUser = async () => {
      const res = await axios.get(`${backendUrl}/api/user/getall`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("refreshToken")}`,
        },
      });
      if (res.data.success) {
        setUser(res.data.user);
      }
    };
  }, []);
  return (
    <div>
      , asdfsdfijsadfljsdlfjdsf <h1>Home</h1>
      <div>
        {user &&
          user.map((u: any) => (
            <UserCard hobbies={u.hobbies} username={u.username} />
          ))}
      </div>
    </div>
  );
};

export default Home;
