import { Fragment, useReducer, useEffect, useRef } from 'react';
import { FaArrowRight,FaSpinner } from "react-icons/fa";

import getData from '../../utils/api'


const BookablesList = (props) => {

    const {state, dispatch} = props
    const {group, bookableIndex, bookables} = state
    const { isLoading, error, isPresenting} = state
    
    const bookablesInGroup = bookables.filter(x => x.group === group)
    const groups = [...new Set(bookables.map(x => x.group))]
 
    let timerRef = useRef(null)
    const nextButtonRef = useRef()

    useEffect(() => {
        if (isPresenting) {
            scheduleNext()
        } else {
            clearNextTimeOut()
        }
    })

    useEffect(() => {

        dispatch({
            type: "FETCH_BOOKABLES_REQUEST"
        })

        getData("http://localhost:3001/bookables")
        .then(resp => dispatch({ 
            type: "FETCH_BOOKABLES_SUCCESS", 
            payload: resp
        }))
        .catch(err => dispatch({ 
            type: "FETCH_BOOKABLES_ERROR", 
            payload: err
    }))

    }, [dispatch])

    const scheduleNext = () => {
        if (timerRef.current === null) {
            timerRef.current = setTimeout(() => {
                timerRef.current = null
                dispatch({
                    type: "NEXT_BOOKABLE", 
                    payload: true
                })
            }, 3000) 
        }
    }

  
    const changeGroup = (event) => {
      dispatch({
          type: "SET_GROUP",
          payload: event.target.value
      })

      if (isPresenting) {
          clearNextTimeOut()
          scheduleNext()
      }
    }

    const changeBookable = (selectedIndex) => {
        dispatch({
            type: "SET_BOOKABLE",
            payload: selectedIndex
        })
        nextButtonRef.current.focus()
    }
 
    const nextBookable = () => {
       dispatch({
           type: "NEXT_BOOKABLE",
           payload: false
       })
    }


    let clearNextTimeOut = () => {
        clearTimeout(timerRef.current)
        timerRef.current = null
    }


    if (error) {
        return <p> {error.message} </p>
    }

    if (isLoading) {
        return <p><FaSpinner className="icon-loading" />
       
        </p>
    }

    return (
      
            <div>
                <select name=" " id=" "
                    value={group}
                    onChange={changeGroup}
                >
                    {groups.map(x => <option value={x} key={x}> {x} </option>)}
                </select>

                <ul className="bookables">
                    {bookablesInGroup.map((x, i) => (
                        <li
                            key={x.id}
                            className={i === bookableIndex ? "selected" : null}
                        >
                            <button
                                onClick={() => changeBookable(i)}
                                className="btn"
                            >
                                {x.title}
                            </button>
                        </li>
                    ))}
                </ul>
                <p>
                    <button
                        className="btn"
                        onClick={nextBookable}
                        ref={nextButtonRef}
                        autoFocus
                    >
                        <FaArrowRight />
                        <span>Next</span>
                    </button>
                </p>
            </div>
  
      
    )
}

export default BookablesList