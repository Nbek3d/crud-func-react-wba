import React, { useState } from 'react';
import { sampleUsers } from '../utils/const';
import '../index.css';

const Crud = () => {
  const [users, setUsers] = useState([...sampleUsers]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newGmail, setNewGmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'searchTerm') {
      setSearchTerm(value);
    } else if (name === 'searchCriteria') {
      setSearchCriteria(value);
      setSearchTerm('');
    } else if (name === 'sortCriteria') {
      setSortCriteria(value);
      setSortOrder('asc');
    } else {
      switch (name) {
        case 'newName':
          setNewName(value);
          break;
        case 'newAge':
          setNewAge(value);
          break;
        case 'newStatus':
          setNewStatus(value);
          break;
        case 'newGmail':
          setNewGmail(value);
          break;
        default:
          break;
      }
    }
  };

  const addUser = () => {
    const newUser = {
      name: newName,
      age: newAge,
      status: newStatus,
      gmail: newGmail,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setNewName('');
    setNewAge('');
    setNewStatus('');
    setNewGmail('');
  };

  const editUser = (index) => {
    const userToEdit = users[index];
    setEditingIndex(index);
    setNewName(userToEdit.name);
    setNewAge(userToEdit.age);
    setNewStatus(userToEdit.status);
    setNewGmail(userToEdit.gmail);
  };

  const saveEdit = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index] = {
      name: newName,
      age: newAge,
      status: newStatus,
      gmail: newGmail,
    };

    setUsers(updatedUsers);
    setEditingIndex(-1);
    setNewName('');
    setNewAge('');
    setNewStatus('');
    setNewGmail('');
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers);
  };

  const sortUsers = () => {
    const sortedUsers = [...users].sort((userA, userB) => {
      const aValue = userA[sortCriteria];
      const bValue = userB[sortCriteria];

      if (sortOrder === 'asc') {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        } else {
          return aValue > bValue ? 1 : -1;
        }
      } else {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return bValue.localeCompare(aValue);
        } else {
          return bValue > aValue ? 1 : -1;
        }
      }
    });

    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter((user) =>
    user[searchCriteria]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-container df">
        <select value={searchCriteria} name="searchCriteria" onChange={handleInputChange}>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="gmail">Gmail</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchCriteria}`}
          value={searchTerm}
          name="searchTerm"
          onChange={handleInputChange}
        />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <select value={sortCriteria} name="sortCriteria" onChange={handleInputChange}>
        <option value="name">Name</option>
        <option value="age">Age</option>
        <option value="status">Status</option>
        <option value="gmail">Gmail</option>
      </select>
      <button onClick={sortUsers}>Sort</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Status</th>
            <th>Gmail</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={newName}
                    name="newName"
                    onChange={handleInputChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={newAge}
                    name="newAge"
                    onChange={handleInputChange}
                  />
                ) : (
                  user.age
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={newStatus}
                    name="newStatus"
                    onChange={handleInputChange}
                  />
                ) : (
                  user.status
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={newGmail}
                    name="newGmail"
                    onChange={handleInputChange}
                  />
                ) : (
                  user.gmail
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <button onClick={() => saveEdit(index)}>Save</button>
                ) : (
                  <button onClick={() => editUser(index)}>Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => deleteUser(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          name="newName"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Age"
          value={newAge}
          name="newAge"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Status"
          value={newStatus}
          name="newStatus"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Gmail"
          value={newGmail}
          name="newGmail"
          onChange={handleInputChange}
        />
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
};

export default Crud;
