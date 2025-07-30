import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/User/UserSlice";
import { useNavigate } from "react-router-dom";
import Styles from "../styles/LoginPage.module.scss";
import { Link } from "react-router-dom";
import axiosInstance from "../network/axios"; // your axios instance

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.get("/users", {
        params: { email: data.email },
      });

      const user = res.data[0]; // assuming email is unique

      if (user && user.password === data.password) {
        dispatch(login(user)); // pass user info to Redux if needed
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className={Styles.login__wrapper}>
      <div className={Styles.container}>
        <figure className={Styles.image__wrapper}>
          <img src="../../public/images/Vector.svg" alt="" />
        </figure>

        <h3>LOGIN</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />

          {errors.email && <p>Valid email is required</p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <p>Password is required</p>}

          <button type="submit">LOGIN</button>
        </form>
        <p className={Styles.register__text}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <p className={Styles.socials__text}>
          <strong>Login</strong> with Others
        </p>

        <div className="{Styles.socials}">
          <a
            href="https://accounts.google.com/o/oauth2/v2/auth"
            target="_blank"
            rel="noopener noreferrer"
            className={Styles.socials__item}
          >
            <div className={Styles.socials__img}>
              <img src="/images/google 1.svg" alt="Google" />
            </div>
            <p>
              Login with <strong>Google</strong>
            </p>
          </a>

          <a
            href="https://facebook.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className={Styles.socials__item}
          >
            <div className={Styles.socials__img}>
              <img src="/images/facebook 1.svg" alt="Facebook" />
            </div>
            <p>
              Login with <strong>Facebook</strong>
            </p>
          </a>
        </div>
      </div>

      <figure className={Styles.bg__wrapper}>
        <img src="../../public/images/BG.png" alt="" />
      </figure>
    </div>
  );
}

export default LoginPage;
