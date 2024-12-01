require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const UserRoutes = require('./routes/user')
const ChapelRoutes = require('./routes/chapel')
const RequestRoutes = require('./routes/request')
const BaptismRoutes = require('./routes/baptism')
const DeathRoutes = require('./routes/death')
const MarriageRoutes = require('./routes/marriage')
const ConfirmationRoutes = require('./routes/confirmation')
const TransactionRoutes = require('./routes/transaction')
const ScheduleRoutes = require('./routes/schedule')
const DonationRoutes = require('./routes/donation')
const SubscriptionRoutes = require('./routes/subscription')

const port = process.env.PORT

// Express app
const app = express()

// Enable CORS
const cors = require('cors');

//Security
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: '*',
}));

// Middleware
app.use(express.json())

// Routes
app.use('/api/user', UserRoutes)
app.use('/api/chapel', ChapelRoutes)
app.use('/api/request', RequestRoutes)
app.use('/api/baptism', BaptismRoutes)
app.use('/api/death', DeathRoutes)
app.use('/api/marriage', MarriageRoutes)
app.use('/api/confirmation', ConfirmationRoutes)
app.use('/api/transaction', TransactionRoutes)
app.use('/api/schedule', ScheduleRoutes)
app.use('/api/donation', DonationRoutes)
app.use('/api/subscription', SubscriptionRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen
        app.listen(port, () => console.log(`Connected to DB & Listening to port: ${port}!`))
    })
    .catch((error) => console.log(error))