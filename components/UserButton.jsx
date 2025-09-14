// app/page.js
'use client'; // Este important ca acest cod să ruleze pe client

// Importă componentele de la Clerk
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';

export default function Home() {
  // Verifică dacă este cineva logat
  const { isLoaded, isSignedIn, user } = useUser();

  // Afișează "Se încarcă..." până sunt gata datele
  if (!isLoaded) {
    return <div>Se încarcă...</div>;
  }

  // Dacă este logat, afișează un mesaj și butonul de user
  if (isSignedIn) {
    return (
      <div>
        <h1>Bună, {user.firstName}! 👋</h1>
        <p>Acum ești logat pe site!</p>
        {/* Butonul pentru profil, deconectare, etc. */}
        <UserButton afterSignOutUrl="/"/>
      </div>
    );
  }

  // Dacă NU este logat, afișează butonul de logare
  return (
    <div>
      <h1>Bună, străine! 👋</h1>
      <p>Trebuie să te loghezi mai întâi.</p>
      {/* Buton care duce la pagina de logare */}
      <SignInButton mode="modal">
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Loghează-te
        </button>
      </SignInButton>
    </div>
  );
}
