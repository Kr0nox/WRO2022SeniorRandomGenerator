const laundryBasketColors : string[] = ["#f00", "#202020", "#ff0"];
const laundryBlockColors: string[] = ["#f00", "#202020", "#ff0", "transparent"];
const roomColors: string[] = ["#fff", "#fff", "#008200", "#008200"]
const figureColors: string[] = ["#f00", "#ff0", "#008200", "#00f", "#202020", "#fff", "transparent", "transparent"];

const laundryBaskets : HTMLElement[] = document.getElementsByClassName("LaundryBasket") as unknown as HTMLElement[];
const laundryBlocks : HTMLElement[] = document.getElementsByClassName("LaundryBlock") as unknown as HTMLElement[];
const roomBlocks : HTMLElement[] = document.getElementsByClassName("RoomBlock") as unknown as HTMLElement[];
const persons : HTMLElement[] = document.getElementsByClassName("Person") as unknown as HTMLElement[];

let selectedObject : HTMLElement = null;

generate();
setOnclicksForManipulation();

function generate() : void {
    colorObjects(laundryBasketColors, laundryBaskets);
    colorObjects(laundryBlockColors, laundryBlocks);
    colorObjects(roomColors, roomBlocks);
    colorObjects(figureColors, persons);
    selectedObject = null;
}

function colorObjects(colors:string[], objects:HTMLElement[]) : void {
    if (colors.length !== objects.length) {
        return;
    }

    let objectColors = shuffleColors(colors);
    for (let i = 0; i < objectColors.length; i++) {
        setColor(objects[i], objectColors[i]);
    }
}

function setColor(object:HTMLElement, col:string) : void {
    object.style.backgroundColor = col;
    if (col === "transparent" || col === "rgba(0, 0, 0, 0)") {
        object.style.borderColor = "transparent";
    } else {
        object.style.borderColor = "#000"
    }
}

function shuffleColors(array:string[]) : string[] {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function manipulateObject(element:HTMLElement, elements:HTMLElement[]) : void {
    if (selectedObject == null) {
        selectedObject = element;
        selectedObject.style.borderColor = "#900";
    } else {
        setColor(selectedObject, window.getComputedStyle(selectedObject).backgroundColor);

        if (arrayContains<HTMLElement>(elements, selectedObject)) {
            let temp1 = window.getComputedStyle(selectedObject).backgroundColor;
            setColor(selectedObject, window.getComputedStyle(element).backgroundColor);
            setColor(element, temp1);
        }

        selectedObject = null;
    }
}

function arrayContains<T>(arr:T[], val:T) : boolean {
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
