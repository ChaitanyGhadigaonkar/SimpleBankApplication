import { Link } from "react-router-dom";

const UsersRow = ({ account_number: userId, name, email, role }) => {
  return (
    <>
      <tr className="border-b-2 ">
        <td className="text-sm py-2 text-left pl-2">
          <Link to={`/admin/${userId}`}>{userId}</Link>
        </td>
        <td className="text-sm py-2 text-left pl-2 capitalize">{name}</td>
        <td className="text-sm py-2 text-left pl-2">{email}</td>
        <td className="text-sm py-2 text-left pl-2">{role}</td>
      </tr>
    </>
  );
};

export default UsersRow;
