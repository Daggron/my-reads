import React, { Component } from 'react';

class ErrorBoundaries extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             hasError: false
        }
    }

    static getDerivedStateFromError(){
        return {
            hasError: true,
        }
    }
    
    render(){
        if(this.state.hasError){
            return(
                <div className="error">
                    <p>
                        Oops Something Went Wrong While Loading The Page.
                        <br />
                        Please Try After Some Time
                    </p>
                </div>
            )
        }

        return this.props.children
    }
    
}

export default ErrorBoundaries;