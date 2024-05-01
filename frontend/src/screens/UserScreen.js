import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import Loader from "../components/Loader"
import Message from "../components/Message"

const UserScreen = () => {
  const [ticket, setTicket] = useState({
    userEmail: "",
    userName: "",
    category: "Tech",
    description: "",
    urgency: "Normal",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post("/api/tickets", ticket)
      setLoading(false)
      setSuccess(true)
      setError("")
      setTimeout(() => setSuccess(false), 5000) // Hide success message after 5 seconds
    } catch (err) {
      setLoading(false)
      console.log(err)
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
      setTimeout(() => setError(""), 5000) // Hide error message after 5 seconds
    }
  }

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value })
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {success && (
        <Message variant='success'>Ticket submitted successfully!</Message>
      )}
      <h2 center>Please submit your ticket below</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='userName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            name='userName'
            value={ticket.userName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='userEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            name='userEmail'
            value={ticket.userEmail}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as='select'
            name='category'
            value={ticket.category}
            onChange={handleChange}
          >
            <option>Tech</option>
            <option>Finance</option>
            <option>HR</option>
            <option>Marketing</option>
            <option>Art</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='urgency'>
          <Form.Label>Urgency</Form.Label>
          <Form.Control
            as='select'
            name='urgency'
            value={ticket.urgency}
            onChange={handleChange}
          >
            <option>Normal</option>
            <option>Urgent</option>
            <option>Very Urgent</option>
            <option>Severe</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            name='description'
            value={ticket.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit Ticket
        </Button>
      </Form>
    </>
  )
}

export default UserScreen
