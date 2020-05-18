import React from 'react';
import styles from '../Styles/topPage.css';
import buttonStyles from '../Styles/button.css';

type Props = {
  jobInfo: currentJobInfo,
  onClickEnd: () => void,
  onClickCancel: () => void
}

const CurrentJobDisplay: React.FC<Props>  = (props: Props) => {
  return (
    <div className={styles['current-job']}>
      <div className={styles['current-job-field']}>
        <div className={styles['current-job-info']}>
          <div>
            { `${props.jobInfo.subject} / ${props.jobInfo.value}` }
          </div>
          <div>
            {`${props.jobInfo.startTime} - `}
          </div>
        </div>
      </div>
      <div className={buttonStyles["button-space"]}>
        <button
          className={`${buttonStyles["padding-button"]} ${styles["submit-button-style"]}`}
          onClick={props.onClickEnd}
        >
          Job End
        </button>
        <button
          className={`${buttonStyles["padding-button"]} ${styles["cancel-button-style"]}`}
          onClick={props.onClickCancel}
        >
          Job Cancel
        </button>
      </div>
    </div>
  )
}

export default CurrentJobDisplay;
