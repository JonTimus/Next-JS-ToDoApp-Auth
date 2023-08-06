import { getSession } from "next-auth/react";

export const requireAuthentication = async (context, cb) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/unauthenticated",
        permanent: false,
      },
    };
  }

  return cb({ session }); // Pass the session object as an argument to the callback
};
