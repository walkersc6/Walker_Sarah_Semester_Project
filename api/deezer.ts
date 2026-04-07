// straight up from Claude. I've never used vercel before. We're learning

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const path = req.query.path

    if (!path || typeof path !== 'string') {
        return res.status(400).json({ error: 'Missing path parameter '})
    }

    const deezerUrl = `https://api.deezer.com${path}`
    
    const response = await fetch(deezerUrl)
    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).json(data)
}