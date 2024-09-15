import Vector from "../assets/Twoauth.svg";
import SignUpForm from "../components/form/SignUpForm";

const SignUp = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full min-h-screen ">
      <div className="md:w-1/2 flex items-center justify-center">
        <SignUpForm />
      </div>
      <div className="hidden  md:w-1/2 bg-[#F2F2F2] md:h-auto lg:h-screen md:flex md:items-center md:justify-self-center">
        <img src={Vector} alt="" />
      </div>
    </div>
  );
};

export default SignUp;
