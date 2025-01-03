import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footer}>
      <p style={styles.footerText}>© 2025 My Website. All rights reserved.</p>
    </div>
  );
};

// Styles for Footer (full width)
const styles = {
  footer: {
    backgroundColor: '#333',
    color: 'white',
    padding: '3px',
    textAlign: 'center',
    position: 'absolute',
    top: '100%',
    width: '100%',
  },
  footerText: {
    fontSize: '14px',
  },
};

export default Footer;
