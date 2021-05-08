import { Fragment, useReducer, useEffect, useRef } from 'react';
import { FaArrowRight,FaSpinner } from "react-icons/fa";
import  reducer  from './reducer'
import getData from '../../utils/api'

const intialState = {
    group: "Room", 
    bookableIndex: 0,
    hasDetails: false, 
    bookables: [], 
    isLoading: true, 
    error: false, 
    isPresenting: false
}

const BookablesList = () => {

    const [state, dispatch ] = useReducer( reducer, intialState)
    const {group, bookableIndex, bookables} = state
    const {hasDetails, isLoading, error, isPresenting} = state
    const bookablesInGroup = bookables.filter(x => x.group === group)
    const groups = [...new Set(bookables.map(x => x.group))]
    const bookable = bookablesInGroup[bookableIndex];

    let timerRef = useRef(null)

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

    }, [])

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
    }
 
    const nextBookable = () => {
       dispatch({
           type: "NEXT_BOOKABLE",
           payload: false
       })
    }

    const toggleDetails = () => {
        dispatch({
            type: "TOGGLE_HAS_DETAILS"
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
        <Fragment>
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
                        autoFocus
                    >
                        <FaArrowRight />
                        <span>Next</span>
                    </button>
                </p>
            </div>
            {bookable && (
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>
                                {bookable.title}
                                
                            </h2>
                            <span className="controls">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={hasDetails}
                                        onChange={toggleDetails}
                                    />
                                Show Details
                                </label>
                            </span>
                        </div>
                        <p>{bookable.notes}</p>
                        {hasDetails && (
                            <div className="item-details">
                                <h3>Availability</h3>
                                <div className="bookable-availability">
                                    <ul>
                                        { bookable.days
                                            .sort()
                                            .map(d => <li key={d}>{d}</li>)
                                        }
                                    </ul>
                                    <ul>
                                        { bookable.sessions
                                            .map(s => <li key={s}>{s}</li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default BookablesList