import React from 'react';

import styles from '../Styles/textArea.css';

type Props = {
  id: string
  data: string,
  onChange?: (v: string) => void,
  classStyle?: string,
  isEdit?: boolean,
  placeholder?: string
}

const ColorTextArea: React.FC<Props>  = (props: Props) => {

  return (
    <textarea
      id={props.id}
      className={`${styles['area-space']} ${props.classStyle}`}
      value={props.data}
      onChange={(e) => {if(props.onChange){props.onChange(e.target.value)}}}
      readOnly={!props.isEdit}
      placeholder={props.placeholder}
    ></textarea>
  )
}

ColorTextArea.defaultProps = {
  isEdit: false,
  placeholder: '',
  classStyle: ''
};

export default ColorTextArea;
