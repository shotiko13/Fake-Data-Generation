import React from 'react';


interface NavbarProps {
    githubLink: string;
  }

const Navbar: React.FC<NavbarProps> = ({ githubLink }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand" style={{marginLeft: "1rem"}}>Fake User Data Generation</span>
      <a className="btn btn-outline-primary ml-auto" href={githubLink} type="button">GitHub</a>
    </nav>
  );
}

export default Navbar;
