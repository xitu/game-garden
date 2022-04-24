#!/usr/bin/env sh 
   # 确保脚本抛出遇到的错误 
 set -e 
   # 生成静态文件 
 npm run build 
   # 进入生成的文件夹 
 cd dist 
 
 git init 
 git add -A 
 git commit -m 'feat: update games' 
   # 如果发布到 https://<USERNAME>.github.io 
 git push git@github.com:vaggchen/turnBox.git HEAD:page -f
   cd - 
   rm -rf dist