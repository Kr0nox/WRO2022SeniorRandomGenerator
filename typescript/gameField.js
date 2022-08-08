import { saveCookie, readCookie } from "./cookieManager.js";
const PEOPLE_COOKIE = "colorsPeople";
const LAUNDRY_BLOCKS_COOKIE = "colorsLaundryBlocks";
const LAUNDRY_BASKETS_COOKIE = "colorsLaundryBaskets";
const ROOM_BLOCKS_COOKIE = "colorsRoomBlocks";
const laundryBasketColors = ["#f00", "#202020", "#ff0"];
const laundryBlockColors = ["#f00", "#202020", "#ff0", "transparent"];
const roomColors = ["#fff", "#fff", "#008200", "#008200"];
const figureColors = ["#f00", "#ff0", "#008200", "#00f", "#202020", "#fff", "transparent", "transparent"];
const laundryBaskets = document.getElementsByClassName("LaundryBasket");
const laundryBlocks = document.getElementsByClassName("LaundryBlock");
const roomBlocks = document.getElementsByClassName("RoomBlock");
const persons = document.getElementsByClassName("Person");
let selectedObject = null;
load();
setOnclicksForManipulation();
export function generate() {
    saveCookie(LAUNDRY_BASKETS_COOKIE, colorObjects(shuffleColors(laundryBasketColors), laundryBaskets).toString());
    saveCookie(LAUNDRY_BLOCKS_COOKIE, colorObjects(shuffleColors(laundryBlockColors), laundryBlocks).toString());
    saveCookie(ROOM_BLOCKS_COOKIE, colorObjects(shuffleColors(roomColors), roomBlocks).toString());
    saveCookie(PEOPLE_COOKIE, colorObjects(shuffleColors(figureColors), persons).toString());
    selectedObject = null;
}
function load() {
    let lbasketCol = readCookie(LAUNDRY_BASKETS_COOKIE).split(",");
    let lblockCol = readCookie(LAUNDRY_BLOCKS_COOKIE).split(",");
    let rbCol = readCookie(ROOM_BLOCKS_COOKIE).split(",");
    let pCol = readCookie(PEOPLE_COOKIE).split(",");
    console.log(pCol);
    if (lbasketCol.length != laundryBaskets.length || lblockCol.length != laundryBlocks.length
        || rbCol.length != roomBlocks.length || pCol.length != persons.length) {
        generate();
    }
    else {
        colorObjects(lbasketCol, laundryBaskets);
        colorObjects(lblockCol, laundryBlocks);
        colorObjects(rbCol, roomBlocks);
        colorObjects(pCol, persons);
    }
}
function colorObjects(colors, objects) {
    if (colors.length !== objects.length) {
        return [];
    }
    for (let i = 0; i < colors.length; i++) {
        setColor(objects[i], colors[i]);
    }
    return colors;
}
function setColor(object, col) {
    object.style.backgroundColor = col;
    if (col === "transparent" || col === "rgba(0, 0, 0, 0)") {
        object.style.borderColor = "transparent";
    }
    else {
        object.style.borderColor = "#000";
    }
}
function shuffleColors(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
function manipulateObject(element, elements) {
    if (selectedObject == null) {
        if (element.style.backgroundColor !== "transparent") {
            selectedObject = element;
            selectedObject.style.borderColor = "#900";
        }
    }
    else {
        setColor(selectedObject, window.getComputedStyle(selectedObject).backgroundColor);
        if (arrayContains(elements, selectedObject)) {
            let temp1 = window.getComputedStyle(selectedObject).backgroundColor;
            setColor(selectedObject, window.getComputedStyle(element).backgroundColor);
            setColor(element, temp1);
        }
        selectedObject = null;
    }
}
function arrayContains(arr, val) {
    for (const arrElement of arr) {
        if (arrElement === val) {
            return true;
        }
    }
    return false;
}
function setOnclicksForManipulation() {
    for (const laundryBlock of laundryBlocks) {
        laundryBlock.onclick = function () {
            manipulateObject(laundryBlock, laundryBlocks);
        };
    }
    for (const laundryBasket of laundryBaskets) {
        laundryBasket.onclick = function () {
            manipulateObject(laundryBasket, laundryBaskets);
        };
    }
    for (const roomBlock of roomBlocks) {
        roomBlock.onclick = function () {
            manipulateObject(roomBlock, roomBlocks);
        };
    }
    for (const person of persons) {
        person.onclick = function () {
            manipulateObject(person, persons);
        };
    }
}
