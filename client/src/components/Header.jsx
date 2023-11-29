import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";
import { Landmark, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Header = () => {
  const { user } = useContext(authContext);
  // console.log(JSON.parse(user).account_number);
  const navigate = useNavigate();
  return (
    <header className="text-gray-600 body-font mx-auto w-full max-w-screen-xl px-3.5">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Landmark />
          <span className="ml-3 text-xl">MyBank</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center gap-8">
          {!localStorage.getItem("user") ? (
            <>
              <Link
                to="/login"
                className="hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="hover:text-gray-900"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0  gap-2"
              onClick={() => {
                localStorage.removeItem("user");
                toast.success("logout successfully");
                navigate("/login");
              }}
            >
              {
                <LogOut
                  width={15}
                  height={15}
                />
              }
              Logout
            </button>
          )}
        </nav>
        {user && (
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <Link
              to="/accounts"
              className="flex gap-2 items-center"
            >
              {localStorage.getItem("user") &&
                JSON.parse(localStorage.getItem("user")).account_number}
            </Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
