import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { transactionContext } from "../context/transactionContext";

const ActionModal = ({ action, setModalOpen }) => {
  const [amount, setAmount] = useState(0);
  const { balance, addTransaction } = useContext(transactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(typeof amount);
    const amountValue = parseInt(amount);
    console.log(typeof amountValue, amountValue);
    if (isNaN(amountValue)) {
      toast.error("Please enter a valid amount");
      return;
    }
    addTransaction(amountValue, action);
    setModalOpen(false);
  };
  return (
    <div className="flex w-full px-2 py-2 flex-col items-center gap-3">
      <h3 className="font-sans font-semibold text-left ">
        Your account balance is : {balance}
      </h3>

      <div className="form flex flex-col items-center gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="amount"
            className="text-base"
          >
            Enter amount
          </label>
          <input
            type="amount"
            name="amount"
            className="outline-none px-2 py-2 text-sm rounded-lg border-[1px] active:border-slate-600 focus:border-slate-600"
            placeholder="Enter Email"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          className={`items-center hover:bg-hover ${
            action === "withdraw" ? "bg-red-400" : "bg-green-600"
          }  mx-auto rounded-lg border-0 py-1 px-3 focus:outline-none transition-colors text-base mt-4 md:mt-0`}
          onClick={handleSubmit}
        >
          {action}
        </button>
      </div>
    </div>
  );
};

export default ActionModal;
