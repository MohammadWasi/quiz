(function(){
      const quizContainer = document.getElementById("quiz");
      const resultsContainer = document.getElementById("results");
      const submitButton = document.getElementById("submit");
      const showResult = document.getElementById("showResult");
      const nextButton = document.getElementById("next");
      let currentSlide = 0;
      const store = window.store;
      function makeQuestionsLayout() {
        const output = [];

        store.forEach((question, index) => {
          const answers = [];

          for (ans in question.answers) {
            answers.push(
              `<label>
                 <input type="radio" name="question${index}" value="${ans}">
                  ${ans} :
                  ${question.answers[ans]}
               </label>`
            );
          }

          output.push(
            `<div class="slide">
               <div class="question"> ${question.question} </div>
               <div class="answers"> ${answers.join("")} </div>
             </div>`
          );
        });
        quizContainer.innerHTML = output.join("");
      }
      makeQuestionsLayout();

      const slides = document.querySelectorAll(".slide");

      function showSlide(n) {
        slides[currentSlide].classList.remove("show");
        slides[n].classList.add("show");
        currentSlide = n;

        if (currentSlide === slides.length - 1) {
          showResult.style.display = "inline-block";
          nextButton.style.display = "none";
          submitButton.style.display = "none";
        }
      }

      showSlide(0);

      function checkAnswerSelected(){
        const answerContainers = quizContainer.querySelectorAll(".answers");
        let userAnswer;
        const answerContainer = answerContainers[currentSlide];
        const selector = `input[name=question${currentSlide}]:checked`;
        userAnswer = answerContainer.querySelector(selector);
        if (!userAnswer) {
          return false;
        }
        return true;
      }

      function submit() {
        if(this.id === 'next' && checkAnswerSelected()){
          return showSlide(currentSlide + 1);
        } else if(!checkAnswerSelected()){
          alert('please select an answer');
          return;
        }
    }

      function showResults() {
        const answerContainers = quizContainer.querySelectorAll(".answers");
        let result = 0;
        if(!checkAnswerSelected()){
          alert('please select an answer');
          return;
        }

        store.forEach((question, index) => {
          const answerContainer = answerContainers[index];
          const selector = `input[name=question${index}]:checked`;
          const userAnswer = (answerContainer.querySelector(selector) || {}).value;
          if (userAnswer === question.correctAnswer) {
            result++;}
        });
        resultsContainer.innerHTML = `${result} out of ${store.length}`;
      }

      submitButton.addEventListener("click", submit);
      showResult.addEventListener("click", showResults);
      nextButton.addEventListener("click", submit);

})();
