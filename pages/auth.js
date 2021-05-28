import { getSession } from "next-auth/client";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  return <AuthForm />;
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        session,
      },
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default AuthPage;
