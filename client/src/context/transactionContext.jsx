import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { VITE_API_URL } from "../../config";

export const transactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const getTransactions = async () => {
    // console.log("yes it is running");
    try {
      const res = await fetch(`${VITE_API_URL}/account/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: JSON.parse(localStorage.getItem("user")).authToken,
        },
      });
      const data = await res.json();
      if (data.success) {
        setTransactions(data.transactions);
      } else {
        toast.error("somethings went's wrong");
      }
    } catch (err) {
      // console.log(err);
      toast.error(err);
    }
  };
  const getBalance = () => async () => {
    try {
      const res = await fetch(`${VITE_API_URL}/account/getBalance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: JSON.parse(localStorage.getItem("user")).authToken,
        },
      });
      const data = await res.json();
      console.log(data.balance);
      if (data.success) {
        // toast.success("transactions added successfully");
        setBalance(data.balance);
        // console.log(data.balance);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.msg);
    }
  };
  const addTransaction = async (amount, action) => {
    try {
      const res = await fetch(`${VITE_API_URL}/account/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: JSON.parse(localStorage.getItem("user")).authToken,
        },
        body: JSON.stringify({ amount, action }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("transactions added successfully");
        setBalance(data.balance);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.msg);
    }
  };

  return (
    <transactionContext.Provider
      value={{
        transactions,
        setTransactions,
        getTransactions,
        addTransaction,
        getBalance,
        balance,
      }}
    >
      {children}
    </transactionContext.Provider>
  );
};
