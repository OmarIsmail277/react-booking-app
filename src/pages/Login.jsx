// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../features/users/userSlice";
// import { useNavigate } from "react-router-dom";
// import styles from "../styles/login.module.scss";

// function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   console.log(styles);

//   const onSubmit = (data) => {
//     if (data.email === user.email && data.password) {
//       dispatch(login());
//       navigate("/");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <figure className={styles.image_container}>
//         <img src="../../public/login_logo.svg" alt="Logo" />
//       </figure>
//       <h2>LOGIN</h2>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         style={{ maxWidth: "400px", margin: "0 auto" }}
//       >
//         <input
//           className={styles.form__input}
//           placeholder="Email"
//           {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
//         />
//         {errors.email && <p>Valid email is required</p>}

//         <input
//           className="form__input"
//           type="password"
//           placeholder="Password"
//           {...register("password", { required: true })}
//         />
//         {errors.password && <p>Password is required</p>}

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import Styles from "../styles/login.module.scss";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.email === user.email && data.password) {
      dispatch(login());
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={Styles.container}>
      <figure className={Styles.image__wrapper}>
        <img src="../../public/images/login_logo.svg" alt="" />
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
    </div>
  );
}

export default Login;
