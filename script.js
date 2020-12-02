const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById
('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById
('answer-buttons');
const hits = document.getElementById('correct-answers');

let correctAnswers ;//
 
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++;
	setNextQuestion();
})

function startGame() {
	correctAnswers = 0;
	startButton.classList.add('hide');
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);//sorts a question based on the no.(+ve or -ve)
	currentQuestionIndex = 0 ;
	questionContainerElement.classList.remove('hide');
	setNextQuestion()
}

function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
} 

function showQuestion(question) {
	questionElement.innerText = question.question; // shows a random ques. 
	question.answers.forEach( answer => {  
		const button = document.createElement('button');//create a button for each answer 
		button.innerText = answer.text; //populate the answer feild
		button.classList.add('btn'); 
		if(answer.correct){
			button.dataset.correct = answer.correct; // adds a property to the button if it is correct
		}
		button.addEventListener('click', selectAnswer);
		answerButtonsElement.appendChild(button);
	})
}

function resetState() {
	clearStatusClass(document.body); // clear status class of the body 
	nextButton.classList.add('hide');
	hits.classList.add('hide');
	while(answerButtonsElement.firstChild){
		answerButtonsElement.removeChild
		(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {
	const selectedButton = e.target;  // returns the element (button) on which the event (click) occured
	const correct = selectedButton.dataset.correct; // stores the value (T/F) of key 'correct'
	if(correct){
		correctAnswers++;
	}
	setStatusClass(document.body, correct); //set status class for body element
	Array.from(answerButtonsElement.children).forEach(button =>{ //form an array of answer buttons
		setStatusClass(button, button.dataset.correct); //set status class for each button
	})
	nextButton.classList.remove('hide');
	
	if(shuffledQuestions.length > currentQuestionIndex +1)//show next button if there are more ques.
	{
		nextButton.classList.remove('hide');
	}
	else{
		nextButton.classList.add('hide');
		startButton.innerText = 'Restart';
		startButton.classList.remove('hide');
		hits.innerText =`You got ${correctAnswers} correct!`;
		hits.classList.remove('hide');
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element);
	if(correct){
		//correctAnswers++;
		element.classList.add('correct');
	}
	else{
		element.classList.add('wrong');
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct');
	element.classList.remove('wrong');
}

const questions = [
	{
		question: 'What is the square of 4 ?',
		answers: [
			{ text: '16', correct: true  },
			{ text: '20', correct: false }
		]
	},
	{
		question: 'Which of these is the capital of India?',
		answers: [
			{ text: 'Mumbai', correct: false },
			{ text: 'Delhi', correct: true },
			{ text: 'Punjab', correct: false },
			{ text: 'Goa', correct: false },
		]
		
	},
	{
		question: 'What is the complexity of binary search?',
		answers: [
			{ text: 'O(n)', correct: false },
			{ text: 'O(logn)', correct: true },
			{ text: 'O(n^2)', correct: false },
			{ text: 'O(nlogn)', correct: false },
		]
		
	},
]