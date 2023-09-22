@echo off
:start
set /p "name=Enter Name: "
if not "%name%"=="%name: =%" goto start
git.exe checkout -b %name%
git.exe add .
git.exe commit -m %name%
git.exe push --set-upstream origin %name%
git.exe checkout master
pause
git.exe branch -d %name%
git pull