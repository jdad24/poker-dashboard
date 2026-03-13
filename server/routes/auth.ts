import express, { type Request, type Response } from "express";
import { addUser, checkPassword, checkIfUserExists } from '../services/user.ts';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/create-account', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required' });
    }
    const existingUser = await checkIfUserExists(email)
    if (existingUser) {
        return res.status(409).json({ exists: true, message: 'email already exists' });
    }

    try {
        const success = await addUser(email, password)
        res.status(201).json({ success, message: 'User registered successfully' });
    } catch (e) {
        console.error(e)
        res.status(500).json({ success: false, error: e })
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required' });
    }

    try {
        const isValid = await checkPassword(email, password)

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        (req.session as any).email = email; // Store email in session for simplicity
        // const token = jwt.sign({
        //     email: email,
        //     loginTime: Date()
        // }, 'process.env.TOKEN_SECRET',
        //     { expiresIn: '1hr' })

        return res.json({ 
            success: true, 
            // token 
        });
    } catch (e) {
        console.error(e)
        return { success: false, error: `Error logging in. ${e}` }
    }
});

router.post('/logout', async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error: ", err)
            return res.status(500).json({ success: false })
        }
        // Optional but recommended: clear cookie explicitly
        res.clearCookie("connect.sid", {
            httpOnly: true,
            secure: false, // true in HTTPS
            maxAge: 1000 * 60 * 60, // 1 hour
        });

        res.json({ success: true });
    })
})

export default router;