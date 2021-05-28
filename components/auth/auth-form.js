import { useRef, useState } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

const createUser = async (email, password) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    header: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.err);
  }
  return data;
};

function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef();
  const password = useRef();
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const currentEmail = email.current.value;
    const currentPassword = password.current.value;
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: currentEmail,
        password: currentPassword,
      });
      console.log(result);
      if (!result.error) {
        router.replace("/profile");
      }
    } else {
      try {
        const result = await createUser(currentEmail, currentPassword);
        router.replace("/profile");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={email} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={password} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
