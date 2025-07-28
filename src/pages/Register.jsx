import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { fullName, email, country, phone } = data;

    try {
      // 1. Save user to fake API (JSON Server)
      await axios.post("http://localhost:8000/users", {
        fullName,
        email,
        country,
        phone,
        password: data.password, // You can include it if needed
      });

      dispatch(createUser(fullName, email, country, phone));

      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h2>Register</h2>

      <input
        placeholder="Full Name"
        {...register("fullName", { required: true })}
      />
      {errors.fullName && <p>Name is required</p>}

      <input
        placeholder="Email"
        {...register("email", {
          required: true,
          pattern: /^\S+@\S+$/i,
        })}
      />
      {errors.email && <p>Enter a valid email</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          //   pattern: /^(?=.[A-Z])(?=.[0-9])(?=.*[\W_]).{6,}$/,
        })}
      />
      {errors.password && (
        <p>Password must include capital, number, special char</p>
      )}

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: true,
          validate: (value) => value === watch("password"),
        })}
      />
      {errors.confirmPassword && <p>Passwords must match</p>}

      <input
        placeholder="Country"
        {...register("country", { required: true })}
      />
      {errors.country && <p>Country is required</p>}

      <input
        placeholder="Phone"
        {...register("phone", {
          required: true,
          maxLength: 12,
          pattern: /^[0-9]+$/,
        })}
      />
      {errors.phone && <p>Enter a valid phone number</p>}

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
