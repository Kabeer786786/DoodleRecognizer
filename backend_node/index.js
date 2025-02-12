require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(express.json({
    limit: "10mb"
})); // Support large Base64 images
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log(err));

// Mongoose Schema & Model
const participantSchema = new mongoose.Schema({
    name: String,
    categories: [{
        categoryName: String,
        imageUrl: String, // Store saved file path
    }],
    score: Number,
}, {
    timestamps: true
});

const Participant = mongoose.model('Participant', participantSchema);

// ✅ API to Save Base64 Images
app.post("/submit", async (req, res) => {
    try {
        const {
            name,
            score,
            images,
            imageNames
        } = req.body;

        if (!images || !imageNames) {
            // Save to database
            const participant = new Participant({
                name,
                categories: {},
                score
            });
            await participant.save();

            return res.status(201).json({
                message: "Data saved successfully",
                participant
            });
        }

        const categoryNames = Array.isArray(imageNames) ? imageNames : [imageNames];
        const imageArray = Array.isArray(images) ? images : [images];

        const savedImages = [];

        imageArray.forEach((base64String, index) => {
            const category = categoryNames[index] || "Unknown";
            const categoryFolder = path.join(__dirname, "uploads", category);

            // Ensure category folder exists
            if (!fs.existsSync(categoryFolder)) {
                fs.mkdirSync(categoryFolder, {
                    recursive: true
                });
            }

            // Extract Base64 data
            const matches = base64String.match(/^data:(.+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                return res.status(400).json({
                    error: "Invalid Base64 format"
                });
            }

            const ext = matches[1].split("/")[1]; // Extract file extension
            const buffer = Buffer.from(matches[2], "base64"); // Convert Base64 to Buffer
            const fileName = `${name.replace(/\s+/g, "_")}_${Date.now()}.${ext}`;
            const filePath = path.join(categoryFolder, fileName);

            // Save file to disk
            fs.writeFileSync(filePath, buffer);

            savedImages.push({
                categoryName: category,
                imageUrl: `/uploads/${category}/${fileName}`,
            });
        });

        // Save to database
        const participant = new Participant({
            name,
            categories: savedImages,
            score
        });
        await participant.save();

        res.status(201).json({
            message: "Data saved successfully",
            participant
        });
    } catch (error) {
        console.error("❌ Server error:", error);
        res.status(500).json({
            error: "Server error"
        });
    }
});

// ✅ API Route to Get Top 10 Participants Sorted by Score
app.get('/top10', async (req, res) => {
    try {
        const topParticipants = await Participant.find().sort({
            score: -1
        }).limit(5);
        res.json(topParticipants);
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        });
    }
});

// ✅ API Route to Get a Specific Participant by ID
app.get('/participant/:id', async (req, res) => {
    try {
        const participant = await Participant.findById(req.params.id);
        if (!participant) {
            return res.status(404).json({
                error: 'Participant not found'
            });
        }
        res.json(participant);
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        });
    }
});

// ✅ Serve Uploaded Files (Access via http://localhost:7000/uploads/{category}/{filename})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});