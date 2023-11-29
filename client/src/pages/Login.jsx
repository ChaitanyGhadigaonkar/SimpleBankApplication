import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";

const Login = () => {
  const { loginHandler } = useContext(authContext);

  const navigate = useNavigate();
  // console.log(user);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await loginHandler(credentials.email[0], credentials.password[0]);
    navigate("/accounts");
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/accounts");
    }
  }, []);

  return (
    <main className="mx-auto w-full max-w-screen-xl px-3.5 md:px-20 flex-1 flex flex-col justify-center items-center my-5">
      <h1 className="font-semibold ">Login</h1>

      <form
        className="flex flex-col w-full flex-1 gap-3 px-5 sm:w-1/2"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-base"
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
        <Link
          to={"/sign-up"}
          className="text-sm font-semibold text-zinc-500 hover:text-zinc-900"
        >
          New Here?
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

export default Login;
