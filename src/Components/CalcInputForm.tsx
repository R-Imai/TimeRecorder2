import React from 'react';

import styles from '../Styles/calcPage.css';
import buttonStyles from '../Styles/button.css';
import formStyles from '../Styles/formStyle.css';

type Props = {
  fileName: string,
  date: number,
  changeFileName: (val: string) => void,
  changeDate: (val: number) => void,
  onClickCalc: () => void,
  onClickSaveFig: () => void
}

const CalcInputForm: React.FC<Props>  = (props: Props) => {
  return (
    <form className={`${formStyles["form-style"]} ${styles["form-calc"]}`}>
      <fieldset>
        <input
          value={props.fileName}
          onChange={(e) => {props.changeFileName(e.target.value)}}
          placeholder="ファイル名"
          type="text"
        />
        <input
          value={props.date}
          onChange={(e) => {props.changeDate(Number(e.target.value))}}
          placeholder="日付"
          type="number"
        />
      </fieldset>
      <div className={buttonStyles["button-space"]}>
				<button
          className={`${buttonStyles["padding-button"]} ${styles["calc-button-style"]}`}
          onClick={props.onClickCalc}
          type="button"
        >
          Calc Data
        </button>
        <button
          className={`${buttonStyles["padding-button"]} ${styles["save-fig-button-style"]}`}
          onClick={props.onClickSaveFig}
          type="button"
        >
          Save Fig
        </button>
			</div>
    </form>
  )
}

export default CalcInputForm;
