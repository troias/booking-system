import { useState } from 'react';
import { bookables } from '../../static.json';
import { FaArrowRight } from "react-icons/fa";

const BookablesList = () => {

    const [bookableIndex, setBookableIndex] = useState(0);
    const [group, setGroup] = useState("Kit")

    const bookablesInGroup = bookables.filter(x => x.group === group)

    const groups = [...new Set(bookables.map(x => x.group))]

    const nextBookable = () => {
        setBookableIndex(x => (x + 1) % bookablesInGroup.length)
        console.log(bookableIndex)
    }



    return (
        <div>
            <select name="" id=""
                value={group}
                onChange={((x) => setGroup(x.target.value)  )}
                >
                    {groups.map(x => <option value={x} key={x}> {x}</option>) }

            </select>


            <ul className="bookables">
                {bookablesInGroup.map((x, i) => (
                    <li
                        key={x.id}
                        className={i === bookableIndex ? "selected" : null}
                    >
                        <button
                            onClick={() => setBookableIndex(i)}
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
    )
}

export default BookablesList