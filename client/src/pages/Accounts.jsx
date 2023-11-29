import { useContext, useEffect } from "react";
import { authContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { transactionContext } from "../context/transactionContext";
import TransactionRow from "../components/TransactionRow";
import ActionModal from "../components/ActionModal";

const Accounts = ({ setModalOpen, setModalChildren }) => {
  // const { user } = useContext(authContext);
  const { transactions, getTransactions, getBalance, balance } =
    useContext(transactionContext);
  const navigate = useNavigate();

  const handleAction = (action) => {
    setModalChildren(
      <ActionModal
        action={action}
        setModalOpen={setModalOpen}
      />
    );
    setModalOpen(true);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      // console.log(transactions);
      getTransactions();
      getBalance();
      // console.log(transactions);
    }
  }, [balance]);
  return (
    <div className="mx-auto w-full max-w-screen-xl px-3.5 md:px-20 flex-1 flex flex-col items-center my-5">
      <h1 className="font-semibold text-lg">
        Welcome to MyBank,
        <span className="font-bold text-xl">
          {" "}
          {/* {JSON.parse(localStorage.getItem("user")) &&
            JSON.parse(localStorage.getItem("user")).name} */}
        </span>
      </h1>
      <div className="transactions my-5 flex flex-col gap-5 w-full px-5 text-lg">
        <h4 className="font-sans font-semibold text-left ">
          Want to do transactions ?
        </h4>
        <div className="w-full flex items-center justify-center gap-10">
          <button
            className="items-center hover:bg-hover bg-red-400 mx-auto rounded-lg border-0 py-1 px-3 focus:outline-none transition-colors text-base mt-4 md:mt-0"
            type="button"
            onClick={() => handleAction("withdraw")}
          >
            Withdraw
          </button>
          <button
            className="items-center hover:bg-hover bg-green-600 mx-auto rounded-lg border-0 py-1 px-3 focus:outline-none transition-colors text-base mt-4 md:mt-0"
            type="button"
            onClick={() => handleAction("deposit")}
          >
            Deposit
          </button>
        </div>

        <h3 className="font-sans font-semibold text-left my-5">
          Your previous transactions
        </h3>
        <table>
          {transactions.length !== 0 && (
            <tr className="border-b-2">
              <td className="text-sm py-2 text-left pl-2 capitalize">
                {"Transaction Id"}
              </td>
              <td className="text-sm py-2 text-left pl-2 capitalize ">
                {"action"}
              </td>
              <td className="text-sm py-2 text-left pl-2 capitalize">
                {"amount"}
              </td>
              <td className="text-sm py-2 text-left pl-2 capitalize">
                {"date"}
              </td>
            </tr>
          )}
          {/* {JSON.stringify(transactions)} */}

          {transactions.length !== 0 ? (
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
    </div>
  );
};

export default Accounts;
