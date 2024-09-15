import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../App";
import { SignValidation } from "../../validations/SignValidations";

const SignUpForm = () => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignValidation),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(`${backendUrl}/api/customers/signup`, data);
      // @ts-ignore

      // @ts-ignore
      if (res.data.success) navigator("/email-sent");
    } catch (error: any) {
      console.error("Signup error:", error.message);
    }
  };

  const getErrorMessage = (error: any) => {
    if (error?.message) {
      return error.message;
    }
    return "Invalid value";
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-5  rounded-lg bg-transparent flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.email)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.password)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("phone")}
            placeholder="Phone"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.phone)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("laneAddress")}
            placeholder="Lane Address"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.laneAddress && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.laneAddress)}
            </p>
          )}
        </div>

        <div className="flex flex-row justify-between gap-4">
          <div className="mb-4">
            <input
              {...register("city")}
              placeholder="City"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage(errors.city)}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("pincode")}
              placeholder="Pincode"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage(errors.pincode)}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="mb-4">
            <input
              {...register("state")}
              placeholder="State"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage(errors.state)}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("country")}
              placeholder="Country"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage(errors.country)}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-secondary"
        >
          Submit
        </button>
      </form>
      <p>
        Already have an account?
        <Link className="text-primary px-2" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
