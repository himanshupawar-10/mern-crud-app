import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList';
import CreateNote from './components/CreateNote';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => {
        setNotes(response.data);
        console.log(response.data)
      })
      .catch(error =>
        console.error('Error fetching notes:', error));
  }, []);

  const handleCreateNote = (newNote) => {
    setNotes([...notes, newNote]);
    axios.post('http://localhost:5000/items/add', newNote)
      .then(response =>
        console.log('Note created:', response.data))
      .catch(error =>
        console.error('Error creating note:', error));
  };

  const handleUpdateNote = (noteId) => {
    console.log(`Update note with ID: ${noteId}`);
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note._id !== noteId));
    axios.delete(`http://localhost:5000/items/${noteId}`)
      .then(response =>
        console.log('Note deleted:', response.data))
      .catch(error =>
        console.error('Error deleting note:', error));
  };

  return (
    <div className="container">
      <CreateNote onCreate={handleCreateNote} />
      <NoteList notes={notes}
        onUpdate={handleUpdateNote}
        onDelete={handleDeleteNote} />
    </div>
  );
};

export default App;










// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import ItemList from './components/ItemList';
// import CreateItem from './components/CreateItem';


// class App extends React.Component{
//   render(){
//     return(
//     <div>
//     <Router>
//       <div>
//         <h2>MERN CRUD App</h2>
//         <Route path="/" exact component={ItemList} />
//         <Route path="/create" component={CreateItem} />
//       </div>
//     </Router>
//     </div>
//   );
//   }
// }

// // const App = () => {
// //   return (
// //     <Router>
// //       <div>
// //         <h2>MERN CRUD App</h2>
// //         <Route path="/" exact component={ItemList} />
// //         <Route path="/create" component={CreateItem} />
// //       </div>
// //     </Router>
// //   );
// // };

// export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
