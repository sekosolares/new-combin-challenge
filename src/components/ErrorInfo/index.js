import React from 'react';
import './ErrorInfo.css';

function ErrorInfo({message}) {
      return (
            <p className="Error-Message">{message}</p>
      );
}

export { ErrorInfo };