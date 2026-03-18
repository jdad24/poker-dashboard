import express, { type Request, type Response } from "express";
import { registerUserService, checkPasswordService } from '../services/user';
// import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/create-account', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required' });
    }

    try {
        const response = await registerUserService(email, password)
        if(response.success) return res.status(201).json({ success: response.success, message: 'User registered successfully' });
        return res.status(400).json({ success: response.success, message: 'User registered successfully' });
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
        const isValid = await checkPasswordService(email, password)

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.email = email; // Store email in session for simplicity
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