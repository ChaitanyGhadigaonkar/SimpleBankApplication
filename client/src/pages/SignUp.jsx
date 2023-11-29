import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";
import toast from "react-hot-toast";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { user, registerHandler } = useContext(authContext);

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password[0] !== confirmPassword) {
      toast.error("passwords are not matching");
      return;
    }
    await registerHandler(
      credentials.name[0],
      credentials.email[0],
      credentials.password[0]
    );
    setCredentials({
      name: "",
      email: "",
      password: "",
    });
    setConfirmPassword("");
    navigate("/login");
  };

  return (
    <main className="flex-1 flex flex-col justify-center items-center my-5">
      <h1 className="font-semibold ">Sign Up</h1>

      <form
        className="flex flex-col w-full flex-1 gap-3 px-5 sm:w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-base "
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="outline-none px-2 py-2 text-sm rounded-lg border-[1px] active:border-slate-600 focus:border-slate-600"
            placeholder="Enter name"
            value={credentials.name}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-base "
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="outline-none px-2 py-2 text-sm rounded-lg border-[1px] active:border-slate-600 focus:border-slate-600"
            placeholder="Enter Email"
            value={credentials.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-base "
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="outline-none px-2 py-2 text-sm rounded-lg border-[1px] active:border-slate-600 focus:border-slate-600"
            placeholder="Enter password"
            value={credentials.password}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="c-password"
            className="text-base "
          >
            Password
          </label>
          <input
            type="password"
            name="confirm-password"
            className="outline-none px-2 py-2 text-sm rounded-lg border-[1px] active:border-slate-600 focus:border-slate-600"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Link
          to={"/login"}
          className="text-sm font-semibold text-zinc-500 hover:text-zinc-900"
        >
          Already a user?
        </Link>
        <button
          className="items-center hover:bg-hover bg-blue-600 mx-auto rounded-lg border-0 py-1 px-3 focus:outline-none transition-colors text-base mt-4 md:mt-0"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default SignUp;
