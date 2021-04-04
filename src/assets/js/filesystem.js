var xhr = new XMLHttpRequest()
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

        console.log(response);

        parseFileSystem(response);

    } else { //Ошибка с сервера
        console.log('err', xhr.responseText)
    }
}

// Отображение файловой сиситемы в html
function parseFileSystem(response) {
    //Отображние root папок
    for (let i = 0; i < response.length ;i++) {
        const rootId = 'root' + i
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
                </div>`
        )

        //Отображение саб-директорий и файлов
        if (response[i].children.length != 0) {
            getFileSystemChildren(response[i].children, rootId);       
        }
    }
}

function getFileSystemChildren(array_of_subdirectory, folderId) {
    let folderCounter = 0
    console.log(array_of_subdirectory)
    for (let i = 0; i < array_of_subdirectory.length; i++) {
        console.log(array_of_subdirectory[i])

        if (array_of_subdirectory[i].type == 'dir') {
            newFolderId = folderId + '__sub' + folderCounter
            folderCounter++

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
                </div>`
            )

            if (array_of_subdirectory[i].children.length != 0) {
                getFileSystemChildren(array_of_subdirectory[i].children, newFolderId);       
            }
        }
    }
}