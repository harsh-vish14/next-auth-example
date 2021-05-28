import { getSession } from "next-auth/client";
import UserProfile from "../components/profile/user-profile";

function ProfilePage({ session }) {
  console.log(session);
  return <UserProfile />;
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default ProfilePage;
