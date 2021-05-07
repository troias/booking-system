import { Fragment, useReducer } from 'react';
import { bookables } from '../../static.json';
import { FaArrowRight } from "react-icons/fa";
import  reducer  from './reducer'

const intialState = {
    group: "choose", 
    bookableIndex: 0,
    hasDetails: false, 
    bookables
}

const BookablesList = () => {

    const [state, dispatch ] = useReducer( reducer, intialState)
    const {group, bookableIndex, hasDetails, bookables} = state
    const bookablesInGroup = bookables.filter(x => x.group === group)
    const groups = [...new Set(bookables.map(x => x.group))]
    const bookable = bookablesInGroup[bookableIndex];


    const changeGroup = (event) => {
      dispatch({
          type: "SET_GROUP",
          payload: event.target.value
      })
    }

    const changeBookable = (selectedIndex) => {
        dispatch({
            type: "SET_BOOKABLE",
            payload: selectedIndex
        })
    }
 
    const nextBookable = () => {
       dispatch({
           type: "NEXT_BOOKABLE"
       })
    }

    const toggleDetails = () => {
        dispatch({
            type: "TOGGLE_HAS_DETAILS"
        })
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