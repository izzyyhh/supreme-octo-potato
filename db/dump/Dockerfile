FROM mongo
COPY ./hundred_league_tweets.json /initial_data.json
CMD mongoimport --host mongo --db restdb --collection tweets --type json --file /initial_data.json --jsonArray