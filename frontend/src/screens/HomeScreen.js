import React from "react"
import { Button, Row, Col } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const HomeScreen = () => {
  return (
    <>
      <h1>Welcome to the Ticket System</h1>
      <Row className='mt-5'>
        <Col className='text-center'>
          <LinkContainer to='/user'>
            <Button variant='primary' size='lg'>
              I'm a User
            </Button>
          </LinkContainer>
        </Col>
        <Col className='text-center'>
          <LinkContainer to='/admin'>
            <Button variant='success' size='lg'>
              I'm an Admin
            </Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  )
}

export default HomeScreen
