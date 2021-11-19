import { Fragment, useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';

const Transfer = props =>
{
    const {state} = useLocation();

    useEffect(() => 
    {
        console.log(state)
        // console.log(location.pathname)
        
    }, [state])

    return <h2>{state}</h2>
}
export default Transfer;