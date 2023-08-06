// ./pages/user/[id]/index.js
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';

const user = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Redirect to the home page if the user is not signed in
  if (!session) {
    router.push('/');
    return null;
  }

  return (
    <div>
      <Header />
      <h1>User Profile</h1>
      {session.user ? (
        <>
          <p>Name: {session.user.name}</p>
          {/* <p>Email: {session.user.email}</p> */}
        </>
      ) : (
        <p>User data not available</p>
      )}
    </div>
  );
};

export default user;
