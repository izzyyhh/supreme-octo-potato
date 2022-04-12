FROM mongo
COPY ./2_hundred_league_tweets.json /initial_data.json
CMD mongoimport --host mongo --db restdb --collection tweets --authenticationDatabase admin \
    --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD \ 
    --type json --file /initial_data.json --jsonArray