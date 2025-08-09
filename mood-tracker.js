document.addEventListener("DOMContentLoaded", () => {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const grid = document.getElementById('mood-grid');
  const gifContainer = document.getElementById('gif-container');

  const moods = [
    { color: '#FFF5B7', label: 'good' },
    { color: '#FCD5CE', label: 'loved' },
    { color: '#C3DDFD', label: 'rough' },
    { color: '#E6E6FA', label: 'calm' },
    { color: '#FFDACC', label: 'social' },
    { color: '#C4F1F9', label: 'focused' },
    { color: '#D3D3D3', label: 'meh' },
    { color: '#FFC0CB', label: 'awesome' }
  ];

  const gifURL = "https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif";

  function getWeekKey() {
    const date = new Date();
    const onejan = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    return `mood-week-${week}-${date.getFullYear()}`;
  }

  const weekKey = getWeekKey();
  let moodData = JSON.parse(localStorage.getItem(weekKey)) || {};

  function saveMood(day, color) {
    moodData[day] = color;
    localStorage.setItem(weekKey, JSON.stringify(moodData));
  }

  function showGif() {
    gifContainer.innerHTML = `<img src="${gifURL}" style="height: 80px;">`;
    setTimeout(() => {
      gifContainer.innerHTML = '';
    }, 4000);
  }

  function createGrid() {
    days.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'day-cell';
      cell.dataset.day = day;

      const label = document.createElement('div');
      label.className = 'day-label';
      label.textContent = day;
      cell.appendChild(label);

      if (moodData[day]) {
        cell.style.backgroundColor = moodData[day];
        if (moodData[day] === '#FFC0CB') showGif();
      }

      cell.addEventListener('click', () => {
        // Remove any existing mood menus
        const existingMenus = document.querySelectorAll('.mood-menu');
        existingMenus.forEach(menu => menu.remove());

        const menu = document.createElement('div');
        menu.className = 'mood-menu';

        moods.forEach(mood => {
          const option = document.createElement('div');
          option.className = 'mood-option';

          const colorCircle = document.createElement('div');
          colorCircle.className = 'mood-color';
          colorCircle.style.backgroundColor = mood.color;

          const moodLabel = document.createElement('span');
          moodLabel.textContent = mood.label;

          option.appendChild(colorCircle);
          option.appendChild(moodLabel);

          option.addEventListener('click', (e) => {
            e.stopPropagation();
            cell.style.backgroundColor = mood.color;
            saveMood(day, mood.color);
            if (mood.label === 'awesome') showGif();
            menu.remove();
          });

          menu.appendChild(option);
        });

        cell.appendChild(menu);
      });

      grid.appendChild(cell);
    });
  }

  createGrid();
});
