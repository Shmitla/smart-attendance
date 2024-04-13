import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "@/db/config/dbConnect";
import User from "@/db/models/user";
import bcrypt from 'bcrypt';

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { username, password, school, email } = req.body;

            // Check if username already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Hash the password before storing it in the database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = await User.create({ username, school, email, password: hashedPassword });
            const userData = {
                username: newUser.username,
                school: newUser.school,
                email: newUser.email
            };

            // Return the user data without sensitive information
            return res.status(200).json({ user: userData });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        // Handle other HTTP methods
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
