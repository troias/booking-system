import { useReducer, useRef, useState } from "react"
import reducer from './weekReducer'
import { getWeek } from '../../utils/date-wrangler'
import { FaCalendarCheck } from 'react-icons/fa'

const WeekPicker = ({ date }) => {

    const [week, dispatch] = useReducer(reducer, date, getWeek)
    const [dateText, setDateText] = useState("")
    const textboxRef = useRef()

    const goToDate = () => {
        dispatch({
            type: "SET_DATE",
            payload: dateText
        })
    }

    return (
        <div>
            {week.date.toDateString()}
            <p className="datePicker">
                <button
                    onClick={() => dispatch({ type: "PREV_WEEK" })}>
                    Previous
            </button>
                <button
                    onClick={() => dispatch({ type: "TODAY" })}>
                    Today
            </button>
                <span>
                    <input
                        type="text"
                        value={dateText}
                        onChange={(e) => setDateText(e.target.value)}
                        placeholder="e.g 2020-09-02">

                    </input>
                </span>
                <button onClick={goToDate} className="go btn">
                    <FaCalendarCheck />
                    <span>Go</span>
                </button>
                <button
                    onClick={() => dispatch({ type: "NEXT_WEEK" })}>
                    Next
            </button>
            </p>
            {week.start.toDateString()} - {week.end.toDateString()}
        </div>
    )
}

export default WeekPicker