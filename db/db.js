import { MongoClient } from 'mongodb'

const uri = 'mongodb://mongo:27017'
const client = new MongoClient(uri)
const dbName = 'restdb'
const collectionName = 'tweets'

export async function findAllTweets() {
    try {
        await client.connect()
        const database = client.db(dbName)
        const tweetsCollection = database.collection(collectionName)
        const options = {
            text: 1,
        }

        return await tweetsCollection.find(null, options).toArray()
    } finally {
        await client.close()
    }
}

export async function findTweets(from, pageSize) {
    try {
        await client.connect()
        const database = client.db(dbName)
        const tweetsCollection = database.collection(collectionName)
        const options = {
            text: 1,
        }

        return await tweetsCollection
            .find(null, options)
            .skip(from)
            .limit(pageSize)
            .toArray()
    } finally {
        await client.close()
    }
}

export async function populateTweets(pageSize) {}
