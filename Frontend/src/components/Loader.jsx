export default function Loader() {
  return (
    <div
      className="loader"
      style={{
        position: 'fixed', 
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        zIndex: 9999, 
      }}
    >
      <div className="spinner-border text-light" role="status">
      </div>
      <div style={{color:'white'}}>
      Loading...
      </div>
    </div>
  );
}
