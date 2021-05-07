import React from 'react'
import WeekPicker from "./WeekPicker"

 const BookingsPage = () => {
    return (
        <div>
          <p> Bookings</p>
          <WeekPicker date={new Date()}/>
        </div>
    )
}

export default BookingsPage
