const uuidv4 = require("uuid/v4")
let xhr = new XMLHttpRequest()
let fileSystem_ready = false //Определяет готовность, когда загрузится файловая система

xhr.open(
    'GET',
    'http://localhost:3002/',
    true
)
xhr.send()

xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) {
        return
    }

    // Положительный ответ
    if (xhr.status === 200) {

        response = JSON.parse(xhr.responseText)

        parseFileSystem(response)

        fileSystem_ready = true
        foldersOnСlick()
        filesOnClick()
        newFile_Folder()
        deleteFile_Folder()
        rename()

    } else { //Ошибка с сервера
        console.log('err', xhr.responseText)
    }
}

// Отображение файловой сиситемы в html
function parseFileSystem(response) {
    //Отображние root папок
    for (let i = 0; i < response.length; i++) {
        const rootId = uuidv4()
        document.getElementById("folder").insertAdjacentHTML('beforeend', `
                <div id="${rootId}" class="folder__item-root">
                    <div class="folder__item__content">
                        <div class="folder__item__content__body">
                            <div class="folder__item__connector-left">
                                <div class="mask"></div>
                            </div>
                            <img class="img-folder" src="assets/images/Folder.svg" alt="folder">
                            <p class="folder__item__name">${response[i].name}</p>
                        </div>
                    </div>
                </div>
        `)

        //Отображение саб-директорий и файлов
        if (response[i].children.length != 0) {
            document.getElementById('table').insertAdjacentHTML('beforeend', `
                <div id=${rootId + '_table'} class="table__content">
                </div>
            `)
            getFileSystemChildren(response[i].children, rootId)
        }
    }
}

function getFileSystemChildren(array_of_subdirectory, folderId) {
    for (let i = 0; i < array_of_subdirectory.length; i++) {
        //Вывод файлов
        if (array_of_subdirectory[i].type == 'file') {
            document.getElementById(folderId + '_table').insertAdjacentHTML('beforeend', `
                <div class="table__content__row">
                    <div class="table__content__item">
                        <p class="table__content__name">${array_of_subdirectory[i].name}</p>
                    </div>
                    <div class="table__content__item">
                        <p class="table__content__name">${array_of_subdirectory[i].time.substring(0, 10)}</p>
                    </div>
                    <div class="table__content__item">
                        <p class="table__content__name"></p>
                    </div>
                </div>
            `)
        }

        //Вывод директорий
        if (array_of_subdirectory[i].type == 'dir') {
            newFolderId = uuidv4()
            document.getElementById(folderId).insertAdjacentHTML('beforeend', `
                <div id="${newFolderId}" class="folder__item">
                    <div class="folder__item__content">
                        <div class="folder__item__content__body">
                            <div class="folder__item__connector-left">
                                <div class="mask"></div>
                            </div>
                            <img class="img-folder" src="assets/images/Folder.svg" alt="folder">
                            <p class="folder__item__name">${array_of_subdirectory[i].name}</p>
                        </div>
                    </div>
                </div>
            `)

            document.getElementById('table').insertAdjacentHTML('beforeend', `
                <div id=${newFolderId + '_table'} class="table__content">
                </div>
                `)
            if (array_of_subdirectory[i].children.length != 0) {
                getFileSystemChildren(array_of_subdirectory[i].children, newFolderId);
            }
        }
    }
}

function foldersOnСlick() {
    let folders = document.querySelectorAll('div.folder__item__content')
    let tables = document.querySelectorAll('div.table__content')
    let activeFolder_tableId

    //Начальной активной директорией является первая root директория

    folders.forEach(folder =>
        folder.addEventListener("click", () => {
            //Скрываем саб-директории
            if (folder.classList.contains('active') && folder.nextElementSibling.classList.contains('show')) {
                let delete_show = folder.parentElement.querySelectorAll('div.folder__item .show')
                delete_show.forEach(element => element.classList.remove('show'))
                controlOfShowing = false
            } else if (folder.classList.contains('active') && !folder.nextElementSibling.classList.contains('show')) {
                //Показываем саб-директории
                let currentSibling = folder.nextElementSibling
                for (let i = 1; i < folder.parentElement.childElementCount; i++) {
                    currentSibling.classList.add('show')
                    currentSibling = currentSibling.nextElementSibling
                }
            }

            //Устанавливаем класс active к выбранной директории
            folders.forEach(element => element.classList.remove('active'))
            folder.classList.add('active')

            //Устанавливаем класс active к выбранной таблицы
            activeFolder_tableId = folder.parentElement.id + '_table'
            tables.forEach(element => element.classList.remove('active'))
            document.getElementById(activeFolder_tableId).classList.add('active')
        })
    )
}

function filesOnClick() {
    let files = document.querySelectorAll('div.table__content__row')

    files.forEach(file =>
        file.addEventListener("click", () => {
            files.forEach(element => element.classList.remove('active'))
            file.classList.add('active')
            activeFolder = folder
        })
    )
}

function newFile_Folder() {
    let new_btn = document.getElementById('new')

    new_btn.addEventListener("click", () => {
        let itemSelected = document.querySelector('div.folder__item__content.active').parentElement
        let url, objName, type, path, parentItem
        console.log(itemSelected)

        path = itemSelected.querySelector('.folder__item__name').innerHTML

        //Определяем случай когда выбарана корневая папка
        if (!itemSelected.classList.contains('folder__item-root')) {
            parentItem = itemSelected.parentElement
            while (true) {
                if (parentItem.classList.contains('folder__item-root')) {
                    path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path
                    break
                }
                path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path
                parentItem = parentItem.parentElement
                console.log("path", path)
            }
        }

        //Определение времени, типа и имени объекта
        if (document.getElementById('wrapper').classList.contains('active')) {
            objName = prompt(`File will be created in the directiry "${itemSelected.querySelector('.folder__item__name').innerHTML}". Enter the file name`, '')
            type = 'file'
            url = 'http://localhost:3002/newfile'
            if (objName == null) return
        } else {
            objName = prompt(`New directory will be created in the folder "${itemSelected.querySelector('.folder__item__name').innerHTML}" Enter the folder name`, '')
            type = 'dir'
            url = 'http://localhost:3002/newfolder'
            if (objName == null) return
        }

        xhr.open(
            'POST',
            url
        )
        let json = JSON.stringify({
            name: objName,
            path: path,
            type: type,
        })
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr.send(json)

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) {
                return
            }

            // Положительный ответ
            if (xhr.status === 200) {
                //Отображаем новую папку или файл
                switch (type) {
                    case 'file':
                        let date = new Date();
                        let time = date.getFullYear() + '-'
                        if (date.getMonth() + 1 < 10) {
                            time += '0'
                        }
                        time += (date.getMonth() + 1) + '-'

                        if (date.getDay() < 10) {
                            time += '0'
                        }
                        time += date.getDay() + 4

                        document.getElementById(itemSelected.id + '_table').insertAdjacentHTML('beforeend', `
                            <div class="table__content__row">
                                <div class="table__content__item">
                                    <p class="table__content__name">${objName + '.txt'}</p>
                                </div>
                                <div class="table__content__item">
                                    <p class="table__content__name">${time}</p>
                                </div>
                                <div class="table__content__item">
                                    <p class="table__content__name"></p>
                                </div>
                            </div>
                        `)
                        break
                    case 'dir':
                        const folderId = uuidv4()
                        console.log('sibling', itemSelected.querySelector('folder__item'))

                        let currentSibling = itemSelected.querySelector('div.folder__item')
                        for (let i = 1; i < itemSelected.childElementCount; i++) {
                            currentSibling.classList.add('show')
                            currentSibling = currentSibling.nextElementSibling
                        }

                        //Отображение папки
                        document.getElementById(itemSelected.id).insertAdjacentHTML('beforeend', `
                            <div id="${folderId}" class="folder__item show">
                                <div class="folder__item__content">
                                    <div class="folder__item__content__body">
                                        <div class="folder__item__connector-left">
                                            <div class="mask"></div>
                                        </div>
                                        <img class="img-folder" src="assets/images/Folder.svg" alt="folder">
                                        <p class="folder__item__name">${objName}</p>
                                    </div>
                                </div>
                            </div>
                        `)

                        //Отображение ее файлов
                        document.getElementById('table').insertAdjacentHTML('beforeend', `
                            <div id=${folderId + '_table'} class="table__content">
                            </div>
                        `)
                        break
                }

                foldersOnСlick()
                filesOnClick()
            } else { //Ошибка с сервера
                console.log('err', xhr.responseText)
            }
        }
    })
}

function deleteFile_Folder() {
    const delete_btn = document.getElementById('delete');

    delete_btn.addEventListener("click", () => {
        let url, folderSelected, type, itemName, path, tableRowSelected

        folderSelected = document.querySelector('div.folder__item__content.active').parentElement
        if (document.getElementById('wrapper').classList.contains('active')) {
            tableRowSelected = document.querySelector('div.table__content__row.active').parentElement
            itemName = tableRowSelected.querySelector('p.table__content__name').innerHTML
            type = 'file'
            url = 'http://localhost:3002/deletefile'
        } else {
            itemName = folderSelected.querySelector('p.folder__item__name').innerHTML
            type = 'dir'
            url = 'http://localhost:3002/deletefolder'
        }

        path = folderSelected.querySelector('.folder__item__name').innerHTML

        //Определяем случай когда выбарана корневая папка
        if (!folderSelected.classList.contains('folder__item-root')) {
            parentItem = folderSelected.parentElement
            while (true) {
                if (parentItem.classList.contains('folder__item-root')) {
                    path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path
                    break
                }
                path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path
                parentItem = parentItem.parentElement
                console.log("path", path)
            }
        }

        console.log('path', path)

        xhr.open(
            'POST',
            url
        )
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr.send(JSON.stringify({
            name: itemName,
            pathNew: path,
            type: type,
        }))

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) {
                return
            }

            // Положительный ответ
            if (xhr.status === 200) {
                switch (type) {
                    case 'dir':
                        document.getElementById(folderSelected.id + '_table').remove()
                        folderSelected.remove()
                        break
                    case 'file':
                        tableRowSelected.remove()
                        break
                }
            } else { //Ошибка с сервера
                console.log('err', xhr.responseText)
            }
        }
    })
}

function rename() {
    const rename_btn = document.getElementById('rename');

    rename_btn.addEventListener('click', () => {
        folderSelected = document.querySelector('div.folder__item__content.active').parentElement

        if (document.getElementById('wrapper').classList.contains('active')) {
            tableRowSelected = document.querySelector('div.table__content__row.active').parentElement
            itemName = tableRowSelected.querySelector('p.table__content__name').innerHTML
            type = 'file'
        } else {
            itemName = folderSelected.querySelector('p.folder__item__name').innerHTML
            type = 'dir'
        }

        path = folderSelected.querySelector('.folder__item__name').innerHTML

        //Определяем случай когда выбарана корневая папка
        if (!folderSelected.classList.contains('folder__item-root')) {
            parentItem = folderSelected.parentElement
            while (true) {
                if (parentItem.classList.contains('folder__item-root')) {
                    path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path
                    break
                }
                path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path
                parentItem = parentItem.parentElement
                console.log("path", path)
            }
        }

        const newName = prompt(`Enter new name`, '')
        if(newName == undefined) return

        xhr.open(
            'POST',
            'http://localhost:3002/rename'
        )
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr.send(JSON.stringify({
            name: itemName,
            path: path,
            newName: newName,
            type: type,
        }))

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) {
                return
            }

            // Положительный ответ
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText)
                switch (type) {
                    case 'dir':
                        folderSelected.querySelector('.folder__item__name').innerHTML = response.name
                        break
                    case 'file':
                        document.querySelector('div.table__content__row.active').parentElement.querySelector('p.table__content__name').innerHTML = response.name
                        break
                }
            } else { //Ошибка с сервера
                console.log('err', xhr.responseText)
            }
        }
    })
}