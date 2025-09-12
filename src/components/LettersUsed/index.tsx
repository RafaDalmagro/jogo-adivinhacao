import styles from "./style.module.css";
import { Letter } from "../Letter";

export type LettersUsedProps = {
    value: string;
    correct: boolean;
};

type Props = {
    data: LettersUsedProps[];
};

export function LettersUsed({ data }: Props) {
    return (
        <div className={styles.lettersUsed}>
            <h5>Letras usadas</h5>
            <div>
                {data.map(({ value, correct }) => (
                    <Letter
                        value={value}
                        size="small"
                        color={correct ? "right" : "wrong"}
                    />
                ))}
            </div>
        </div>
    );
}
