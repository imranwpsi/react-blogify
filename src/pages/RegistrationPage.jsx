import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/common/Field";
import { useAuth } from "../hooks/useAuth";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, formData);

      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.accessToken;
          const refreshToken = token.refreshToken;

          console.log(`Login time auth token: ${authToken}`);
          setAuth({ user, authToken, refreshToken });

          navigate("/me");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(`User with email ${formData.email} is not found`);
    }
  }

  return (
    <main>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-6">
              <Field label="First Name" error={errors.firstName}>
                <input
                  {...register("firstName", { required: "First Name is Required" })}
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`auth-input ${errors.email ? "border-red-500" : ""}`}
                />
              </Field>
            </div>
            <div className="mb-6">
              <Field label="Last Name" error={errors.lastName}>
                <input
                  {...register("lastName", { required: "Last Name is Required" })}
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`auth-input ${errors.email ? "border-red-500" : ""}`}
                />
              </Field>
            </div>
            <div className="mb-6">
              <Field label="Email" error={errors.email}>
                <input
                  {...register("email", { required: "Email ID is Required" })}
                  className={`auth-input ${errors.email ? "border-red-500" : ""}`}
                  type="email"
                  name="email"
                  id="email"
                />
              </Field>
            </div>
            <div className="mb-6">
              <Field label="Password" error={errors.password}>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Your password must be at least 8 characters",
                    },
                  })}
                  className={`auth-input ${errors.password ? "border-red-500" : ""}`}
                  type="password"
                  name="password"
                  id="password"
                />
              </Field>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Create Account
              </button>
            </div>
            <p className="text-center">
              Already have account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
