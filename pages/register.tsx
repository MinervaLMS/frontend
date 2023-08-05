import React from 'react';
import Head from 'next/head';
import { Montserrat, Lato } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';

const montserrat = Montserrat({ subsets: ['latin'] });

function register() {
  return (
    <>
      <Head>
        <title>Minerva LMS</title>
        <meta name='description' content='Plataforma para el apredizaje online' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main>
        <section id='user-register'>
          <Container className='register-container'>
            <h1>Regístrate</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod tempor incididunt ut labore</p>
            <Form>
              <Row>
                <Form.Group as={Col} className='mb-3' controlId='userFisrtName'>
                  <Form.Control required type='text' placeholder='Nombres' />
                </Form.Group>
                <Form.Group as={Col} className='mb-3' controlId='userLastName'>
                  <Form.Control required type='text' placeholder='Apellidos' />
                </Form.Group>
              </Row>
              <Form.Group className='mb-3' controlId='userEmail'>
                <Form.Control required type='email' placeholder='Correo' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='userPaswrod'>
                <Form.Control required type='password' placeholder='Contraseña' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='termsAndConditions'>
                <Form.Check
                  type='checkbox'
                  label={
                    <span>
                      He leído y acepto los <a href='#'>Términos de uso</a> y el <a href='#'>Aviso de privacidad de Minerva</a>.
                    </span>
                  }
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Resgistrarse
              </Button>
            </Form>
          </Container>
          <Container className='help-container'>
            <span>
              Si tienes alguna dificultad comunicate con nuestro <a href='#'>Centro de atención</a>.
            </span>
          </Container>
        </section>
      </main>
    </>
  );
}

export default register;
