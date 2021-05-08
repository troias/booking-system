import React, { useState, useEffect} from 'react'
import { FaSpinner } from "react-icons/fa"

 const UserPicker = () => {
    const [ users, setUsers ] = useState(null)

    useEffect(()=> {

        const getUsers = async () => {
            const resp = await  fetch("http://localhost:3001/users")
            const data = await (resp.json())
            setUsers(data)
        }
        getUsers()
    }, [])

    if (users === null) {
        return <FaSpinner/>
    }

    return (
        <select>
            { users.map(u => <option key={u.id}>{u.name}</option>)
             }
            
        </select>
    )
}

export default UserPicker