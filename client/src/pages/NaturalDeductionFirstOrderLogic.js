import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const NaturalDeductionFirstOrderLogic = () => {

  return (
    <MainLayout>
      <Container className='natural-deduction-first-order-container'>
        <Col className='text-center'>
          <h2>Natural Deduction: First Order Logic</h2>
        </Col>

        <Col>
          <Link to='/'>
            <Button>Back</Button>
          </Link>
        </Col>

      </Container>
    </MainLayout>
  );
};

export default NaturalDeductionFirstOrderLogic;
