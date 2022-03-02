ssh root@159.89.25.135  
rsync -r --exclude 'node_modules' ~/supreme-octo-potato root@159.89.25.135:~/  
docker run -d -p 8080:8080 izzy/bac-serverv0
docker build . -t izzy/bac-serverv0
