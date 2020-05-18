import React, { Component } from 'react';

import styles from '../Styles/topPage.css';
import buttonStyles from '../Styles/button.css';
import formStyles from '../Styles/formStyle.css';

type Props = {
  sugestList: string[],
  callSubmit: (e: State) => void
}

type State = {
  genre: string,
  name: string
}

class TaskInputForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      genre: "",
      name: ""
    };
  }

  submit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (this.state.genre !== "") {
      this.props.callSubmit(this.state)
    }
  }

  render() {
    const dataList = this.props.sugestList.map((v) => {
      return (<option value={v} key={v} />)
    })
    return (
      <form className={`${formStyles["form-style"]} ${styles["form-top"]}`}>
        <fieldset>
          <input onChange={(e) => {this.setState({genre: e.target.value})}} placeholder="作業ジャンル" type="text" list="sudgest" />
          <datalist id="sudgest">
            {dataList}
          </datalist>
          <input onChange={(e) => {this.setState({name: e.target.value})}} placeholder="作業名" type="text" />
        </fieldset>
        <div className={buttonStyles["button-space"]}>
					<button
            className={`${buttonStyles["padding-button"]} ${styles["submit-button-style"]}`}
            onClick={this.submit.bind(this)}
            type="button"
          >
            Job Start
          </button>
				</div>
      </form>
    )
  }
}

export default TaskInputForm;
