import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <div className="loading">
                <img className="img-responsive" src="img/loading.gif" alt="loading..." />
            </div>
        );
    }
}

export default Loading;