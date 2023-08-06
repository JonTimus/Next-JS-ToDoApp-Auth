import Header from '@/components/Header';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { requireAuthentication } from '@/utils/requireAuthentication';
import TodoList from '@/components/TodoList';

const SecurePage = ({ session }) => {
  const handleSignOut = async () => {
    await signOut(); // Sign out using the signOut function
  };

  return (
    <>
      <Header />
      <main className='conatiner mx-auto flex flex-col items-center justify-center'>
        {session ? 
          (
            <>
              <p>Welcome, {session.user.name}!</p>
              <TodoList />
              <button className='text-blue-400' onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <button className='text-blue-400' onClick={() => signIn()}>
              Sign In
            </button>
          )
        }
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  return requireAuthentication(context, ({ session }) => {
    return {
      props: { session },
    };
  });
}

export default SecurePage;