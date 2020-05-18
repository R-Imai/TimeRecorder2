import React from 'react';

import styles from '../Styles/settingPage.css';
import buttonStyles from '../Styles/button.css';
import formStyles from '../Styles/formStyle.css';

type Props = {
  fileName: string,
  changeFileName: (val: string) => void,
  onClickSave: () => void
}


const SettingInputForm: React.FC<Props>  = (props: Props) => {
  return (
    <form className={`${formStyles["form-style"]} ${styles["form-calc"]}`}>
      <fieldset>
        <input
          value={props.fileName}
          onChange={(e) => {props.changeFileName(e.target.value)}}
          placeholder="保存先ファイル名"
          type="text"
        />
      </fieldset>
      <div className={buttonStyles["button-space"]}>
				<button
          className={`${buttonStyles["padding-button"]} ${styles["calc-button-style"]}`}
          onClick={props.onClickSave}
          type="button"
        >
        set path
        </button>
			</div>
    </form>
  )
}

export default SettingInputForm;
