#!/bin/bash

# 批量删除镜像 config 文件以及重新打印镜像

docker login docker-registry.xxx

# 需要更新的镜像
tags=(v1.0.0
v2.0.0
v3.0.0)

i=0
while [ $i -lt ${#tags[@]} ]
do
    echo "----${tags[$i]}"

    # 删除 default.yml 文件
    containerID=`docker run -d docker-registry.xxx:${tags[$i]} rm /app/config/default.yml`
    echo "----delete default.yml success and containerID ${containerID}"

    # 打包镜像
    newImages=docker-registry.xxx:${tags[$i]}-1
    imageID=`docker commit $containerID $newImages`

    echo "----${imageID} ${newImages}"

    # 上传镜像
    docker push $newImages
    echo "----docker pull success"
    let i++
done