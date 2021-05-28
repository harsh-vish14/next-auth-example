import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const newPass = useRef();
  const oldPass = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPassword = newPass.current.value;
    const oldPassword = oldPass.current.value;
    props.formDetails({
      newPassword,
      oldPassword,
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPass} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPass} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
