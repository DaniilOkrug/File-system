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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/js/filesystem.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/filesystem.js":
/*!*************************************!*\
  !*** ./src/assets/js/filesystem.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var xhr = new XMLHttpRequest()\r\nxhr.open(\r\n    'GET',\r\n    'http://localhost:3002/',\r\n    true\r\n)\r\nxhr.send()\r\n\r\nxhr.onreadystatechange = () => {\r\n    if (xhr.readyState != 4) {\r\n        return\r\n    }\r\n\r\n    // Положительный ответ\r\n    if (xhr.status === 200) {\r\n        response = JSON.parse(xhr.responseText)\r\n\r\n        console.log(response);\r\n\r\n        parseFileSystem(response);\r\n\r\n    } else { //Ошибка с сервера\r\n        console.log('err', xhr.responseText)\r\n    }\r\n}\r\n\r\n// Отображение файловой сиситемы в html\r\nfunction parseFileSystem(response) {\r\n    //Отображние root папок\r\n    for (let i = 0; i < response.length ;i++) {\r\n        const rootId = 'root' + i\r\n        document.getElementById(\"folder\").insertAdjacentHTML('beforeend', `\r\n                <div id=\"${rootId}\" class=\"folder__item-root\">\r\n                    <div class=\"folder__item__content\">\r\n                        <div class=\"folder__item__content__body\">\r\n                            <div class=\"folder__item__connector-left\">\r\n                                <div class=\"mask\"></div>\r\n                            </div>\r\n                            <img class=\"img-folder\" src=\"assets/images/Folder.svg\" alt=\"folder\">\r\n                            <p class=\"folder__item__name\">${response[i].name}</p>\r\n                        </div>\r\n                    </div>\r\n                </div>`\r\n        )\r\n\r\n        //Отображение саб-директорий и файлов\r\n        if (response[i].children.length != 0) {\r\n            getFileSystemChildren(response[i].children, rootId);       \r\n        }\r\n    }\r\n}\r\n\r\nfunction getFileSystemChildren(array_of_subdirectory, folderId) {\r\n    let folderCounter = 0\r\n    console.log(array_of_subdirectory)\r\n    for (let i = 0; i < array_of_subdirectory.length; i++) {\r\n        console.log(array_of_subdirectory[i])\r\n\r\n        if (array_of_subdirectory[i].type == 'dir') {\r\n            newFolderId = folderId + '__sub' + folderCounter\r\n            folderCounter++\r\n\r\n            document.getElementById(folderId).insertAdjacentHTML('beforeend', `\r\n                <div id=\"${newFolderId}\" class=\"folder__item\">\r\n                    <div class=\"folder__item__content\">\r\n                        <div class=\"folder__item__content__body\">\r\n                            <div class=\"folder__item__connector-left\">\r\n                                <div class=\"mask\"></div>\r\n                            </div>\r\n                            <img class=\"img-folder\" src=\"assets/images/Folder.svg\" alt=\"folder\">\r\n                            <p class=\"folder__item__name\">${array_of_subdirectory[i].name}</p>\r\n                        </div>\r\n                    </div>\r\n                </div>`\r\n            )\r\n\r\n            if (array_of_subdirectory[i].children.length != 0) {\r\n                getFileSystemChildren(array_of_subdirectory[i].children, newFolderId);       \r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/assets/js/filesystem.js?");

/***/ })

/******/ });