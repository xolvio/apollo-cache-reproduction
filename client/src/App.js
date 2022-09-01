import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import {useQuery, gql} from '@apollo/client';

import './App.css';

const GET_BOOKS = gql`
    query GetBooks {
        books {
            id
            title
            author
        }
    }
`;

function DisplayBooks() {
    console.log('PINGWING: 24 in DisplayBooks');
    const {loading, error, data} = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const g = JSON.stringify(data.books).replace(/[\[\],"]/g, ''); //stringify and remove all "stringification" extra data
    console.log('PINGWING: 31 approximate data size in bytes', g.length);

    // const ourData = data.books.map(book => ({...book}))
    const ourData = data.books

    return ourData.slice(0, 10).map(({id, title, author}) => (
        <div key={id}>
            <h3>{title}</h3>
            <h4>{author}</h4>
            <br/>
        </div>
    ));
}

export default function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/Books">Books</Link>
                    </li>
                </ul>

                <hr/>

                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                <Routes>
                    <Route exact path="/" element={<Home/>}>
                    </Route>
                    <Route path="/about" element={<About/>}>
                    </Route>
                    <Route path="/Books" element={<Books/>}>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

// You can think of these components as "pages"
// in your app.

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Books() {
    return (
        <div>
            <h2>Books</h2>
            <DisplayBooks/>
        </div>
    );
}
