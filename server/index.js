const express = require('express');
const fs = require('fs');
const path = require('path');
const { json } = require('express');
const { dir } = require('console');

const app = express();
const port = 3002;


app.use('/', (req, res, next) => {
    let dirPath = './project_fs';
    res.send([{
        type: 'dir',
        name: path.basename(dirPath),
        children: getFileSystem(dirPath),
    }]);
});

function getFileSystem(dirPath) {
    let result = [];
    let list = fs.readdirSync(dirPath);

    list.forEach((file) => {
        const newPath = path.join(dirPath, file);
        const stat = fs.statSync(newPath);
        if (stat.isFile()) {
            result.push({
                type: "file",
                name: file,
            });
        }
        if (stat.isDirectory()){
            result.push({
                type: "dir",
                name: file,
                children: getFileSystem(newPath),
            });
        }
    });

    return result;
}

app.listen(port);