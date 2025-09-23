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

const MAX_ATTEMPTS = 5;

export function App() {
    const [score, setScore] = useState(0);
    const [letter, setLetter] = useState("");
    const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
    const [challenge, setChallenge] = useState<Challenge | null>(null);

    function handleRestartGame() {
        const isConfirmed = window.confirm("Tem certeza que deseja reiniciar?");
        if (isConfirmed) {
            startGame();
        }
    }

    function startGame() {
        const index = Math.floor(Math.random() * WORDS.length);
        const randomWord = WORDS[index];
        setChallenge(randomWord);

        setScore(0);
        setLetter("");
        setLettersUsed([]);
    }

    function endGame(message: string) {
        alert(message);
        startGame();
    }

    function handleConfirm() {
        if (!challenge) {
            return;
        }

        if (!letter.trim()) {
            return alert("Informe uma letra");
        }

        const value = letter.toUpperCase();
        const exist = lettersUsed.find((l) => l.value.toUpperCase() === value);

        if (exist) {
            setLetter("");
            return alert("Você já tentou essa letra");
        }

        const hits = challenge.word
            .toUpperCase()
            .split("")
            .filter((l) => l === value).length;

        const correct = hits > 0;

        setLettersUsed((prev) => [...prev, { value, correct }]);

        setLetter("");
    }

    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        if (!challenge) {
            return;
        }

        setTimeout(() => {
            if (score === challenge.word.length) {
                return endGame("Parabéns! Você acertou a palavra!");
            }

            if (lettersUsed.length === challenge.word.length + MAX_ATTEMPTS) {
                return endGame(
                    `Suas tentativas acabaram! A palavra era ${challenge.word}`
                );
            }
        }, 200);
    }, [score, lettersUsed.length]);

    if (!challenge) {
        return;
    }

    return (
        <div className={styles.container}>
            <main>
                <Header
                    current={lettersUsed.length}
                    max={challenge.word.length + MAX_ATTEMPTS}
                    onRestart={handleRestartGame}
                />
                <Tip tip={challenge.tip} />
                <div className={styles.word}>
                    {challenge.word.split("").map((letter, index) => {
                        const letterUsed = lettersUsed.find(
                            (l) =>
                                l.value.toUpperCase() === letter.toUpperCase()
                        );
                        return (
                            <Letter
                                key={index}
                                value={letterUsed?.value}
                                color={letterUsed?.correct ? "right" : "wrong"}
                            />
                        );
                    })}
                </div>

                <h4>Palpite</h4>

                <div className={styles.guess}>
                    <Input
                        autoFocus
                        maxLength={1}
                        placeholder="?"
                        value={letter}
                        onChange={(e) => setLetter(e.target.value)}
                    />
                    <Button title="Confirmar" onClick={handleConfirm} />
                </div>

                <LettersUsed data={lettersUsed} />
            </main>
        </div>
    );
}
