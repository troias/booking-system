import React, {useReducer, Fragment} from 'react'

import BookablesList from './BookablesList'
import BookablesDetail from './BookableDetails' 
import  reducer  from './reducer'

const intialState = {
    group: "Room", 
    bookableIndex: 0,
    hasDetails: false, 
    bookables: [], 
    isLoading: true, 
    error: false, 
    isPresenting: false
}




 const BookablesView = () => {

    const [state, dispatch ] = useReducer( reducer, intialState)

    const bookablesInGroup = state.bookables.filter(x => x.group === state.group)
    const bookable = bookablesInGroup[state.bookableIndex];
    
    return (
        <Fragment>
            <BookablesList state={state} dispatch={dispatch}/>
            <BookablesDetail bookable={bookable}/>
        </Fragment>
    )
}

export default BookablesView
