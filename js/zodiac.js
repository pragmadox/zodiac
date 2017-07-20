var objArray = [
	{eng: "chicken", chin: "ji", pin: "ji&#772;" },
	{eng: "cow", chin: "niu", pin: "niu&#769;" },
	{eng: "dog", chin: "gou", pin: "gou&#780;" },
	{eng: "dragon", chin: "long", pin: "lo&#769;" },
	{eng: "goat", chin: "yang", pin: "ya&#769;ng" },
	{eng: "horse", chin: "ma", pin: "ma&#780;" },
	{eng: "monkey", chin: "hou", pin: "ho&#769;uzi" },
	{eng: "pig", chin: "zhu", pin: "zhu&#772;" },
	{eng: "rabbit", chin: "tu", pin: "tu&#768;zi" },
	{eng: "rat", chin: "shu", pin: "la&#780;oshu&#780;" },
	{eng: "snake", chin: "she", pin: "she&#769;" },
	{eng: "tiger", chin: "hu", pin: "la&#780;ohu&#780;" }
];

var i;

var stringArray = [];

var rightDiv = document.getElementById("rightDiv");
var leftDiv = document.getElementById("leftDiv");
var largeImage = document.getElementById("largeImage");
var feedback = document.getElementById("feedback");
var chinCharDiv = document.getElementById("chinCharDiv");
var chinCharPic = document.getElementById("chinCharPic");
var modeButton = document.getElementById("quiz");
var repeat = document.getElementById("repeat");
var animals = document.getElementsByClassName("animals");

var sound = new Audio();
var randomSound = new Audio();
var mode = "teach";
var randomID = "";

//Keeping track of the score during the quiz.
var clicks = 0;
var rawScore = 0;
var avgScore = 0;

/* Spin that image around and around forever. */
function spin() {
	largeImage.style.transform += "rotate(0.1deg)";
	setInterval(spin, 40);
}

/* Stop the image from spinning */
function stopSpinning() {
	largeImage.style.transform = "none";
}

function playAgain() {
	randomSound.pause();
	randomSound.play();
}

function loadRandom() {
	var randomInteger = Math.floor(Math.random() * stringArray.length);
	return randomInteger;
}

function playRandom() {
	stopSpinning();
	feedback.innerHTML += "<br> What animal name <br> did I just say in Chinese?";
	randomSound.pause();
	var randomNum = loadRandom();
	randomID = stringArray[randomNum];
	var randomElement = document.getElementById(randomID);
	randomSound = randomElement.chinRec;
	randomSound.play();
	chinCharDiv.style.display = "block";
	chinCharPic.src = randomElement.chinChar.src;
}

function toggleMode() {
	if (mode === "quiz") { //Turn Off Quiz Mode
		mode = "teach";
		modeButton.innerHTML = "Quiz Me"; //Change the button
		repeat.style.display = "none";
		init();
	}	else if (mode === "teach") {
			mode = "quiz";
			sound.pause();
			modeButton.innerHTML = "Teach Me";
			largeImage.style.display = "none";
			repeat.style.display = "block";
			feedback.innerHTML = "";
			playRandom();
	}
}

function swapPicOrQuiz() {
	//Enter Quiz Mode.
	if (mode === "quiz") {
		feedback.innerHTML = "";
		if (randomID === this.id) { //Clicking correct animal
			if(stringArray.length > 1) {
				clicks++;
				rawScore++;
				avgScore = ((rawScore/clicks)*100).toFixed(1);

				this.style.display = "none"; //Don't show the thumb anymore
				var index = stringArray.indexOf(this.id); //Figure out which element.
				stringArray.splice(index, 1); //Drop that element from the array.
				feedback.innerHTML = this.id + " - " + this.pin + "<br>Great Job. <br> There are " + stringArray.length + " animals left."; //Give feedback
				feedback.innerHTML += "<br> Your score so far is: " + avgScore + "%";
				playRandom();
			} else {
					clicks++;
					rawScore++;
					avgScore = ((rawScore/clicks)*100).toFixed(1);

					this.style.display = "none"; //Don't show the thumb anymore
					feedback.innerHTML = this.id + " - " + this.pin + "<br>Great Job." + "<br> You finished the quiz!"; //Give feedback
					feedback.innerHTML += "<br> Your final score is: " + avgScore + "%";
					var delay = setTimeout(toggleMode, 1000);
			}
		}	else if (randomID !== this.id) {
				feedback.innerHTML = "Sorry, That's Incorrect";
				clicks++;
				avgScore = ((rawScore/clicks)*100).toFixed(1);
			
				feedback.innerHTML += "<br> Your score has dropped to: " + avgScore + "%";
		}
	} else if (mode === "teach") {
			//Play the sound
			sound.pause();
			sound = this.engRec;
			sound.play();

			//Display a large Image
			stopSpinning();
			largeImage.src = this.src;
			largeImage.style.display = "inline-block";

			//Display the Chinese Character in the AP Div
			chinCharPic.src = this.chinChar.src;
			chinCharDiv.style.display = "block";

			//Display the English and Pinyin
			feedback.innerHTML = this.eng + " - " + this.pin;
	}
}

function reinitialize() {
	for (i = 0; i < objArray.length; i++) {
		stringArray[i] = objArray[i].eng;
	}
}

function init() {
	stringArray = [];
	reinitialize();
	largeImage.src = 'images/zodiac-animal-wheel.png';
	largeImage.style.display = "inline-block";
	feedback.innerHTML = "";
	spin();
	chinCharDiv.style.display = "none";
	
	for (i = 0; i < objArray.length; i++) {
		var thisElement = document.getElementById(stringArray[i]);
		var engRecording = new Audio();
		var chinRecording = new Audio();
		var chinChar = new Image();
		engRecording.src = "audio/" + objArray[i].eng + ".mp3";
		chinRecording.src = "audio/" + objArray[i].chin + ".mp3";
		chinChar.src = "images/char-" + objArray[i].chin + ".jpg";
		thisElement.src = "images/" + objArray[i].eng + ".jpg";
		thisElement.chinChar = chinChar;
		thisElement.engRec = engRecording;
		thisElement.chinRec = chinRecording;
		thisElement.eng = objArray[i].eng;
		thisElement.pin = objArray[i].pin;
		thisElement.chin = objArray[i].chin;
		thisElement.addEventListener("click", swapPicOrQuiz);
		thisElement.style.display = "inline-block";
	}
}

init();

modeButton.addEventListener("click", toggleMode);
repeat.addEventListener("click", playAgain);




