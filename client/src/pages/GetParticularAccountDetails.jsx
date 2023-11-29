import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import TransactionRow from "../components/TransactionRow";
import { VITE_API_URL } from "../../config";

const getUserTransactions = async (account_number) => {
  try {
    const res = await fetch(`${VITE_API_URL}/admin/getUser/${account_number}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: JSON.parse(localStorage.getItem("user")).authToken,
      },
    });
    const data = await res.json();
    if (data.success) {
      const userDetails = data.user;
      const transactions = data.transactions;
      return { userDetails, transactions };
      // return users;
    } else {
      toast.error("somethings went's wrong");
      return;
    }
  } catch (error) {
    toast.error(error.msg);
    return;
  }
};

const GetParticularAccountDetails = () => {
  const { account_number } = useParams();

  const [user, setUser] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { userDetails, transactions } = await getUserTransactions(
        account_number
      );
      setUser(userDetails);
      setTransactions(transactions);
    };
    getData();
  }, []);

  return (
    <div className="mx-auto w-full max-w-screen-xl px-3.5 md:px-20 flex-1 flex flex-col my-5">
      <h3 className="text-lg font-semibold font-sans px-5">
        Details of : {account_number}
      </h3>
      <h3 className="font-sans font-semibold text-left my-5 px-5">
        {user && user.name} previous transactions
      </h3>
      <table className="w-full">
        <tr className="border-b-2">
          <td className="text-sm py-2 text-left pl-2 capitalize">
            {"Transaction Id"}
          </td>
          <td className="text-sm py-2 text-left pl-2 capitalize capitalize">
            {"action"}
          </td>
          <td className="text-sm py-2 text-left pl-2 capitalize">{"amount"}</td>
          <td className="text-sm py-2 text-left pl-2 capitalize">{"date"}</td>
        </tr>
        {/* {JSON.stringify(transactions)} */}

        {transactions ? (
          transactions.map((transaction) => (
            <TransactionRow
              key={transaction._id}
              {...transaction}
            />
          ))
        ) : (
          <h4>No transactions recorded </h4>
        )}
      </table>
    </div>
  );
};

export default GetParticularAccountDetails;
