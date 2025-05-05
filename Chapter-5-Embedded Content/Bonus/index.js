document.querySelectorAll('.sample-button').forEach(button => {
    button.addEventListener('click', () => {
      const audio = new Audio(button.getAttribute('data-audio'));
      audio.play();
    });
  });
  