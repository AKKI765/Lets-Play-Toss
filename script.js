console.log("JavaScript Running");

// Modal elements
const resultModal = document.getElementById('resultModal');
const resultImage1 = document.getElementById('resultImage1');
const resultImage2 = document.getElementById('resultImage2');
const resultText = document.getElementById('resultText');
const closeModal = document.querySelector('.close');
let imageNameP1 = document.getElementById('imageNameP1');
let imageNameP2 = document.getElementById('imageNameP2');

// Coin flip sound
const coinFlipSound = document.getElementById('coinFlipSound');

// Player Images and Names
document.addEventListener('DOMContentLoaded', () => {
    let imageFolder = 'superhero';
    let imageDropdown = document.getElementById('imageDropdown');
    let displayedImage = document.getElementById('displayedImage');
    let imageName = document.getElementById('imageName');

    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            const images = data.images;

            images.forEach(image => {
                const option = document.createElement('option');
                option.value = `${imageFolder}/${image}`;
                option.textContent = image;
                imageDropdown.appendChild(option);
            });

            imageDropdown.addEventListener('change', () => {
                const selectedImage = imageDropdown.value;
                if (selectedImage) {
                    displayedImage.src = selectedImage;
                    displayedImage.style.display = 'block';
                    const imageNameText = imageDropdown.options[imageDropdown.selectedIndex].text;
                    imageName.textContent = imageNameText.substring(0, imageNameText.lastIndexOf('.')).toUpperCase();
                    imageName.style.display = 'block';
                } else {
                    displayedImage.style.display = 'none';
                    imageName.style.display = 'none';
                }
            });
        })
        .catch(error => console.error('Error fetching images:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    let imageFolder2 = 'superhero';
    let imageDropdown2 = document.getElementById('imageDropdown2');
    let displayedImage2 = document.getElementById('displayedImage2');
    let imageName2 = document.getElementById('imageName2');

    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            const images = data.images;

            images.forEach(image => {
                const option = document.createElement('option');
                option.value = `${imageFolder2}/${image}`;
                option.textContent = image;
                imageDropdown2.appendChild(option);
            });

            imageDropdown2.addEventListener('change', () => {
                const selectedImage = imageDropdown2.value;
                if (selectedImage) {
                    displayedImage2.src = selectedImage;
                    displayedImage2.style.display = 'block';
                    const imageNameText = imageDropdown2.options[imageDropdown2.selectedIndex].text;
                    imageName2.textContent = imageNameText.substring(0, imageNameText.lastIndexOf('.')).toUpperCase();
                    imageName2.style.display = 'block';
                } else {
                    displayedImage2.style.display = 'none';
                    imageName2.style.display = 'none';
                }
            });
        })
        .catch(error => console.error('Error fetching images:', error));
});

// Coin Flipping, Head Points, Tail Points and Total Points For Result (Winner or Draw)
let headP1 = 0;
let tailP1 = 0;
let headP2 = 0;
let tailP2 = 0;
let totalFlips = 0;
let flipCount1 = 0;
let flipCount2 = 0;
let section = 1;
let total1;
let total2;

let totalPointsP1 = 0;
let totalPointsP2 = 0;

const flipCountInput = document.getElementById("flipCountInput");
const clikCoinButton = document.getElementById("coinButton");
const resetButton = document.getElementById("resetButton");
const coinElement = document.querySelector(".coin");
const coinDetail = document.querySelector(".coinDetail");
const coinPoints1 = document.querySelector(".coinNum1");
const coinPoints2 = document.querySelector(".coinNum2");

clikCoinButton.addEventListener("click", async (e) => {

    coinFlipSound.play(); 

    if (totalFlips === 0) {
        totalFlips = parseInt(flipCountInput.value, 10);
        if (isNaN(totalFlips) || totalFlips <= 0) {
            alert("Please enter a valid number of flips and click on Start New Game.");
            return;
        }
        flipCount1 = 0;
        flipCount2 = 0;
        headP1 = 0;
        tailP1 = 0;
        headP2 = 0;
        tailP2 = 0;
        coinPoints1.innerHTML = '';
        coinPoints2.innerHTML = '';
        coinDetail.innerHTML = '';
        clikCoinButton.disabled = false;
        resetButton.style.display = 'none';
    }

    if (section === 1) {
        if (flipCount1 >= totalFlips) {
            section = 2;
            coinDetail.innerHTML = `<h2>PLAYER 1 completed. Switching to PLAYER 2.</h2>`;
            return;
        }

        coinDetail.innerHTML = '';
        let num = Math.floor(Math.random() * 100);
        console.log(num);

        coinElement.style.animation = 'none';
        coinElement.offsetWidth;
        coinElement.style.animation = '';
        coinElement.style.animationIterationCount = "10";

        if (num < 50) {
            console.log("It's HEAD");
            coinElement.style.transform = "rotateY(0deg)";
            headP1 += 2;
            setTimeout(() => {
                total1 = headP1 + tailP1;
                const flipsLeft = totalFlips - flipCount1;
                coinDetail.innerHTML = `<h1>OHH!!! It's A Head</h1>`;
                coinPoints1.innerHTML = `<h5>Heads: ${headP1}</h5>
                                         <h5>Tails: ${tailP1}</h5>
                                         <h5>Points: ${total1}</h5>
                                         <h5>Flips left: ${flipsLeft}</h5>`;
                totalPointsP1 = total1;
                console.log("total=" + totalPointsP1);
            }, 2100);
        } else {
            console.log("It's TAIL");
            coinElement.style.transform = "rotateY(180deg)";
            tailP1 += 1;
            setTimeout(() => {
                total1 = headP1 + tailP1;
                const flipsLeft = totalFlips - flipCount1;
                coinDetail.innerHTML = `<h1>OHH!!! It's A Tail</h1>`;
                coinPoints1.innerHTML = `<h5>Heads: ${headP1}</h5>
                                         <h5>Tails: ${tailP1}</h5>
                                         <h5>Points: ${total1}</h5>
                                         <h5>Flips left: ${flipsLeft}</h5>`;
                totalPointsP1 = total1;
                console.log("total=" + totalPointsP1);
            }, 2100);
        }

        flipCount1++;
    } else if (section === 2) {
        if (flipCount1 < totalFlips) {
            coinDetail.innerHTML = 'Please complete PLAYER 1 FLIPS';
            return;
        }

        if (flipCount2 >= totalFlips) {
            coinDetail.innerHTML = '';
            clikCoinButton.disabled = true;
            resetButton.style.display = 'inline';

            // Determine winner and show result modal
            if (totalPointsP1 > totalPointsP2) {
                resultImage1.src = imageDropdown.value;
                resultImage2.style.display = 'none';
                resultText.textContent = 'Player 1 Won';
                const imageNameText = imageDropdown.options[imageDropdown.selectedIndex].text;
                imageNameP1.textContent = imageNameText.substring(0, imageNameText.lastIndexOf('.')).toUpperCase();
                imageNameP2.textContent = ''; 
                coinDetail.innerHTML = `<h2>PLAYER 1  ${imageNameP1.textContent} WON </h2> `;
            } else if (totalPointsP1 < totalPointsP2) {
                resultImage1.src = imageDropdown2.value;
                resultImage2.style.display = 'none'; 
                resultText.textContent = 'Player 2 Won';
                const imageNameText = imageDropdown2.options[imageDropdown2.selectedIndex].text;
                imageNameP1.textContent = ''; 
                imageNameP2.textContent = imageNameText.substring(0, imageNameText.lastIndexOf('.')).toUpperCase();
                coinDetail.innerHTML = `<h2>PLAYER 2  ${imageNameP2.textContent} WON </h2>`;
            } else {
                resultImage1.src = imageDropdown.value;
                resultImage2.src = imageDropdown2.value;
                resultImage2.style.display = 'block'; 
                resultText.textContent = 'Draw';
                const imageNameText1 = imageDropdown.options[imageDropdown.selectedIndex].text;
                const imageNameText2 = imageDropdown2.options[imageDropdown2.selectedIndex].text;
                imageNameP1.textContent = imageNameText1.substring(0, imageNameText1.lastIndexOf('.')).toUpperCase();
                imageNameP2.textContent = imageNameText2.substring(0, imageNameText2.lastIndexOf('.')).toUpperCase();
                coinDetail.innerHTML = "<h1> IT'S A DRAW !!!!</h1>";
            }

            // Display the modal
            resultModal.style.display = 'block';
            return;
        }

        coinDetail.innerHTML = '';
        let num = Math.floor(Math.random() * 100);
        console.log(num);

        coinElement.style.animation = 'none';
        coinElement.offsetWidth;
        coinElement.style.animation = '';
        coinElement.style.animationIterationCount = "10";

        if (num < 50) {
            console.log("It's HEAD");
            coinElement.style.transform = "rotateY(0deg)";
            headP2 += 2;
            setTimeout(() => {
                total2 = headP2 + tailP2;
                const flipsLeft = totalFlips - flipCount2;
                coinDetail.innerHTML = `<h1>OHH!!! It's A Head</h1>`;
                coinPoints2.innerHTML = `<h5>Heads: ${headP2}</h5>
                                         <h5>Tails: ${tailP2}</h5>
                                         <h5>Points: ${total2}</h5>
                                         <h5>Flips left: ${flipsLeft}</h5>`;
                totalPointsP2 = total2;
                console.log("total=" + totalPointsP2);
            }, 2100);
        } else {
            console.log("It's TAIL");
            coinElement.style.transform = "rotateY(180deg)";
            tailP2 += 1;
            setTimeout(() => {
                total2 = headP2 + tailP2;
                const flipsLeft = totalFlips - flipCount2;
                coinDetail.innerHTML = `<h1>OHH!!! It's A Tail</h1>`;
                coinPoints2.innerHTML = `<h5>Heads: ${headP2}</h5>
                                         <h5>Tails: ${tailP2}</h5>
                                         <h5>Points: ${total2}</h5>
                                         <h5>Flips left: ${flipsLeft}</h5>`;
                totalPointsP2 = total2;
                console.log("total=" + totalPointsP2);
            }, 2100);
        }

        flipCount2++;
    }
});

// Close modal
closeModal.addEventListener('click', () => {
    resultModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === resultModal) {
        resultModal.style.display = 'none';
    }
});

resetButton.addEventListener("click", () => {
    // Reset the game
    totalFlips = 0;
    flipCount1 = 0;
    flipCount2 = 0;
    section = 1;
    headP1 = 0;
    tailP1 = 0;
    headP2 = 0;
    tailP2 = 0;
    coinPoints1.innerHTML = '';
    coinPoints2.innerHTML = '';
    coinPoints1.innerHTML = `<h5>Heads:0</h5>
                    <h5>Tails:0</h5>
                    <h5>Points:0</h5>
                    <h5>Flips Left:</h5>`;
    coinPoints2.innerHTML = `<h5>Heads:0</h5>
                    <h5>Tails:0</h5>
                    <h5>Points:0</h5>
                    <h5>Flips Left:</h5>`;
    coinDetail.innerHTML = '';
    clikCoinButton.disabled = false;
    resetButton.style.display = 'none';
});

function getRandomColor() {
   
     const min = 10; 
     const max = 230; 
 
     const r = Math.floor(Math.random() * (max - min + 1)) + min;
     const g = Math.floor(Math.random() * (max - min + 1)) + min;
     const b = Math.floor(Math.random() * (max - min + 1)) + min;
 
     return `rgb(${r}, ${g}, ${b})`;
}

// Function to change the background color of the element
function changeColorP1() {
    const colorBox1 = document.getElementById('colorBox1');
    const randomColor = getRandomColor();
    colorBox1.style.backgroundColor = randomColor;
}

function changeColorP2() {
    const colorBox2 = document.getElementById('colorBox2');
    const randomColor = getRandomColor();
    colorBox2.style.backgroundColor = randomColor;
}

function changeColorModal() {
    const colorBoxModal = document.querySelector(".modal-content");
    const randomColor = getRandomColor();
    colorBoxModal.style.backgroundColor = randomColor;
}


setInterval(changeColorP1, 3000);
setInterval(changeColorP2, 3000);

changeColorP1();
changeColorP2();
changeColorModal();
