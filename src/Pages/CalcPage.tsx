import React, { Component } from 'react';
import Form from '../Components/CalcInputForm';
import ColorTextArea from '../Components/ColorTextArea';

import buttonStyles from '../Styles/button.css';
import styles from '../Styles/calcPage.css';

import API from "../Actions/ApiList"
import * as CalcAction from "../Actions/CalcAction";
import * as SettingAction from '../Actions/SettingAction';

type Props = {}

type State = {
  day: number,
  path: string,
  resultText: string,
  figURL: string
}

class CalcPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = {
			day: date.getDate(),
      path: "",
			resultText: "",
      figURL: ""
    };
  }

  async componentDidMount(){
    const recordPath = await SettingAction.recordPathGet()
    const figpath = `${API.UrlBase}/${API.Storage}/fig/${recordPath.replace(".json", ".png")}`
    this.setState({
      path: recordPath,
      figURL: figpath
    })
  }

  async dailyCalc() {
    const query = {
      date: this.state.day,
      path: this.state.path
    }
    const resTxt = await CalcAction.dailyCalc(query);
    this.setState({
      resultText: resTxt
    })
  }

  async saveFig(){
    const param = {json_path: this.state.path, save_path: this.state.path.replace(".json", ".png")}
		const figURL = await CalcAction.save(param)
    this.setState({
      figURL: figURL
    })
	}

  setPath(newName: string) {
    this.setState({
      path: newName
    })
  }

  setDay(newDay: number) {
    this.setState({
      day: newDay
    })
  }

  copy() {
    const textArea = document.getElementById('daily-data-text-area') as HTMLTextAreaElement;
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
    const timestamp = (new Date()).getTime()
    return(
      <div className={styles['main-space']}>
        <Form
          fileName={this.state.path}
          date={this.state.day}
          changeFileName={this.setPath.bind(this)}
          changeDate={this.setDay.bind(this)}
          onClickCalc={this.dailyCalc.bind(this)}
          onClickSaveFig={this.saveFig.bind(this)}
        />
        <div className={styles['record-space']}>
          <div className={styles['daily-data']}>
            <ColorTextArea
              id="daily-data-text-area"
              data={this.state.resultText}
              isEdit={true}
              classStyle={styles['text-area']}
            />
            <div className={styles['record-button-space']}>
              <button
                className={`${buttonStyles["padding-button"]} ${styles["copy-button-style"]}`}
                onClick={this.copy}
              >
                Text Copy
              </button>
            </div>
          </div>
          <div
            className={styles['month-fig']}
          >
            <img
              src={`${this.state.figURL}?_=${timestamp}`}
              alt="月次グラフ"
              height="100%"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CalcPage;
