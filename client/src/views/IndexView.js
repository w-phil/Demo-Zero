import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IndexView = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/exam')
            .then((response) => {
                console.log(response);

                response.data.sort(function (a, b) {
                    return a.type.localeCompare(b.type);
                });

                setPets(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <div id="header">
            <h1>Pet Shelter</h1>
            <Link to="/pets/new">add a pet to the shelter</Link>
            </div>
            <p>These pets are looking for a good home</p>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {pets.map((pet, index) => {
                    return (
                        <tr key={index}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td><Link to={"/pets/" + pet._id}>details</Link> <Link to={"/pets/" + pet._id + "/edit"}>edit</Link></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default IndexView;