import {React, useState} from "react";
import {useQuery, useLazyQuery, gql} from "@apollo/client";


const QUERY_ALL_USERS = gql`
query GetAllUsers {
    users {
        id
        name
        age
        username
        nationality

    }
    }`


const QUERY_ALL_MOVIES = gql`
query GetAllMovies {
    movies {
        name
    }

}`

const GET_MOVIE_BY_NAME = gql`
query Movie($name: String!) {
    movie(name: $name) {
        name
        yearOfPublication
    }
}`

function DisplayData() {
    const [movieSearched, setMovieSearched] = useState("");

// Create User States:
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");


    const {data, loading, error} = useQuery(QUERY_ALL_USERS);
    const {data: movieData, loading:movieLoading, error: movieError} = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, {data: movieSearchedData, error: movieSearchedError}] = useLazyQuery(GET_MOVIE_BY_NAME)


    if (loading) {
        return <h1> Data is loading.... </h1>;
        
    }
    // if (data) {
    //     console.log(data);
    // }
    if (error) {
        console.log(error);
        return <h1>Error.....</h1>
    }

    if (movieSearchedError) {
        console.log(movieSearchedError);
    }


    return <div>
        <div>
            <input type="text" placeholder="Name" onChange={(event) => {
                setName(event.target.value);
            }}></input>
            <input type="text" placeholder="Username" onChange={(event) => {
                setUsername(event.target.value);
            }}></input>
            <input type="number" placeholder="Age" onChange={(event) => {
                setAge(event.target.value);
            }}></input>
            <input type="text" placeholder="Nationality" onChange={(event) => {
                setNationality(event.target.value.toUpperCase());
            }}></input>
            <button>Create User</button>
        </div>
         {data && data.users.map((user) => {
          return (
          <><div> <h1>Name : {user.name} </h1> </div><div> <h1>Username : {user.username} </h1> </div><div> <h1>Age : {user.age} </h1> </div>
         <div> <h1>Nationality : {user.nationality} </h1> </div>
         </>
          )

    })}
        {movieData && movieData.movies.map((movie) => {
            return <><div> <h1>Movie Name: {movie.name}</h1></div></>  
        }        
        )}

        <div>
            <input type="text" placeholder="Interstellar...." onChange= {(event) => {setMovieSearched(event.target.value)}}></input>
            <button onClick = {() => 
                {fetchMovie({variables: {
                    name: movieSearched
                }
                })}}>
                    Fetch Data</button>
            <div>
                {movieSearchedData &&
                 <><div> <h1>Movie Name: {movieSearchedData.movie.name}</h1></div>
                <div> <h1> Year Of Publication: {movieSearchedData.movie.yearOfPublication}</h1></div>
                </>}
                {movieSearchedError && <h1>There was an error fetching data </h1>}

            </div>
        </div>
    
</div>;
}

export default DisplayData;