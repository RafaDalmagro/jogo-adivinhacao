import { WORDS, type Challenge } from "./utils/words";
import styles from "./app.module.css";
import { useEffect, useState } from "react";

import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed } from "./components/LettersUsed";
import type { LettersUsedProps } from "./components/LettersUsed";

export function App() {
    const [attempt, setAttempt] = useState(0);
    const [letter, setLetter] = useState("");
    const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([
        { value: "A", correct: true },
        { value: "B", correct: false },
    ]);
    const [challenge, setChallenge] = useState<Challenge | null>(null);

    function handleRestartGame() {
        alert("Reiniciar jogo");
    }

    function startGame() {
        const index = Math.floor(Math.random() * WORDS.length);
        const randomWord = WORDS[index];
        setChallenge(randomWord);

        setAttempt(0);
        setLetter("");
    }

    useEffect(() => {
        startGame();
    }, []);

    if (!challenge) {
        return;
    }

    return (
        <div className={styles.container}>
            <main>
                <Header
                    current={attempt}
                    max={10}
                    onRestart={handleRestartGame}
                />
                <Tip tip="Dica do jogo" />
                <div className={styles.word}>
                    {challenge.word.split("").map(() => (
                        <Letter value="" />
                    ))}
                </div>

                <h4>Palpite</h4>

                <div className={styles.guess}>
                    <Input autoFocus maxLength={1} placeholder="?" />
                    <Button title="Confirmar" />
                </div>

                <LettersUsed data={lettersUsed} />
            </main>
        </div>
    );
}
