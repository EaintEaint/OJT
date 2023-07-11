 const toggleContents = (event) => {
    const clickedQuestion = event.currentTarget;
    const content = clickedQuestion.querySelector('.content');

    if (content.style.display === 'none') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  };

  const questions = document.querySelectorAll('.question');
  questions.forEach((question) => {
    question.addEventListener('click', toggleContents);
  });
