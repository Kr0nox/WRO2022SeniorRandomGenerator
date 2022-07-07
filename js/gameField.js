const laundryBasketColors = ["#f00", "#000", "#ff0"];
const laundryBlockColors = ["#f00", "#000", "#ff0", "-1"];
const roomColors = ["#fff", "#fff", "#008200", "#008200"]
const figureColors = ["#f00", "#ff0", "#008200", "#00f", "#000", "#fff", "-1", "-1"];


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
        if (objectColors[i] !== "-1") {
            objects[i].style.visibility = "visible";
            objects[i].style.backgroundColor = objectColors[i];
            console.log(i)
        } else {
            objects[i].style.visibility = "hidden";
        }
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