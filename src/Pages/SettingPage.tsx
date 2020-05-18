import React, { Component } from 'react';
import Form from '../Components/SettingInputForm';
import SubjectListArea from '../Components/SubjectListArea';

import buttonStyles from '../Styles/button.css';
import styles from '../Styles/settingPage.css';

import * as SettingAction from '../Actions/SettingAction';

type Props = {}

type State = {
  path: string,
  colorConfigActv: subject[],
  colorConfigNote: subject[],
  sortValMax: number,
  newValSubj: string,
  newValColor: string
}

class SettingPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      path: "",
      colorConfigActv: [],
      colorConfigNote: [],
      sortValMax: 0,
      newValSubj: "",
      newValColor: "#ffffff"
    };
  }

  async componentDidMount(){
    const promiseAllRes = await Promise.all([
      SettingAction.recordPathGet(),
      SettingAction.getSubjectColor()
    ])
    const recordPath = promiseAllRes[0]
    const colorList = promiseAllRes[1]


    const maxVal = Math.max(...colorList.active.concat(colorList.note).map((v) => {
      return v.sort_val
    }))

    this.setState({
      path: recordPath,
      colorConfigActv: colorList.active,
      colorConfigNote: colorList.note,
      sortValMax: maxVal
    })
  }

  async postPath(){
    await SettingAction.recordPathSet({path: this.state.path})
  }

  async sendMergeColor(){
    const colorSetting = this.state.colorConfigActv.concat(this.state.colorConfigNote)
    await SettingAction.sendSubjectColor(colorSetting)
    const colorList = await SettingAction.getSubjectColor()
    const maxVal = Math.max(...colorList.active.concat(colorList.note).map((v) => {
      return v.sort_val
    }))
    this.setState({
      colorConfigActv: colorList.active,
      colorConfigNote: colorList.note,
      sortValMax: maxVal
    })
  }

  async addValue() {
    if(this.state.newValSubj === ""){
      return
    }
    let colorList = this.state.colorConfigActv
    const addVal = {
      color: this.state.newValColor,
      is_active: true,
      name: this.state.newValSubj,
      sort_val: this.state.sortValMax + 1
    }
    colorList.push(addVal)
    this.setState({
      colorConfigActv: colorList,
      sortValMax: this.state.sortValMax + 1,
      newValSubj: "",
      newValColor: "#ffffff"
    })
    await this.sendMergeColor()
  }

  async sortChange(from:'active'|'invalid', oldIndex:number, newIndex:number, isChangeStatus:boolean) {
    const baseData = from === 'active' ? this.state.colorConfigActv.slice() : this.state.colorConfigNote.slice();
    const otherData = from === 'active' ? this.state.colorConfigNote.slice(): this.state.colorConfigActv.slice();


    if (isChangeStatus) {
      const targetData = baseData[oldIndex];
      baseData.splice(oldIndex, 1);
      otherData.push(targetData);

      const sortVals = otherData.map((v) => {
        return v.sort_val;
      });
      sortVals.sort();

      otherData.forEach((val, i) => {
        if (i < newIndex) {
          val.sort_val = sortVals[i];
        } else if (i === otherData.length) {
          val.sort_val = sortVals[newIndex];
        } else {
          val.sort_val = sortVals[i + 1];
        }
      });
    } else {
      const sortVals = baseData.map((v) => {
        return v.sort_val;
      });
      const changeIndexMin = Math.min(oldIndex, newIndex);
      const changeIndexMax = Math.max(oldIndex, newIndex);
      baseData.forEach((val, i) => {
        if (i < changeIndexMin || changeIndexMax < i) {
          val.sort_val = sortVals[i];
        } else if (i === oldIndex) {
          val.sort_val = sortVals[newIndex];
        } else {
          const diffVal = oldIndex < i ? -1 : 1;
          val.sort_val = sortVals[i + diffVal];
        }
      });
    }


    const colorConfigActv = from === 'active' ? baseData : otherData;
    const colorConfigNote = from === 'active' ? otherData : baseData;
    this.setState({
      colorConfigActv: colorConfigActv,
      colorConfigNote: colorConfigNote
    });
    await this.sendMergeColor();
  }

  async toInvalid(index: number) {
    const activData = this.state.colorConfigActv.slice();
    const noteData = this.state.colorConfigNote.slice();

    const targetData = activData[index];
    targetData.is_active = !targetData.is_active;

    activData.splice(index, 1);
    noteData.push(targetData);

    this.setState({
      colorConfigActv: activData,
      colorConfigNote: noteData
    });
    await this.sendMergeColor();
  }

  async toActive(index: number) {
    const activData = this.state.colorConfigActv.slice();
    const noteData = this.state.colorConfigNote.slice();

    const targetData = noteData[index];
    targetData.is_active = !targetData.is_active;

    noteData.splice(index, 1);
    activData.push(targetData);

    this.setState({
      colorConfigActv: activData,
      colorConfigNote: noteData
    });
    await this.sendMergeColor();
  }

  async onChangeColor(statusKey: 'colorConfigActv'|'colorConfigNote', index: number, color:string) {
    const targetVal = this.state[statusKey].slice();
    targetVal[index].color = color;

    const newState = {
      colorConfigActv: {
        colorConfigActv: targetVal,
        colorConfigNote:  this.state.colorConfigNote
      },
      colorConfigNote: {
        colorConfigNote: targetVal,
        colorConfigActv:  this.state.colorConfigActv
      },
    }[statusKey]

    this.setState(newState);
    await this.sendMergeColor();
  }

  render () {
    return(
      <div className={styles['main-space']}>
        <Form
          fileName={this.state.path}
          changeFileName={(path) => {this.setState({path: path})}}
          onClickSave={this.postPath.bind(this)}
        />
        <div className={styles['record-space']}>
          <div className={styles['daily-data']}>
            <div className={styles['label']}>
              valid subjects
            </div>
            <SubjectListArea
              data={this.state.colorConfigActv}
              id="active"
              classStyle={styles['text-area']}
              onChange={function(this:SettingPage, oldIndex:number, newIndex:number, isChangeStatus:boolean){
                this.sortChange('active', oldIndex, newIndex, isChangeStatus)
              }.bind(this)}
              onStateChange={this.toInvalid.bind(this)}
              onChangeColor={function (this: SettingPage, index: number, color:string) {this.onChangeColor('colorConfigActv', index, color)}.bind(this)}
            />
            <div className={styles['add-subject-space']}>
              <div className={styles['add-form']}>
                <input
                  type="text"
                  value={this.state.newValSubj}
                  onChange={(e) => {this.setState({newValSubj: e.target.value})}}
                />
                <input
                  type="color"
                  value={this.state.newValColor}
                  onChange={(e) => {this.setState({newValColor: e.target.value})}}
                />
              </div>
              <button
                className={`${buttonStyles["padding-button"]} ${styles["copy-button-style"]}`}
                onClick={this.addValue.bind(this)}
              >
                add
              </button>
            </div>
          </div>
          <div className={styles['daily-data']}>
            <div className={styles['label']}>
              invalid subjects
            </div>
            <SubjectListArea
              data={this.state.colorConfigNote}
              id="invalid"
              classStyle={styles['text-area']}
              onChange={function(this:SettingPage, oldIndex:number, newIndex:number, isChangeStatus:boolean){
                this.sortChange('invalid', oldIndex, newIndex, isChangeStatus)
              }.bind(this)}
              onStateChange={this.toActive.bind(this)}
              onChangeColor={function (this:SettingPage, index: number, color:string) {this.onChangeColor('colorConfigNote', index, color)}.bind(this)}
              isShowDeleteBtn={true}
            />
            <div className={styles['add-subject-space']}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingPage;
