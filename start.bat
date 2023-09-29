pushd %~dp0
call git pull --strategy-option=theirs
call npm install --no-audit
cls
call npm run build
cls
call node ./dist/index.js
pause
