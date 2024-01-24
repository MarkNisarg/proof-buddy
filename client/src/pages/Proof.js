import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

const Proof = () => {

  return (
    <MainLayout>
      <Container className='proof-container'>
        <h2>Saved Proofs</h2>
        <Link to='/createproof'>
          <Button>Add a new proof</Button>
        </Link>
      </Container>
    </MainLayout>
  );
};

export default Proof;