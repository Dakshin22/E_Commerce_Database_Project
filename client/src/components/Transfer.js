import { Fragment, useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';

const Transfer = props =>
{
    const location = useLocation();

    useEffect(() => 
    {
        console.log(location)
        // console.log(location.pathname)
        
    }, [location])

    return <h2>{location.state.username}</h2>
}
export default Transfer;