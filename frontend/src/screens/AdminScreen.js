import React, { useState, useEffect } from "react"
import {
  Table,
  Badge,
  Dropdown,
  Row,
  Col,
  Form,
  FormControl,
} from "react-bootstrap"
import axios from "axios"
import Loader from "../components/Loader"
import Message from "../components/Message"

const AdminScreen = () => {
  const [tickets, setTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [categoryFilter, setCategoryFilter] = useState("")
  const [urgencyFilter, setUrgencyFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get("http://localhost:5000/api/tickets")
        setTickets(data)
        setFilteredTickets(data)
        setLoading(false)
      } catch (err) {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
        setLoading(false)
      }
    }
    fetchTickets()
  }, [])

  useEffect(() => {
    setFilteredTickets(
      tickets.filter(
        (ticket) =>
          (categoryFilter ? ticket.category === categoryFilter : true) &&
          (urgencyFilter ? ticket.urgency === urgencyFilter : true) &&
          (searchQuery
            ? ticket.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              ticket.userName.toLowerCase().includes(searchQuery.toLowerCase())
            : true)
      )
    )
  }, [tickets, categoryFilter, urgencyFilter, searchQuery])

  const handleCategorySelect = (eventKey) => {
    setCategoryFilter(eventKey === "All" ? "" : eventKey)
  }

  const handleUrgencySelect = (eventKey) => {
    setUrgencyFilter(eventKey === "All" ? "" : eventKey)
  }

  const getBadgeVariant = (urgency) => {
    switch (urgency) {
      case "Severe":
        return "danger"
      case "Urgent":
        return "warning"
      case "Normal":
        return "secondary"
      case "Very Urgent":
        return "primary"
      default:
        return "light"
    }
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Row className='mb-3'>
        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle
              variant='warning'
              id='dropdown-category'
              style={{ borderRadius: "30px" }}
            >
              {categoryFilter || "Filter by Category"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {["All", "Tech", "Finance", "HR", "Marketing", "Art"].map(
                (category) => (
                  <Dropdown.Item
                    key={category}
                    eventKey={category}
                    onSelect={handleCategorySelect}
                  >
                    {category}
                  </Dropdown.Item>
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle
              variant='danger'
              id='dropdown-urgency'
              style={{ borderRadius: "30px" }}
            >
              {urgencyFilter || "Filter by Urgency"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {["All", "Normal", "Urgent", "Very Urgent", "Severe"].map(
                (urgency) => (
                  <Dropdown.Item
                    key={urgency}
                    eventKey={urgency}
                    onSelect={handleUrgencySelect}
                  >
                    {urgency}
                  </Dropdown.Item>
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Category</th>
            <th>Description</th>
            <th>Urgency</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket._id}</td>
              <td>{ticket.userName}</td>
              <td>{ticket.userEmail}</td>
              <td>
                <Badge pill variant={getBadgeVariant(ticket.category)}>
                  {ticket.category}
                </Badge>
              </td>
              <td>{ticket.description}</td>
              <td>
                <Badge pill variant={getBadgeVariant(ticket.urgency)}>
                  {ticket.urgency}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default AdminScreen
