import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Tech", "Finance", "Art", "HR", "Marketing"],
    },
    description: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      required: true,
      enum: ["Severe", "Normal", "Urgent", "Very Urgent"],
    },
  },
  {
    timestamps: true,
  }
)

const Ticket = mongoose.model("Ticket", ticketSchema)
export default Ticket
