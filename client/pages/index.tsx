import Head from "next/head";
import "react-responsive-modal/styles.css";
import styles from "styles/Home.module.scss";
import { SignUp } from "./containers/SignUp";
import { PlayerContextProvider } from "./contexts/Player.context";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Play tick tac toe with your friends</h1>
      </main>
      <PlayerContextProvider>
        <SignUp />
      </PlayerContextProvider>
    </div>
  );
}
