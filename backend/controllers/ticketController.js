import asyncHandler from "express-async-handler"
import Ticket from "../models/ticketModel.js"

// @Desc - Fetch all tickets
// @Route - GET /api/tickets
// @Access - PUBLIC
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({})
  res.json(tickets)
})

// @Desc - Fetch single ticket by ID
// @Route - GET /api/tickets/:id
// @Access - PUBLIC
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
  if (ticket) {
    res.json(ticket)
  } else {
    res.status(404)
    throw new Error("Ticket not found")
  }
})

// @Desc - Create a new ticket
// @Route - POST /api/tickets
// @Access - PUBLIC
const postTicket = asyncHandler(async (req, res) => {
  const { userEmail, userName, category, description, urgency } = req.body
  const ticket = new Ticket({
    userEmail,
    userName,
    category,
    description,
    urgency,
  })
  const createdTicket = await ticket.save()
  res.status(201).json(createdTicket)
})

export { getTickets, postTicket, getTicketById }
