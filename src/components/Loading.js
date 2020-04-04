import React from 'react';
import loading from '../assets/loading.gif'

const Loading = () =>{

    return(
        <div className="flex-center">
            <img src={loading} alt="loading data" style={{height:300}} />
            <h1>
                Loading...
            </h1>
        </div>
    )
}

export default Loading;