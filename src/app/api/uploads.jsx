import multer from 'multer';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// MongoDB connection
const mongoUrl = 'mongodb://username:password@localhost:27017/databaseName'; // Replace with your MongoDB connection string
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose schema
const imageSchema = new mongoose.Schema({
  imageName: String,
});

const Image = mongoose.model('Image', imageSchema);

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'src/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Route to upload image
app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const imageName = req.file.filename;
    await Image.create({ imageName });
    res.json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default app;
