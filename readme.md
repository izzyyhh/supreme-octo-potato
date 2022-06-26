# REST server Bachelor Thesis Ismail Halili
A server with an endpoint that servers tweets through pagination.

Set environment variables:
```
TWITTER_BEARER_TOKEN=TEST
MONGO_INITDB_ROOT_USERNAME=TEST
MONGO_INITDB_ROOT_PASSWORD=SECRET
```

Start with Docker:
```
docker-compose up
```

Helpful script for deployment:
```
ssh root@host  
rsync -r --exclude 'node_modules' ~/supreme-octo-potato root@host:~/  
docker run -d -p 8080:8080 izzy/bac-serverv0
docker build . -t izzy/bac-serverv0

or

docker-compose up -d
```
