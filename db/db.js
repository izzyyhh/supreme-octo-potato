import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const username = encodeURIComponent(process.env.MONGO_INITDB_ROOT_USERNAME)
const password = encodeURIComponent(process.env.MONGO_INITDB_ROOT_PASSWORD)

const dbName = 'restdb'
const collectionName = 'tweets'
const uri = `mongodb://${username}:${password}@mongo:27017/${dbName}?authSource=admin`
const client = new MongoClient(uri)

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
            enableUtf8Validation: true,
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
