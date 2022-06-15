import fs from 'fs'

const fileName = '2_hundred_league_tweets.json'
const fileContent = fs.readFileSync(fileName).toString()
const jsonArray = JSON.parse(fileContent)

jsonArray.forEach((tweet) => {
    tweet.id = { id: tweet.id }
    tweet.text = { text: tweet.text }
    tweet.author = { author: (Math.random() + 1).toString(36).substring(7) } // string
    tweet.geo = { geo: (Math.random() + 1).toString(36).substring(7) } // string
    tweet.created = {
        created: new Date(
            +new Date() - Math.floor(Math.random() * 99999999999)
        ),
    } // string
    tweet.likes = { likes: Math.floor(Math.random() * 1000) } // number
    tweet.retweets = { retweets: Math.floor(Math.random() * 1000) } // number
    tweet.hashtags = { hashtags: ['league', 'izzy', 'bac'] } // array of strings
    tweet.status = { status: 'published' } // string
})

fs.writeFileSync(fileName, JSON.stringify(jsonArray))
