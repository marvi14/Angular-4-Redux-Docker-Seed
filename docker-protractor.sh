# To run docker-protractor.sh => remove '&' from "start" command in package.json 
# PS: never push package.json without '&' to the repo!!

docker-compose build
docker-compose up -d
docker run -it --privileged --rm --net=host -v /dev/shm:/dev/shm -v $(pwd):/protractor webnicer/protractor-headless $@
docker-compose stop