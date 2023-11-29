const TransactionRow = ({
  _id: transactionId,
  action,
  amount,
  createdAt: date,
}) => {
  return (
    <>
      <tr className="border-b-2 ">
        <td className="text-sm py-2 text-left pl-2">{transactionId}</td>
        <td className="text-sm py-2 text-left pl-2 capitalize">{action}</td>
        <td className="text-sm py-2 text-left pl-2">{amount}</td>
        <td className="text-sm py-2 text-left pl-2">{date}</td>
      </tr>
    </>
  );
};

export default TransactionRow;
