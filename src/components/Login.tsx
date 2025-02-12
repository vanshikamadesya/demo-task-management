import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { login } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.auth.users);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // ✅ Form Submission
  const handleLogin = (values: { name: string; password: string }) => {
    const existingUser = users.find(
      (user) => user.name === values.name && user.password === values.password
    );

    if (existingUser) {
      dispatch(login({
        // id: existingUser.id,
        name: existingUser.name,
          email: existingUser.email,
        password: existingUser.password
      }));
      navigate("/"); // ✅ Redirect to home after login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Login
        </h2>

        <Formik
          initialValues={{ name: "", password: "" }} // ✅ Removed email field
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Username Field */}
              <div>
                <Field
                  type="text"
                  name="name" // ✅ Fixed field name
                  placeholder="Username"
                  className={`w-full p-3 border ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <ErrorMessage
                  name="name"
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
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 w-full p-3 text-white rounded transition text-lg font-semibold"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
