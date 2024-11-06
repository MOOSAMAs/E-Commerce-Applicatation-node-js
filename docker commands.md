## to build 
- docker build -t demo .
## to run container from img
- docker run --name contName  imgName
## to remover all containers 
- docker rm $(docker ps -a)
## to remover image 
- docker rmi name -f
## to remover container 
- docker rm id

## to async
docker run --name my-cont -v C:\Users\Ahmed Abd Al-Muti\Desktop\dockerapp:/app -p 3000:3000 medo