// models/Event.js
const EventSchema = new mongoose.Schema({
    clubName: String,
    date: Date,
    venue: String,
    entry: String,
    performer: String,
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Event', EventSchema);