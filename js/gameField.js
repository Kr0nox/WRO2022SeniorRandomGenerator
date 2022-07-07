const laundryBasketColors = ["#f00", "#202020", "#ff0"];
const laundryBlockColors = ["#f00", "#202020", "#ff0", "transparent"];
const roomColors = ["#fff", "#fff", "#008200", "#008200"]
const figureColors = ["#f00", "#ff0", "#008200", "#00f", "#202020", "#fff", "transparent", "transparent"];


let laundryBaskets = document.getElementsByClassName("LaundryBasket");
let laundryBlocks = document.getElementsByClassName("LaundryBlock");
let roomBlocks = document.getElementsByClassName("RoomBlock");
let persons = document.getElementsByClassName("Person");

function generate() {
    colorObjects(laundryBasketColors, laundryBaskets);
    colorObjects(laundryBlockColors, laundryBlocks);
    colorObjects(roomColors, roomBlocks);
    colorObjects(figureColors, persons);
}

function colorObjects(colors, objects) {
    if (colors.length !== objects.length) {
        return;
    }

    let objectColors = shuffleArray(colors);
    for (let i = 0; i < objectColors.length; i++) {
        setColor(objects[i], objectColors[i]);
    }
}

function setColor(object, col) {
    object.style.backgroundColor = col;
    if (col === "transparent" || col === "rgba(0, 0, 0, 0)") {
        object.style.borderColor = "transparent";
    } else {
        object.style.borderColor = "#000"
    }
}

function shuffleArray(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr
}

let selectedObject = null;

function manipulateObject(element, elements) {
    if (selectedObject == null) {
        selectedObject = element;
        selectedObject.style.borderColor = "#900";
    } else {
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
        }
    }

    for (const laundryBasket of laundryBaskets) {
        laundryBasket.onclick = function () {
            manipulateObject(laundryBasket, laundryBaskets);
        }
    }

    for (const roomBlock of roomBlocks) {
        roomBlock.onclick = function () {
            manipulateObject(roomBlock, roomBlocks);
        }
    }

    for (const person of persons) {
        person.onclick = function () {
            manipulateObject(person, persons);
        }
    }
}
