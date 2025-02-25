Buiding something big which even we don't know 

Socket.io setup
2️⃣ Create server.js

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Socket.io Logic
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

Create models/Message.js
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    user: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);

Create routes/messages.js
const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// Get All Messages
router.get("/", async (req, res) => {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
});

// Save Message
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
});

module.exports = router;

Update server.js to Use API Route
const messageRoutes = require("./routes/messages");
app.use("/api/messages", messageRoutes);

