import React from "react";
import AuthStatus from "./AuthStatus.tsx";
import { Link, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './components.css';

export default function Layout() {
    return (
        <>

            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossOrigin="anonymous"
            />
            <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossOrigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossOrigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="anonymous"></script>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home"> Agentes Electrofísicos y más</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link}  to="/protected/agentes">Agentes</Nav.Link>
                        <NavDropdown title="Mis cosas" id="basic-nav-dropdown">
                               {/*  <NavDropdown.Item as={Link} to="/protected/cervezas">Cervezas</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/protected/tasks">Tasks  </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/protected/users">Users</NavDropdown.Item>
                                <NavDropdown.Divider /> */}
                                <NavDropdown.Item as={Link} to="/protected/agentes">Agentes</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Brand href="#home"> Estos Agentes son muy Eléctricos</Navbar.Brand>
                        
                   
                </Container>
            </Navbar>


            <div className="container-fluid text-center">
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                        <Navbar.Brand href="#home"> Agentes Electrofísicos y más</Navbar.Brand>

                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav>
                        <AuthStatus />
                    </div>

                    <div className="col-sm-8 text-left">
                        <Outlet />
                    </div>
                    <div className="col-sm-2 sidenav">
                    <div className="well well-lg">Aquí sabemos de:</div>
                      {/*   <div className="well well-sm">
                            <p>Cervezas</p>
                        </div> */}
                        <div className="well well-sm">
                            <p>Agentes ElectroFísicos</p>
                        </div>                        
                    {/*     <div className="well well-sm">
                            <p>Tareas</p>
                        </div>                        
                        <div className="well well-sm">
                            <p>Usuarios</p>
                        </div> */}
  
                    </div>
                </div>
            </div>

        {/*     <footer className="container-fluid text-center">
                <p>App realizada por JESÚS RAMIRO </p>
            </footer> */}


        </>

    );
}
