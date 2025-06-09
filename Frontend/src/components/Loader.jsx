import React from 'react';

export default function Loader() {
  return (
    <div
      className="loader"
      style={{
        position: 'fixed', // covers the entire screen
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent dark overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // high enough to be on top of everything
      }}
    >
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
