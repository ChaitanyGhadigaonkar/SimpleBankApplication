import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";

const CheckAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/admin/login");
      return;
    }
    // if (user.role !== "banker") {
    //   toast.error("not authorized");
    // }
  }, []);
  return <Outlet />;
};

export default CheckAdmin;
