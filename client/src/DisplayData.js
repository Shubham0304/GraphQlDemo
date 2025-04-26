import {React} from "react";
import {useQuery, gql} from "@apollo/client";


const QUERY_ALL_USERS = gql`
query GetAllUsers {
    users {
        id
        name
        age
        username

    }
    }`

function DisplayData() {
    const {data, loading} = useQuery(QUERY_ALL_USERS);

    if (loading) {
        return <h1> Data is loading.... </h1>;
        
    }
    if (data) {
        console.log(data);
    }

    return <div></div>;
}

export default DisplayData;