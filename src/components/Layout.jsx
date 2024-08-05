import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="hero is-fullheight">
      <div className="hero-body" style={{
        background: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjI1NTMzMjd8&ixlib=rb-4.0.3&q=80&w=1080') center center",
        backgroundSize: "cover"
      }}>
        <div className="container">
          <div className='has-text-centered'>
            <figure className="image is-64x64 is-inline-block">
              <img src="src/assets/Logo.png" alt="Sonirepro logo" />
            </figure>
            <h1 className="title is-1 has-text-white">Sonirepro</h1>
            <p> </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;