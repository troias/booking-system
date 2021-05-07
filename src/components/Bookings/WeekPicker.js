import { useReducer } from "react"
import reducer from './weekReducer'
import { getWeek } from '../../utils/date-wrangler'

const WeekPicker = ({ date }) => {
    const [week, dispatch] = useReducer(reducer, date, getWeek)
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