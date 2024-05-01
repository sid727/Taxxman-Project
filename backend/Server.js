import path from "path"
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import ConnectDB from "./DatabaseConfig/dbconfig.js"
import colors from "colors"
import {
  getTickets,
  postTicket,
  getTicketById,
} from "./controllers/ticketController.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import cors from "cors"

dotenv.config()
ConnectDB()

const app = express()

app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())
app.get("/api/tickets", getTickets)
app.post("/api/tickets", postTicket)
app.get("/api/tickets/:id", getTicketById)

const __dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  )
}

app.use(notFound)
app.use(errorHandler)

const PORT = 5000
app.listen(PORT, () => {
  console.log(
    `Server Running ${process.env.NODE_ENV} mode on PORT ${PORT}`.blue.inverse
  )
})
