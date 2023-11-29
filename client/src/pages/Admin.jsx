import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UsersRow from "../components/UsersRow";
import { VITE_API_URL } from "../../config";

const getUsers = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/admin/getUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: JSON.parse(localStorage.getItem("user")).authToken,
      },
    });
    const data = await res.json();
    if (data.success) {
      const users = data.users;
      return users;
    } else {
      toast.error("somethings went's wrong");
      return [];
    }
  } catch (error) {
    toast.error(error.msg);
    return [];
  }
};
const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setUsers(await getUsers());
    };
    getData();
  }, []);
  return (
    <div className="mx-auto w-full max-w-screen-xl px-3.5 md:px-20 ">
      <div className="px-5">
        <h2 className="font-semibold text-xl font-sans">Hello Admin</h2>

        <h4 className="font-semibold text-lg font-sans my-4">
          List of Customers :{" "}
        </h4>
        {
          <table className="w-full ">
            <tr className="border-b-2">
              <td className="text-sm py-2 text-left pl-2 capitalize">
                {"User Account number"}
              </td>
              <td className="text-sm py-2 text-left pl-2 capitalize capitalize">
                {"name"}
              </td>
              <td className="text-sm py-2 text-left pl-2 capitalize">
                {"email"}
              </td>
              <td className="text-sm py-2 text-left pl-2 capitalize">
                {"role"}
              </td>
            </tr>
            {/* {JSON.stringify(transactions)} */}

            {users ? (
              users.map((users) => (
                <UsersRow
                  key={users._id}
                  {...users}
                />
              ))
            ) : (
              <h4>No users found </h4>
            )}
          </table>
        }
      </div>
    </div>
  );
};

export default Admin;
