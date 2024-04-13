import dbConnect from "@/db/config/dbConnect";
import User from "@/db/models/user";
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads')); // Set the destination folder for file uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep the original filename
    }
});

const upload = multer({ storage });

dbConnect();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Handle file upload using Multer middleware
            upload.single('photo')(req, res, async function (err: any) {
                if (err instanceof multer.MulterError) {
                    console.error('Multer error:', err);
                    return res.status(400).json({ message: 'Photo upload error' });
                } else if (err) {
                    console.error('Unknown error:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                const { email, password } = req.body;

                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: 'Email is already taken' });
                }

                // Set photoPath to the location where the photo is stored
                const photoPath = req.file.path;

                // Hash the password before storing it in the database
                const hashedPassword = await bcrypt.hash(password, 10);

                // If user is created successfully, return a success message
                const newUser = await User.create({ email, username: email, password: hashedPassword, photo: photoPath });
                let data = JSON.stringify(newUser);
                console.log('User:', newUser);

                return res.status(200).json(data);
            });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
