#!/bin/sh
# 获取需要更新的工程 和 分支名
PROJECT=$1
BRANCH=${2:-develop}
if [ ! ${PROJECT} ];then
  echo "Error command!"
  echo "Please assign project name(required) and project branch(optional,the default value is develop)"
  echo "For example: ./xxx.sh {project neme} {project branch}"
  exit 0
fi

# 创建tmp文件夹临时存放历史版本
if [ ! -d "/data/www/tmp" ];then
mkdir /data/www/tmp
fi

# 获取当前时间
time=`date +%Y%m%d_%H%M%S`

# 项目根目录
PROJECT_PATH=/data/www/
# 前端工程访问目录
STUDY=${PROJECT_PATH}study
# 后端工程访问目录
STUDY_API=${PROJECT_PATH}study-api/
# 前端工程打包目录
STUDY_DIST=${PROJECT_PATH}git-code/study/
# 前端打包命令
NPM_COMMAND=cnpm

case ${PROJECT} in
  study )
    # 发送消息，开始打包
    # php /data/sh/notify.php 1

    echo "开始打包${PROJECT}工程！"
    # 删除旧的dist包
    rm -rf ${STUDY_DIST}dist
    # 进入前端打包目录，拉取git最新代码
    cd ${STUDY_DIST} && git checkout develop  && git pull
    # 打dist包
    ${NPM_COMMAND} run build
    # 打包失败后报错
    if [ ! -d "${STUDY_DIST}dist" ]; then
        echo "${STUDY_DIST}dist is not exist"
        exit 0
    fi
    # 备份现有前端 目录文件
    mv /data/www/study /data/www/tmp/study.bak$time
    mv ${STUDY_DIST}dist ${STUDY}
    echo "${PROJECT}工程打包完毕"

    # 发送消息，打包结束
    # php /data/sh/notify.php 2
    ;;
  study-api )
    # 发送消息，开始打包
    # php /data/sh/notify.php 3

    echo "开始打包${PROJECT}工程！"
    # 进入前端打包目录，拉取git最新代码
    cd ${STUDY_API} && git checkout develop  && git pull
    # 更新依赖(不要用update，否则会升级现有以来，install会直接从lock文件读取配置)
    composer install
    # 迁移数据库
    php artisan migrate

    echo "${PROJECT}工程打包完毕"
    # 发送消息，打包结束
    # php /data/sh/notify.php 4
    ;;
  * )
    echo 'Error project name!'
    exit 0
    ;;
esac

echo "打包${PROJECT}成功"
exit 1



