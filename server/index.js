const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { json } = require('express');
const rimraf = require("rimraf");

const app = express();
const port = 3002;

app.post('/rename', (req, res, next) => {
    var body = "";
    req.on("data", (data) => {
        body += data;
    });

    req.on("end", () => {
        const rename = JSON.parse(body);
        console.log('Renaming:', rename);
        switch (rename.type) {
            case 'dir':
                fs.rename(rename.path, path.dirname(rename.path) + '/' + rename.newName, function(err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Successfully renamed");
                    }
                  });
                break
            case 'file':
                fs.rename(rename.path + '/' + rename.name, rename.path + '/' + rename.newName +   '.txt', function(err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Successfully renamed");
                    }
                    });
                break
        }
        res.status(200).send();
    });
});

app.post('/deletefolder', (req, res, next) => {
    var body = "";
    req.on("data", (data) => {
        body += data;
    });

    req.on("end", () => {
        const folder = JSON.parse(body);
        console.log('Deleting folder:', folder);

        rimraf(folder.path, (err) => {
            if(err) {
                console.log('Error');
                res.status(200).send();
            } else {
                console.log('Successeful deleating!');
            }
        })

        res.status(200).send();
    });
});

app.post('/deletefile', (req, res, next) => {
    var body = "";
    req.on("data", (data) => {
        body += data;
    });

    req.on("end", () => {
        const file = JSON.parse(body);
        console.log('Deleating file:', file);
        fs.unlinkSync(file.path + '/' + file.name);
        console.log('Deleating successful!');
        res.status(200).send();
    });
});

app.post('/newfolder', (req, res, next) => {
    var body = "";
    req.on("data", (data) => {
        body += data;
    });

    req.on("end", () => {
        const folder = JSON.parse(body);
        console.log('Creating directory:', folder);

        fs.mkdir(folder.path + '/' + folder.name, (err) => {
            if (err) {
                res.status(500).send();
                console.log(err);
            } else {
                console.log('Directory created');
            }
        })

        res.status(200).send();
    });

    res.send();
});

app.post('/newfile', (req, res, next) => {
    var body = "";
    req.on("data", (data) => {
        body += data;
    });

    req.on("end", () => {
        const file = JSON.parse(body);
        console.log('Creating file:', file);

        const creationFile = file.path + '/' + file.name + '.txt';
        console.log('filePath:', creationFile);
        fs.open(creationFile, 'w', (err) => {
            if (err) {
                res.status(500).send();
                console.log(err);
            }
            console.log('File created!')
        });

        res.status(200).send();
    });
});

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
                time: stat.ctime,
            });
        }
        if (stat.isDirectory()) {
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