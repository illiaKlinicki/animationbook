$(document).ready(function () {
  var Windowisshown = 0;
  $('.container').append(
    pages.map(({chapter, text}) => {
      const template = `
        <div class="page">
          <h2 class="page__title animate__animated ">${chapter}</h2>
          ${text.map((value) => `<p class="page__text">${value}</p>`).join(' ')}
        </div>`;
      return template;
    })
  );

  const animateObserver = new IntersectionObserver(function (
    entries,
    animateObserver
  ) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__rubberBand');
      } else {
        entry.target.classList.remove('animate__rubberBand');
      }
    });
  },
  {});

  document.querySelectorAll('.page__title').forEach((node) => {
    animateObserver.observe(node);
  });

  $('.container').slick({
    adaptiveHeight: true,
    speed: 1000,
  });
  window.onscroll = function () {
    
    let windowHeight =
        document.body.scrollTop || document.documentElement.scrollTop,
      documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight,
      scrolled = (windowHeight / documentHeight) * 100;
    if (scrolled === 100 && Windowisshown !==1) {
      console.log('yikes');
      Windowisshown = 1;
      $('body').append(() => {
        // const screen = document.createElement('div');
        // const innerContainer = document.createElement('div');
        // screen.className = 'chapterEndScreen';
        // const keppReadingBtn = document.createElement('button');
        // keppReadingBtn.className = 'chapterEndScreen__keepReading';
        // keppReadingBtn.innerText = 'Продолжить чтение';
        // innerContainer.appendChild();
        return `
          <div class='chapterEndScreen'>
          <div class="chapterEndScreen__overlay"></div>          
         
            <div class='modal'>
            <span class='chapterEndScreen__icon'>🐯</span>
            <p class='chapterEndScreen__title'>Jesteś silny jako lwiątko! Dobra robota, mój drogi przyjacielu!</p>
            <div class='innerContainer'>
              <button class='chapterEndScreen__timeout' onclick="handleClick()">Zrób sobie przerwę</button>
              <button class='chapterEndScreen__keepReading' onclick="handleClick()"> 
                Kontynuuj czytanie
              </button>
            </div>
        </div>
          </div>
          `;
      });
    } else {
      $('.chapterEndScreen').remove();
    }
  };
});
