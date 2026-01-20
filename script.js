function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let array = [];
const container = document.getElementById("array-container");

function generateArray() {
    container.innerHTML = "";
    array = [];

    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 200) + 20;
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        container.appendChild(bar);
    }
}

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";

            await new Promise(resolve => setTimeout(resolve, 100));

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].style.background = "#38bdf8";
            bars[j + 1].style.background = "#38bdf8";
        }
    }
}

function start() {
    const algo = document.getElementById("algorithm").value;

    if (algo === "bubble") {
        bubbleSort();
    } else if (algo === "quick") {
        quickSort(0, array.length - 1);
    } else if (algo === "merge") {
        mergeSort(0, array.length - 1);
    }
}



async function partition(low, high) {
    let bars = document.getElementsByClassName("bar");
    let pivot = array[high];
    let i = low - 1;

    bars[high].style.background = "yellow"; // pivot

    for (let j = low; j < high; j++) {
        bars[j].style.background = "red";
        await sleep(100);

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];

            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;
        }

        bars[j].style.background = "#38bdf8";
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[high].style.height = `${array[high]}px`;

    bars[high].style.background = "#38bdf8";
    bars[i + 1].style.background = "green"; // sorted position

    return i + 1;
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function merge(left, mid, right) {
    let bars = document.getElementsByClassName("bar");

    let n1 = mid - left + 1;
    let n2 = right - mid;

    let leftArr = [];
    let rightArr = [];

    for (let i = 0; i < n1; i++) leftArr.push(array[left + i]);
    for (let j = 0; j < n2; j++) rightArr.push(array[mid + 1 + j]);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        bars[k].style.background = "red";
        await sleep(100);

        if (leftArr[i] <= rightArr[j]) {
            array[k] = leftArr[i];
            bars[k].style.height = `${leftArr[i]}px`;
            i++;
        } else {
            array[k] = rightArr[j];
            bars[k].style.height = `${rightArr[j]}px`;
            j++;
        }

        bars[k].style.background = "#38bdf8";
        k++;
    }

    while (i < n1) {
        bars[k].style.background = "red";
        await sleep(100);

        array[k] = leftArr[i];
        bars[k].style.height = `${leftArr[i]}px`;
        bars[k].style.background = "#38bdf8";
        i++;
        k++;
    }

    while (j < n2) {
        bars[k].style.background = "red";
        await sleep(100);

        array[k] = rightArr[j];
        bars[k].style.height = `${rightArr[j]}px`;
        bars[k].style.background = "#38bdf8";
        j++;
        k++;
    }
}

async function mergeSort(left, right) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);

    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
}
