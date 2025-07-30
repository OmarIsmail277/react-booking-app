import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createNewUser } from "../features/User/UserSlice";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../network/axios";
import Styles from "../styles/LoginPage.module.scss";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { fullName, email, country, phone, password } = data;

    try {
      await axiosInstance.post("http://localhost:8000/users", {
        fullName,
        email,
        country,
        phone,
        password,
        bookings: [],
      });

      dispatch(createNewUser(fullName, email, country, phone));

      navigate("/login");
    } catch (error) {
      console.error("Failed to register:", error);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className={Styles.login__wrapper}>
      <div className={Styles.container}>
        <figure className={Styles.image__wrapper}>
          <img src="../../public/images/Vector.svg" alt="" />
        </figure>
        <h3>REGISTER</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            placeholder="Full Name"
            {...register("fullName", { required: true })}
          />
          {errors.fullName && <p>Name is required</p>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && <p>Enter a valid email</p>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/,
            })}
          />
          {errors.password && (
            <p>Password must include capital, number, special char</p>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === watch("password") || "Passwords must match",
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <label htmlFor="country">Country</label>
          <input
            id="country"
            placeholder="Country"
            {...register("country", { required: true })}
          />
          {errors.country && <p>Country is required</p>}

          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            placeholder="Phone"
            {...register("phone", {
              required: true,
              maxLength: 12,
              pattern: /^[0-9]+$/,
            })}
          />
          {errors.phone && <p>Enter a valid phone number</p>}

          <button type="submit">REGISTER</button>
        </form>
        <p className={Styles.register__text}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p className={Styles.socials__text}>
          <strong>Register</strong> with Others
        </p>
        <div className={Styles.socials}>
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
              Register <strong>Google</strong>
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
              Register <strong>Facebook</strong>
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

export default RegisterPage;
