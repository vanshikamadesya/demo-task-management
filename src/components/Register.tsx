import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/\d/, "Must contain at least one number")
      .required("Password is required"),
  });

  // ✅ Form Submission
  const handleRegister = (values: { name: string; email: string; password: string }) => {
    dispatch(register(values));
    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Register
        </h2>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Name Field */}
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="UserName"
                  className={`w-full p-3 border ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />
              </div>

              {/* Email Field */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={`w-full p-3 border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />
              </div>

              {/* Password Field with Eye Icon */}
              <div className="relative w-full">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`w-full p-3 pr-10 border ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 w-full p-3 text-white rounded-lg transition text-lg font-semibold"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-5 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
