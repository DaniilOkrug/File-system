/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return ([\n    bth[buf[i++]], bth[buf[i++]],\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]],\n    bth[buf[i++]], bth[buf[i++]],\n    bth[buf[i++]], bth[buf[i++]]\n  ]).join('');\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Unique ID creation requires a high quality random # generator.  In the\n// browser this is a little complicated due to unknown quality of Math.random()\n// and inconsistent support for the `crypto` API.  We do the best we can via\n// feature-detection\n\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto\n// implementation. Also, find the complete implementation of crypto on IE11.\nvar getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||\n                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));\n\nif (getRandomValues) {\n  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto\n  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef\n\n  module.exports = function whatwgRNG() {\n    getRandomValues(rnds8);\n    return rnds8;\n  };\n} else {\n  // Math.random()-based (RNG)\n  //\n  // If all else fails, use Math.random().  It's fast, but is of unspecified\n  // quality.\n  var rnds = new Array(16);\n\n  module.exports = function mathRNG() {\n    for (var i = 0, r; i < 16; i++) {\n      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;\n      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;\n    }\n\n    return rnds;\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/rng-browser.js?");

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof(options) == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n  options = options || {};\n\n  var rnds = options.random || (options.rng || rng)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || bytesToUuid(rnds);\n}\n\nmodule.exports = v4;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/v4.js?");

/***/ }),

/***/ "./src/assets/js/app.js":
/*!******************************!*\
  !*** ./src/assets/js/app.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const wrapper = document.getElementById('wrapper')\r\nconst sidebar = document.getElementById('sidebar')\r\n\r\nwrapper.addEventListener(\"click\" , () => {\r\n    wrapper.classList.add('active')\r\n    sidebar.classList.remove('active')\r\n})\r\n\r\nsidebar.addEventListener(\"click\" , () => {\r\n    sidebar.classList.add('active')\r\n    wrapper.classList.remove('active')\r\n})\n\n//# sourceURL=webpack:///./src/assets/js/app.js?");

/***/ }),

/***/ "./src/assets/js/filesystem.js":
/*!*************************************!*\
  !*** ./src/assets/js/filesystem.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const uuidv4 = __webpack_require__(/*! uuid/v4 */ \"./node_modules/uuid/v4.js\")\r\nlet xhr = new XMLHttpRequest()\r\nlet fileSystem_ready = false //Определяет готовность, когда загрузится файловая система\r\n\r\nxhr.open(\r\n    'GET',\r\n    'http://localhost:3002/',\r\n    true\r\n)\r\nxhr.send()\r\n\r\nxhr.onreadystatechange = () => {\r\n    if (xhr.readyState != 4) {\r\n        return\r\n    }\r\n\r\n    // Положительный ответ\r\n    if (xhr.status === 200) {\r\n\r\n        response = JSON.parse(xhr.responseText)\r\n\r\n        parseFileSystem(response)\r\n\r\n        fileSystem_ready = true\r\n        foldersOnСlick()\r\n        filesOnClick()\r\n        newFile_Folder()\r\n        deleteFile_Folder()\r\n        rename()\r\n\r\n    } else { //Ошибка с сервера\r\n        console.log('err', xhr.responseText)\r\n    }\r\n}\r\n\r\n// Отображение файловой сиситемы в html\r\nfunction parseFileSystem(response) {\r\n    //Отображние root папок\r\n    for (let i = 0; i < response.length; i++) {\r\n        const rootId = uuidv4()\r\n        document.getElementById(\"folder\").insertAdjacentHTML('beforeend', `\r\n                <div id=\"${rootId}\" class=\"folder__item-root\">\r\n                    <div class=\"folder__item__content\">\r\n                        <div class=\"folder__item__content__body\">\r\n                            <div class=\"folder__item__connector-left\">\r\n                                <div class=\"mask\"></div>\r\n                            </div>\r\n                            <img class=\"img-folder\" src=\"assets/images/Folder.svg\" alt=\"folder\">\r\n                            <p class=\"folder__item__name\">${response[i].name}</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n        `)\r\n\r\n        //Отображение саб-директорий и файлов\r\n        if (response[i].children.length != 0) {\r\n            document.getElementById('table').insertAdjacentHTML('beforeend', `\r\n                <div id=${rootId + '_table'} class=\"table__content\">\r\n                </div>\r\n            `)\r\n            getFileSystemChildren(response[i].children, rootId)\r\n        }\r\n    }\r\n}\r\n\r\nfunction getFileSystemChildren(array_of_subdirectory, folderId) {\r\n    for (let i = 0; i < array_of_subdirectory.length; i++) {\r\n        //Вывод файлов\r\n        if (array_of_subdirectory[i].type == 'file') {\r\n            document.getElementById(folderId + '_table').insertAdjacentHTML('beforeend', `\r\n                <div class=\"table__content__row\">\r\n                    <div class=\"table__content__item\">\r\n                        <p class=\"table__content__name\">${array_of_subdirectory[i].name}</p>\r\n                    </div>\r\n                    <div class=\"table__content__item\">\r\n                        <p class=\"table__content__name\">${array_of_subdirectory[i].time.substring(0, 10)}</p>\r\n                    </div>\r\n                    <div class=\"table__content__item\">\r\n                        <p class=\"table__content__name\"></p>\r\n                    </div>\r\n                </div>\r\n            `)\r\n        }\r\n\r\n        //Вывод директорий\r\n        if (array_of_subdirectory[i].type == 'dir') {\r\n            newFolderId = uuidv4()\r\n            document.getElementById(folderId).insertAdjacentHTML('beforeend', `\r\n                <div id=\"${newFolderId}\" class=\"folder__item\">\r\n                    <div class=\"folder__item__content\">\r\n                        <div class=\"folder__item__content__body\">\r\n                            <div class=\"folder__item__connector-left\">\r\n                                <div class=\"mask\"></div>\r\n                            </div>\r\n                            <img class=\"img-folder\" src=\"assets/images/Folder.svg\" alt=\"folder\">\r\n                            <p class=\"folder__item__name\">${array_of_subdirectory[i].name}</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            `)\r\n\r\n            document.getElementById('table').insertAdjacentHTML('beforeend', `\r\n                <div id=${newFolderId + '_table'} class=\"table__content\">\r\n                </div>\r\n                `)\r\n            if (array_of_subdirectory[i].children.length != 0) {\r\n                getFileSystemChildren(array_of_subdirectory[i].children, newFolderId);\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nfunction foldersOnСlick() {\r\n    let folders = document.querySelectorAll('div.folder__item__content')\r\n    let tables = document.querySelectorAll('div.table__content')\r\n    let activeFolder_tableId\r\n\r\n    //Начальной активной директорией является первая root директория\r\n\r\n    folders.forEach(folder =>\r\n        folder.addEventListener(\"click\", () => {\r\n            //Скрываем саб-директории\r\n            if (folder.classList.contains('active') && folder.nextElementSibling.classList.contains('show')) {\r\n                let delete_show = folder.parentElement.querySelectorAll('div.folder__item .show')\r\n                delete_show.forEach(element => element.classList.remove('show'))\r\n                controlOfShowing = false\r\n            } else if (folder.classList.contains('active') && !folder.nextElementSibling.classList.contains('show')) {\r\n                //Показываем саб-директории\r\n                let currentSibling = folder.nextElementSibling\r\n                for (let i = 1; i < folder.parentElement.childElementCount; i++) {\r\n                    currentSibling.classList.add('show')\r\n                    currentSibling = currentSibling.nextElementSibling\r\n                }\r\n            }\r\n\r\n            //Устанавливаем класс active к выбранной директории\r\n            folders.forEach(element => element.classList.remove('active'))\r\n            folder.classList.add('active')\r\n\r\n            //Устанавливаем класс active к выбранной таблицы\r\n            activeFolder_tableId = folder.parentElement.id + '_table'\r\n            tables.forEach(element => element.classList.remove('active'))\r\n            document.getElementById(activeFolder_tableId).classList.add('active')\r\n        })\r\n    )\r\n}\r\n\r\nfunction filesOnClick() {\r\n    let files = document.querySelectorAll('div.table__content__row')\r\n\r\n    files.forEach(file =>\r\n        file.addEventListener(\"click\", () => {\r\n            files.forEach(element => element.classList.remove('active'))\r\n            file.classList.add('active')\r\n            activeFolder = folder\r\n        })\r\n    )\r\n}\r\n\r\nfunction newFile_Folder() {\r\n    let new_btn = document.getElementById('new')\r\n\r\n    new_btn.addEventListener(\"click\", () => {\r\n        let itemSelected = document.querySelector('div.folder__item__content.active').parentElement\r\n        let url, objName, type, path, parentItem\r\n        console.log(itemSelected)\r\n\r\n        path = itemSelected.querySelector('.folder__item__name').innerHTML\r\n\r\n        //Определяем случай когда выбарана корневая папка\r\n        if (!itemSelected.classList.contains('folder__item-root')) {\r\n            parentItem = itemSelected.parentElement\r\n            while (true) {\r\n                if (parentItem.classList.contains('folder__item-root')) {\r\n                    path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path\r\n                    break\r\n                }\r\n                path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path\r\n                parentItem = parentItem.parentElement\r\n                console.log(\"path\", path)\r\n            }\r\n        }\r\n\r\n        //Определение времени, типа и имени объекта\r\n        if (document.getElementById('wrapper').classList.contains('active')) {\r\n            objName = prompt(`File will be created in the directiry \"${itemSelected.querySelector('.folder__item__name').innerHTML}\". Enter the file name`, '')\r\n            type = 'file'\r\n            url = 'http://localhost:3002/newfile'\r\n            if (objName == null) return\r\n        } else {\r\n            objName = prompt(`New directory will be created in the folder \"${itemSelected.querySelector('.folder__item__name').innerHTML}\" Enter the folder name`, '')\r\n            type = 'dir'\r\n            url = 'http://localhost:3002/newfolder'\r\n            if (objName == null) return\r\n        }\r\n\r\n        xhr.open(\r\n            'POST',\r\n            url\r\n        )\r\n        let json = JSON.stringify({\r\n            name: objName,\r\n            path: path,\r\n            type: type,\r\n        })\r\n        xhr.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\")\r\n        xhr.send(json)\r\n\r\n        xhr.onreadystatechange = () => {\r\n            if (xhr.readyState != 4) {\r\n                return\r\n            }\r\n\r\n            // Положительный ответ\r\n            if (xhr.status === 200) {\r\n                //Отображаем новую папку или файл\r\n                switch (type) {\r\n                    case 'file':\r\n                        let date = new Date();\r\n                        let time = date.getFullYear() + '-'\r\n                        if (date.getMonth() + 1 < 10) {\r\n                            time += '0'\r\n                        }\r\n                        time += (date.getMonth() + 1) + '-'\r\n\r\n                        if (date.getDay() < 10) {\r\n                            time += '0'\r\n                        }\r\n                        time += date.getDay() + 4\r\n\r\n                        document.getElementById(itemSelected.id + '_table').insertAdjacentHTML('beforeend', `\r\n                            <div class=\"table__content__row\">\r\n                                <div class=\"table__content__item\">\r\n                                    <p class=\"table__content__name\">${objName + '.txt'}</p>\r\n                                </div>\r\n                                <div class=\"table__content__item\">\r\n                                    <p class=\"table__content__name\">${time}</p>\r\n                                </div>\r\n                                <div class=\"table__content__item\">\r\n                                    <p class=\"table__content__name\"></p>\r\n                                </div>\r\n                            </div>\r\n                        `)\r\n                        break\r\n                    case 'dir':\r\n                        const folderId = uuidv4()\r\n                        console.log('sibling', itemSelected.querySelector('folder__item'))\r\n\r\n                        let currentSibling = itemSelected.querySelector('div.folder__item')\r\n                        for (let i = 1; i < itemSelected.childElementCount; i++) {\r\n                            currentSibling.classList.add('show')\r\n                            currentSibling = currentSibling.nextElementSibling\r\n                        }\r\n\r\n                        //Отображение папки\r\n                        document.getElementById(itemSelected.id).insertAdjacentHTML('beforeend', `\r\n                            <div id=\"${folderId}\" class=\"folder__item show\">\r\n                                <div class=\"folder__item__content\">\r\n                                    <div class=\"folder__item__content__body\">\r\n                                        <div class=\"folder__item__connector-left\">\r\n                                            <div class=\"mask\"></div>\r\n                                        </div>\r\n                                        <img class=\"img-folder\" src=\"assets/images/Folder.svg\" alt=\"folder\">\r\n                                        <p class=\"folder__item__name\">${objName}</p>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        `)\r\n\r\n                        //Отображение ее файлов\r\n                        document.getElementById('table').insertAdjacentHTML('beforeend', `\r\n                            <div id=${folderId + '_table'} class=\"table__content\">\r\n                            </div>\r\n                        `)\r\n                        break\r\n                }\r\n\r\n                foldersOnСlick()\r\n                filesOnClick()\r\n            } else { //Ошибка с сервера\r\n                console.log('err', xhr.responseText)\r\n            }\r\n        }\r\n    })\r\n}\r\n\r\nfunction deleteFile_Folder() {\r\n    const delete_btn = document.getElementById('delete');\r\n\r\n    delete_btn.addEventListener(\"click\", () => {\r\n        let url, folderSelected, type, itemName, path, tableRowSelected\r\n\r\n        folderSelected = document.querySelector('div.folder__item__content.active').parentElement\r\n        if (document.getElementById('wrapper').classList.contains('active')) {\r\n            tableRowSelected = document.querySelector('div.table__content__row.active').parentElement\r\n            itemName = tableRowSelected.querySelector('p.table__content__name').innerHTML\r\n            type = 'file'\r\n            url = 'http://localhost:3002/deletefile'\r\n        } else {\r\n            itemName = folderSelected.querySelector('p.folder__item__name').innerHTML\r\n            type = 'dir'\r\n            url = 'http://localhost:3002/deletefolder'\r\n        }\r\n\r\n        path = folderSelected.querySelector('.folder__item__name').innerHTML\r\n\r\n        //Определяем случай когда выбарана корневая папка\r\n        if (!folderSelected.classList.contains('folder__item-root')) {\r\n            parentItem = folderSelected.parentElement\r\n            while (true) {\r\n                if (parentItem.classList.contains('folder__item-root')) {\r\n                    path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path\r\n                    break\r\n                }\r\n                path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path\r\n                parentItem = parentItem.parentElement\r\n                console.log(\"path\", path)\r\n            }\r\n        }\r\n\r\n        console.log('path', path)\r\n\r\n        xhr.open(\r\n            'POST',\r\n            url\r\n        )\r\n        xhr.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\")\r\n        xhr.send(JSON.stringify({\r\n            name: itemName,\r\n            pathNew: path,\r\n            type: type,\r\n        }))\r\n\r\n        xhr.onreadystatechange = () => {\r\n            if (xhr.readyState != 4) {\r\n                return\r\n            }\r\n\r\n            // Положительный ответ\r\n            if (xhr.status === 200) {\r\n                switch (type) {\r\n                    case 'dir':\r\n                        document.getElementById(folderSelected.id + '_table').remove()\r\n                        folderSelected.remove()\r\n                        break\r\n                    case 'file':\r\n                        tableRowSelected.remove()\r\n                        break\r\n                }\r\n            } else { //Ошибка с сервера\r\n                console.log('err', xhr.responseText)\r\n            }\r\n        }\r\n    })\r\n}\r\n\r\nfunction rename() {\r\n    const rename_btn = document.getElementById('rename');\r\n\r\n    rename_btn.addEventListener('click', () => {\r\n        folderSelected = document.querySelector('div.folder__item__content.active').parentElement\r\n\r\n        if (document.getElementById('wrapper').classList.contains('active')) {\r\n            tableRowSelected = document.querySelector('div.table__content__row.active').parentElement\r\n            itemName = tableRowSelected.querySelector('p.table__content__name').innerHTML\r\n            type = 'file'\r\n        } else {\r\n            itemName = folderSelected.querySelector('p.folder__item__name').innerHTML\r\n            type = 'dir'\r\n        }\r\n\r\n        path = folderSelected.querySelector('.folder__item__name').innerHTML\r\n\r\n        //Определяем случай когда выбарана корневая папка\r\n        if (!folderSelected.classList.contains('folder__item-root')) {\r\n            parentItem = folderSelected.parentElement\r\n            while (true) {\r\n                if (parentItem.classList.contains('folder__item-root')) {\r\n                    path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path\r\n                    break\r\n                }\r\n                path = parentItem.querySelector('.folder__item__name').innerHTML + '/' + path\r\n                parentItem = parentItem.parentElement\r\n                console.log(\"path\", path)\r\n            }\r\n        }\r\n\r\n        const newName = prompt(`Enter new name`, '')\r\n        if(newName == undefined) return\r\n\r\n        xhr.open(\r\n            'POST',\r\n            'http://localhost:3002/rename'\r\n        )\r\n        xhr.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\")\r\n        xhr.send(JSON.stringify({\r\n            name: itemName,\r\n            path: path,\r\n            newName: newName,\r\n            type: type,\r\n        }))\r\n\r\n        xhr.onreadystatechange = () => {\r\n            if (xhr.readyState != 4) {\r\n                return\r\n            }\r\n\r\n            // Положительный ответ\r\n            if (xhr.status === 200) {\r\n                let response = JSON.parse(xhr.responseText)\r\n                switch (type) {\r\n                    case 'dir':\r\n                        folderSelected.querySelector('.folder__item__name').innerHTML = response.name\r\n                        break\r\n                    case 'file':\r\n                        document.querySelector('div.table__content__row.active').parentElement.querySelector('p.table__content__name').innerHTML = response.name\r\n                        break\r\n                }\r\n            } else { //Ошибка с сервера\r\n                console.log('err', xhr.responseText)\r\n            }\r\n        }\r\n    })\r\n}\n\n//# sourceURL=webpack:///./src/assets/js/filesystem.js?");

/***/ }),

/***/ 0:
/*!******************************************************************!*\
  !*** multi ./src/assets/js/app.js ./src/assets/js/filesystem.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! C:\\Users\\Angel\\Desktop\\File-system\\src\\assets\\js\\app.js */\"./src/assets/js/app.js\");\nmodule.exports = __webpack_require__(/*! C:\\Users\\Angel\\Desktop\\File-system\\src\\assets\\js\\filesystem.js */\"./src/assets/js/filesystem.js\");\n\n\n//# sourceURL=webpack:///multi_./src/assets/js/app.js_./src/assets/js/filesystem.js?");

/***/ })

/******/ });