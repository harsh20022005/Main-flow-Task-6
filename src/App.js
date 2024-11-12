import React from 'react';
import ImageGallery from './ImageGallery';
import './App.css'; // Import global styles

// Optional: Layout component for better structure and consistency
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="app-header">
        <h1>My Image Gallery</h1>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <p>© 2024 My Image Gallery. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Layout>
      <ImageGallery />
    </Layout>
  );
};

export default App;
