document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById('quizForm');
    const resetButton = document.getElementById('resetQuiz');
    const resultsSection = document.getElementById('results');
    const overallResult = document.getElementById('overallResult');
    const totalScore = document.getElementById('totalScore');
    const questionResults = document.getElementById('questionResults');

    const answerKey = {
        q1: 'blink',
        q2: 'B',
        q3: 'C',
        q4: 'C',
        q5: ['A', 'B', 'D']
    };

    const answerText = {
        q1: 'Blink',
        q2: 'DNS',
        q3: 'V8',
        q4: 'It limits what webpages can access.',
        q5: 'A, B, and D'
    };

    function getCheckedValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(function (item) {
            return item.value;
        });
    }

    quizForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const userAnswers = {
            q1: document.getElementById('q1').value.trim().toLowerCase(),
            q2: document.querySelector('input[name="q2"]:checked')?.value || '',
            q3: document.querySelector('input[name="q3"]:checked')?.value || '',
            q4: document.querySelector('input[name="q4"]:checked')?.value || '',
            q5: getCheckedValues('q5').sort()
        };

        const results = [];
        let score = 0;
        const totalQuestions = 5;
        const q1Correct = userAnswers.q1 === answerKey.q1;
        results.push({
            number: 1,
            correct: q1Correct,
            userAnswer: userAnswers.q1 || 'No answer',
            correctAnswer: answerText.q1,
            points: q1Correct ? 1 : 0
        });
        if (q1Correct) score += 1;

        ['q2', 'q3', 'q4'].forEach(function (questionName, index) {
            const isCorrect = userAnswers[questionName] === answerKey[questionName];
            results.push({
                number: index + 2,
                correct: isCorrect,
                userAnswer: userAnswers[questionName] || 'No answer',
                correctAnswer: answerText[questionName],
                points: isCorrect ? 1 : 0
            });
            if (isCorrect) score += 1;
        });

        const q5Correct = JSON.stringify(userAnswers.q5) === JSON.stringify(answerKey.q5);
        results.push({
            number: 5,
            correct: q5Correct,
            userAnswer: userAnswers.q5.length ? userAnswers.q5.join(', ') : 'No answer',
            correctAnswer: answerText.q5,
            points: q5Correct ? 1 : 0
        });
        if (q5Correct) score += 1;

        const passed = score >= 4;
        resultsSection.classList.remove('hidden');
        overallResult.textContent = passed ? 'Overall Result: Pass' : 'Overall Result: Fail';
        overallResult.className = passed ? 'pass' : 'fail';
        totalScore.textContent = `Total Score: ${score} / ${totalQuestions}`;
        totalScore.className = passed ? 'pass' : 'fail';
        questionResults.innerHTML = '';
        results.forEach(function (item) {
            const block = document.createElement('div');
            block.className = `result-item ${item.correct ? 'correct' : 'incorrect'}`;
            block.innerHTML = `
                <h3>Question ${item.number}</h3>
                <p><strong>Score:</strong> ${item.points} / 1</p>
                <p><strong>Result:</strong> ${item.correct ? 'Correct' : 'Incorrect'}</p>
                <p><strong>Your Answer:</strong> ${item.userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${item.correctAnswer}</p>
            `;
            questionResults.appendChild(block);
        });
    });

    resetButton.addEventListener('click', function () {
        quizForm.reset();
        resultsSection.classList.add('hidden');
        overallResult.textContent = '';
        totalScore.textContent = '';
        questionResults.innerHTML = '';
        document.getElementById('q1').focus();
    });
});
