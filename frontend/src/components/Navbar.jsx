import React from 'react';

const Navbar = () => {
  return (
    <div style={styles.navbar}>
      <h1 style={styles.headline}>Communication</h1>
    </div>
  );
};

// Styles for Navbar
const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headline: {
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold',
  },
};

export default Navbar;
