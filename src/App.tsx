import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";

export function App() {
    function handleRestartGame() {
        alert("Reiniciar jogo");
    }

    return (
        <div className={styles.container}>
            <main>
                <Header current={5} max={10} onRestart={handleRestartGame} />
                <Tip tip="Dica do jogo" />
            <div className={styles.word}>
                <Letter value="R" />
                <Letter value="A" />
                <Letter value="F" />
                <Letter value="A" />
                <Letter value="E" />
                <Letter value="L" />
            </div>
            </main>
        </div>
    );
}
