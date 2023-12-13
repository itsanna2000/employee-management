import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');

  const [employeeProfile, setEmployeeProfile] = useState([]);

  const [edit, setEdit] = useState(false);

  const [newRole, setNewRole] = useState('');
  const [newSalary, setNewSalary] = useState('');

  // SEND INFO TO DB

  const addProfile = () => {
    Axios.post('http://localhost:3003/create', {
      department: department,
      role: role,
      lastName: lastName,
      firstName: firstName,
      experience: experience,
      salary: salary
    }).then(() => {
      setEmployeeProfile([...employeeProfile, {
        department: department,
        role: role,
        lastName: lastName,
        firstName: firstName,
        experience: experience,
        salary: salary
      }
    ]);
    });
  };

  // DISPLAY INFO FROM DB

  const getProfiles = () => {
    return Axios.get('http://localhost:3003/profiles').then((response) => {
      setEmployeeProfile(response.data)
    })
  }

  // UPDATES INFO DISPLAYED W/ REFRESHING

  useEffect(() => {
    getProfiles();
  }, []);

  // UPDATE ROLE & SALARY

  const update = (id) => {
    Axios.put('http://localhost:3003/edit', {
      role: newRole,
      salary: newSalary,
      id: id
    });
  };

  // DELETE EMPLOYEE'S PROFILE

  const deleteProfile = (id) => {
    Axios.delete('http://localhost:3003/delete/' + id).then(() =>
      getProfiles())
  };

// CLEARS INPUT

  const onClear = () => {
    setDepartment('');
    setRole('');
    setLastName('');
    setFirstName('');
    setExperience('');
    setSalary('');
  };

  // CREATE PROFILE + CLEAR INPUT ON CLICK

  const createProfile = () => {
    addProfile();
    onClear();
  };

  return (
    <div className="App">
      <div className='input-container'>
        <h3>Create profile</h3>
        <label>Department: </label>
        <input type='text' onChange={(event) => {setDepartment(event.target.value)}} value={department}  />
      <label>Role: </label>
      <input type='text' onChange={(event) => {setRole(event.target.value)}} value={role} />
      <label>Last Name: </label>
      <input type='text' onChange={(event) => {setLastName(event.target.value)}} value={lastName} />
      <label>First Name: </label>
      <input type='text' onChange={(event) => {setFirstName(event.target.value)}} value={firstName} />
      <label>Experience &#40;years&#41;: </label>
      <input type='number' onChange={(event) => {setExperience(event.target.value)}} value={experience} />
      <label>Salary &#40;annual&#41;: </label>
      <input type='number' onChange={(event) => {setSalary(event.target.value)}} value={salary} />
      <button onClick={createProfile}>enter</button>
      </div>

      <div className='profiles-container'>
        <div className='wrapper'>
        <h2>Employees</h2>
        {employeeProfile.length > 0 &&
        <button onClick={() => (setEdit(!edit))}>edit</button>}
        </div>
        {employeeProfile.map((val, key) => {
          return (
            <div className='profile' key={val.id}>
              <div className='info'>
          <span id='one'>Department:</span> <span id='two'>{val.department}</span>
          <span id='one'>Role:</span> <span id='two'>{val.role}</span>
          <span id='one'>Last Name:</span> <span id='two'>{val.lastName}</span>
          <span id='one'>First Name:</span> <span id='two'>{val.firstName}</span>
          <span id='one'>Experience:</span> <span id='two'>{val.experience}</span>
          <span id='one'>Salary:</span> <span id='two'>{val.salary}</span>
          </div>
          <div className='options'>
            {edit === true &&
          <div className='edit'>
            <span id='one'>Role:</span>
            <input type='text' onChange={(event) => {setNewRole(event.target.value)}} value={newRole} />
            <span id='one'>Salary:</span>
            <input type='number' onChange={(event) => {setNewSalary(event.target.value)}} value={newSalary} />
            <button onClick={() => {update(val.id)}}>done</button>
          </div>}
          <button onClick={() => {deleteProfile(val.id)}}>delete</button>
          </div>
        </div>
          )
        })}
        
      </div>

    </div>
  );
}

export default App;
