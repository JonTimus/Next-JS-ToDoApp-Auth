import Header from '@/components/Header';
import Head from 'next/head';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import TodoList from '@/components/TodoList';

export default function Home() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut(); // Sign out using the signOut function
  };

  return (
    <>
      <Head>
        <title>NextJS ToDo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <main className='conatiner mx-auto flex flex-col items-center justify-center'>
        {status === 'authenticated' ? (
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
        )}
      </main>
    </>
  );
}
