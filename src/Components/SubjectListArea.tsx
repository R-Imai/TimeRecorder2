import React from 'react';
import Sortable from 'sortablejs';

import styles from '../Styles/subjectSetting.css';

type Props = {
  data: subject[],
  id: string,
  classStyle?: string,
  isShowDeleteBtn?: boolean,
  onChange: (oldIndex:number, newIndex:number, isChangeStatus:boolean) => void,
  onStateChange: (index:number) => void,
  onChangeColor: (index:number, color:string) => void,
}

const fontSize = (strLength: number) => {
  let size = 200/strLength > 18 ? 18 : 200/strLength
  return size
}

const SubjectListArea: React.FC<Props>  = (props: Props) => {

  React.useEffect(() => {
    const onMove = (e:Sortable.SortableEvent) => {
      console.log('onMove')
      const oldIndex = e.oldIndex
      const newIndex = e.newIndex
      const isChangeStatus = e.target !== e.to;
      if (typeof oldIndex === 'undefined' || typeof newIndex === 'undefined') {
        return false;
      }
      if (oldIndex !== newIndex || isChangeStatus) {
        props.onChange(oldIndex, newIndex, isChangeStatus);
      }
      return false;
    }
    const dom = document.getElementById(props.id);
    if(dom === null) {
      return;
    }
    Sortable.create(dom,{
      // group: "shared",
      onEnd: onMove
    });
    return () => {}
  }, [props]);

  return (
    <ul id={props.id} className={`${props.classStyle}  ${styles['color-setting']}`}>
      {props.data.map((v, i) => {
        console.log(v.name)
        const bgStyle = {
          fontSize: fontSize(v.name.length),
          color: '#222222',
          backgroundColor: '#ababab',
          borderLeft: `solid 1rem ${v.color}`
          // boxShadow: `0 0 0 3px ${v.color}`,
          // background: `linear-gradient(135deg, #8a8686, #8a8686 20%, ${v.color} 50%, #8a8686 80%, #8a8686)`
        }
        return (
          <li
            key={v.sort_val}
            data-id={v.sort_val}
            style={bgStyle}
          >
            <input
              id={`${props.id}-${v.sort_val}`}
              type="checkbox"
              className={styles['check_box']}
              checked={v.is_active}
              onChange={() => {props.onStateChange(i)}}
            />
            <label
              htmlFor={`${props.id}-${v.sort_val}`}
              className={styles['label']}
            >
            </label>
            <span
              className={styles["subject-value"]}
              title={v.name}
            >
              {v.name}
            </span>
            <input
              type="color"
              className={styles["color"]}
              value={v.color}
              onChange={(e) => {props.onChangeColor(i, e.target.value)}}
            />
            { props.isShowDeleteBtn?
              <button className={styles["delete-btn"]}>
                x
              </button> : ''
            }
          </li>
        )
      })}
    </ul>
  )
}

SubjectListArea.defaultProps = {
  classStyle: '',
  isShowDeleteBtn: false
};

export default SubjectListArea;
