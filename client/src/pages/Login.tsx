import Vector from "../assets/login.svg";
import LoginForm from "../components/form/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col mt-28 md:mt-0 md:flex-row w-full min-h-screen ">
      <div className="mt-4 md:w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="hidden md:w-1/2 bg-[#F2F2F2] md:h-auto lg:h-screen md:flex md:items-center md:justify-center">
        <img src={Vector} alt="" />
      </div>
    </div>
  );
};

export default Login;
