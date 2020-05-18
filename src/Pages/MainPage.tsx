import React, { Component } from 'react';
import Form from '../Components/TaskInputForm';
import ColorTextArea from '../Components/ColorTextArea';
import CurrentJobDisplay from '../Components/CurrentJobDisplay'

import * as RecordAction from "../Actions/RecordAction";
import * as SettingAction from '../Actions/SettingAction';

import buttonStyles from '../Styles/button.css';
import styles from '../Styles/topPage.css';

type Props = {}

type State = {
  workHistory: recordData|null,
  workHistoryStr: string,
  jobInfo: currentJobInfo,
  isWorking: boolean,
  isEdit: boolean,
  recordPath: string,
  sugestList: string[],
  day: number
}

class MainPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = {
      workHistory: null,
			workHistoryStr: '',
      jobInfo: {
        subject: null,
        value: null,
        startTime: null,
      },
			isWorking: false,
			isEdit: false,
      recordPath: '',
      sugestList: [],
      day: date.getDate()
    };
  }

  async componentDidMount() {
    const promiseAllRes = await Promise.all([
      RecordAction.recordStartGet(),
      SettingAction.recordPathGet(),
      SettingAction.getActiveSubject()
    ])
    const startVal = promiseAllRes[0]
    const recordPath = promiseAllRes[1]
    const sugestList = promiseAllRes[2]

    const workHistory = await RecordAction.recordGet(recordPath, this.state.day)
    const jobInfo = startVal.jobInfo;
    console.log(workHistory);
    this.setState({
      jobInfo: jobInfo,
      isWorking: startVal.isDoing,
      recordPath: recordPath,
      sugestList: sugestList,
      workHistory: workHistory,
      workHistoryStr: this.workHistory2Str(workHistory)
    })
  }

  workHistory2Str(workHistory: recordData): string {
    return JSON.stringify(workHistory, null , 4).slice(6, -2).replace(/\n {4}/g, "\n");
  }

  async jobStart(e: {genre: string, name: string}){
    const param = {
      subject: e.genre,
      value: e.name
    }
    await RecordAction.recordStart(param)

    const startVal = await RecordAction.recordStartGet()
    const workHistory = await RecordAction.recordGet(this.state.recordPath, this.state.day)
    const jobInfo = {
      subject: startVal.isDoing ? startVal.jobInfo.subject: null,
      value: startVal.isDoing ? startVal.jobInfo.value: null,
      startTime: startVal.isDoing ? startVal.jobInfo.startTime : null,
    }
		this.setState({
			jobInfo: jobInfo,
			isWorking: startVal.isDoing,
      workHistory: workHistory,
      workHistoryStr: this.workHistory2Str(workHistory)
		})
  }

  async clearJob(){
    await RecordAction.recordClear();

    const workHistory = await RecordAction.recordGet(this.state.recordPath, this.state.day)
    const jobInfo = {
      subject: null,
      value: null,
      startTime: null,
    }
		this.setState({
			jobInfo: jobInfo,
			isWorking: false,
      workHistory: workHistory,
      workHistoryStr: this.workHistory2Str(workHistory)
		});
	}

  async submitJob(){
    await RecordAction.recordEnd()

    const startVal = await RecordAction.recordStartGet();
    const workHistory = await RecordAction.recordGet(this.state.recordPath, this.state.day);
    const jobInfo = {
      subject: startVal.isDoing ? startVal.jobInfo.subject: null,
      value: startVal.isDoing ? startVal.jobInfo.value: null,
      startTime: startVal.isDoing ? startVal.jobInfo.startTime : null
    }
    this.setState({
      jobInfo: jobInfo,
      isWorking: startVal.isDoing,
      workHistory: workHistory,
      workHistoryStr: this.workHistory2Str(workHistory)
    })
	}

  async onClickEditBtn(){
    if(this.state.isEdit){
      const parseData = JSON.parse("{"+this.state.workHistoryStr+"}")
      const param = {
        val: parseData,
        day: this.state.day,
        path: this.state.recordPath
      }
      await RecordAction.recordEdit(param)
    }
		this.setState({
			isEdit: !this.state.isEdit
		});
	}

  copy() {
    const textArea = document.getElementById('working-data-text-area') as HTMLTextAreaElement;
    if (textArea === null) {
      return;
    }
    textArea.select();
    document.execCommand('copy');
    const selection = document.getSelection()
    if (selection === null) {
      return;
    }
    selection.removeAllRanges();
  }

  render () {
    return(
      <div className={styles['main-space']}>
        {
          this.state.isWorking ?
          <CurrentJobDisplay
            jobInfo={this.state.jobInfo}
            onClickEnd={this.submitJob.bind(this)}
            onClickCancel={this.clearJob.bind(this)}
          />:
          <Form
            callSubmit={this.jobStart.bind(this)}
            sugestList={this.state.sugestList}
          />
        }
        <div className={styles['record-space']}>
          <ColorTextArea
            id="working-data-text-area"
            data={this.state.workHistoryStr}
            onChange={(workHistoryStr) => {this.setState({workHistoryStr: workHistoryStr})}}
            isEdit={this.state.isEdit}
            classStyle={styles['text-area']}
          />
          <div className={styles['record-button-space']}>
            <button
              className={`${buttonStyles["padding-button"]} ${styles["copy-button-style"]}`}
              onClick={this.copy}
            >
              Text Copy
            </button>
            <button
              className={`${buttonStyles["padding-button"]} ${this.state.isEdit?styles["edit-button-active-style"]:styles["edit-button-style"]}`}
              onClick={this.onClickEditBtn.bind(this)}
            >
              { this.state.isEdit? 'Edit Finish' : 'Text Edit' }
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default MainPage;
