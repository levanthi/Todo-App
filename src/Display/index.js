import clsx from 'clsx'
import {forwardRef,useEffect, useRef,useImperativeHandle } from 'react'
import styles from'./main.module.scss'
import {ReactComponent as Plus} from '../static/svg/plus-square-solid.svg'
import {ReactComponent as Check} from '../static/svg/check-solid.svg'
import {ReactComponent as Trash} from '../static/svg/trash-alt-regular.svg'

function Display(props,ref)
{
    const inputRef = useRef()
    useImperativeHandle(ref,()=>({
        focus()
        {
            inputRef.current.focus()
        }
    }))
    return(
        <>
            <div className={clsx(styles.inputWrap)}>
                <div className={clsx(styles.inputParent)}>
                    <span onClick={props.handleAdd}><Plus/></span>
                    <input 
                        placeholder="Enter works..."
                        ref={inputRef}
                        value={props.input} 
                        onChange={(e)=>props.setInput(e.target.value)} 
                        className={clsx(styles.input)}
                        onKeyDown={(e)=>{if(e.key==='Enter'){props.handleAdd()}}}
                    />
                </div>
                <div className={clsx(styles.selectWrap)}>
                    <select onChange={(e)=>props.setStatus(e.target.value)} className={clsx(styles.arrow)}>
                        <option value='all'>
                            All
                        </option>
                        <option value='completed'>
                            Completed
                        </option>
                        <option value='uncompleted'>
                            Uncomplted
                        </option>
                    </select>
                </div>
            </div>
            <ul className={clsx(styles.list)}>
                {props.filter.map((item)=>{
                    return (
                        <li key={item.id} className={item.completed?styles.completed:''}>
                            {item.title}
                            <span onClick={()=>props.handleToggle(item.id)}><Check/></span>
                            <span onClick={()=>props.handleDelete(item.id)}><Trash/></span>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default forwardRef(Display)
