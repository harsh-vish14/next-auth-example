import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  const formDetails = async (passwords) => {
    const res = await fetch("/api/users/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwords),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm formDetails={formDetails} />
    </section>
  );
}

export default UserProfile;
