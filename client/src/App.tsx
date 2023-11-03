import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Route, Routes } from 'react-router-dom';

import EventBus from './common/EventBus';
import CaseReview from './components/caseReview.component';
import Login from './components/login.component';
import Register from './components/register.component';
import * as AuthService from './services/auth.service';
import { IUser } from './types/user.type';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on('logout', logout);

    return () => {
      EventBus.remove('logout', logout);
    };
  }, []);

  const logout = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link to={'/'} className="navbar-brand">
            KinetixPro
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {currentUser ? (
              <>
                <Nav className="me-auto">
                  <Link to={'/case-review'} className="nav-link">
                    Case Review
                  </Link>
                </Nav>
                <Nav>
                  <NavDropdown title={currentUser.name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/login" onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              <>
                <Nav className="me-auto"></Nav>
                <Nav>
                  <Link to={'/login'} className="nav-link">
                    Login
                  </Link>
                  <Link to={'/register'} className="nav-link">
                    Register
                  </Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Routes>
          <Route path="/case-review" element={<CaseReview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
