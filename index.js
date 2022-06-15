import express from 'express'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { findTweets } from './db/db.js'

dotenv.config()
const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

app.get('/', (req, res) => {
    console.log(req)
    res.send(JSON.stringify({ message: 'Hi Izzy', status: 200 }))
})

app.get('/tweets/recent/:hashtag', (req, res) => {
    const hashtag = req.params.hashtag
    const pageSize = req.query.page

    if (!pageSize) {
        res.send(
            JSON.stringify({
                message: `BAD REQUEST query parameter 'page' is missing`,
                status: 400,
            })
        )
    } else {
        const query = `query=%23${hashtag}`
        const fields = `tweet.fields=created_at,geo,attachments`
        const maxResults = `max_results=${pageSize}`
        const twitterApiUrl = `https://api.twitter.com/2/tweets/search/recent?${query}&${fields}&${maxResults}`

        fetch(twitterApiUrl, {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                res.send(json)
            })
    }
})

app.get('/tweets', async (req, res) => {
    let skip = parseInt(req.query.skip)
    let pageSize = parseInt(req.query.page)

    if (skip > 100) skip %= 100
    if (pageSize > 100) pageSize = 100

    if (pageSize == undefined || skip == undefined) {
        res.send(
            JSON.stringify({
                message: `BAD REQUEST query parameter 'page or skip' is missing`,
                status: 400,
            })
        )
    } else {
        const tweets = await findTweets(skip, pageSize)
        const responseTweets = tweets.map((tweet) => {
            return {
                id: { id: tweet._id },
                text: { text: tweet.text },
            }
        })

        const response = {
            data: responseTweets,
            status: 200,
            count: responseTweets.length,
        }

        res.send(response)
    }
})

app.listen(PORT, HOST)

console.log(`Running on http://${HOST}:${PORT}`)
