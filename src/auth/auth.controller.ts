import express from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import crypto from 'crypto'

const jwtSecret: string = process.env.JWT_SECRET || ''
const tokenExpirationInSeconds = 360000000

class AuthController {
    async createJWT(req: express.Request, res: express.Response) {
        try {
            const refreshId = req.body.userId + jwtSecret
            const salt = crypto.createSecretKey(crypto.randomBytes(16))
            const hash = crypto
                .createHmac('sha512', salt)
                .update(refreshId)
                .digest('base64')
            req.body.refreshKey = salt.export()
            const token = jwt.sign(req.body, jwtSecret, {
                expiresIn: tokenExpirationInSeconds
            })
            return res
                .json({ accessToken: token, refreshToken: hash })
                .status(201)
        } catch (err) {
            return res.status(500).send(err)
        }
    }
}

export default new AuthController()
