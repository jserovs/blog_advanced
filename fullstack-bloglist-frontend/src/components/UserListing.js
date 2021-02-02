import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom"

const UserListing = ({ users }) => {

    const padding = {
        paddingRight: 5
    }

    return (
        <div>
            <h2>Users</h2>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td><Link to={'/users/'+element.id} style={padding}>{element.name}</Link></td>
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
