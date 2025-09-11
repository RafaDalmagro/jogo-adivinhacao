import styles from "./style.module.css";
import { Letter } from "../Letter";
export function LettersUsed() {
    return (
        <div className={styles.lettersUsed}>
            <h5>Letras usadas</h5>
            <div>
                <Letter value="A" size="small" color="right" />
                <Letter value="B" size="small" color="wrong" />
                <Letter value="C" size="small" color="right" />
            </div>
        </div>
    );
}
