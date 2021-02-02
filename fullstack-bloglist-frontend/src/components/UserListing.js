import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { Table } from 'react-bootstrap'

const UserListing = () => {

    const [users, setUsers] = useState([])


    useEffect(() => {
        const usersFromApi = userService.getAll().then((res) => {
            console.log(JSON.stringify(res))
            setUsers(res)
        }
        )

    }, [])


    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Blogs created</th>
                    </tr>
                    </thead>
                <tbody>
                    {users.map((element, index) => {
                        console.log(JSON.stringify(element.blogs.length))
                        return (
                        <tr key={index}>
                            <td> {element.name} </td>
                            <td> {element.username} </td>
                            <td> {element.blogs.length} </td>
                        </tr>)
                    })}

                </tbody>
            </Table>
        </div>
    )
}

export default UserListing
