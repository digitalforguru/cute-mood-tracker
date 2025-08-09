document.addEventListener("DOMContentLoaded", () => {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const grid = document.getElementById('mood-grid');
  const widgetBox = document.getElementById('widget-box');
  const gifURL = "https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif";

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

  function getWeekKey() {
    const date = new Date();
    const onejan = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    return `mood-week-${week}-${date.getFullYear()}`;
  }

  const weekKey = getWeekKey();
  let moodData = JSON.parse(localStorage.getItem(weekKey)) || {};

  function saveMood(day, value) {
    moodData[day] = value;
    localStorage.setItem(weekKey, JSON.stringify(moodData));
  }

  function createGrid() {
    days.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'day-cell';
      cell.dataset.day = day;

      if (moodData[day]) {
        if (moodData[day] === 'awesome-gif') {
          cell.innerHTML = `<img src="${gifURL}" style="width: 100%; height: 100%; border-radius: 8px;">`;
        } else {
          cell.style.backgroundColor = moodData[day];
        }
      } else {
        const label = document.createElement('div');
        label.className = 'day-label';
        label.textContent = day;
        cell.appendChild(label);
      }

      cell.addEventListener('click', () => {
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

          const label = document.createElement('span');
          label.textContent = mood.label;

          option.appendChild(colorCircle);
          option.appendChild(label);

          option.addEventListener('click', (e) => {
            e.stopPropagation();
            cell.innerHTML = '';

            if (mood.label === 'awesome') {
              cell.innerHTML = `<img src="${gifURL}" style="width: 100%; height: 100%; border-radius: 8px;">`;
              saveMood(day, 'awesome-gif');
            } else {
              const label = document.createElement('div');
              label.className = 'day-label';
              label.textContent = day;
              cell.appendChild(label);
              cell.style.backgroundColor = mood.color;
              saveMood(day, mood.color);
            }

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

  // Theme Picker Logic
  const themePicker = document.getElementById("theme-picker");
  const savedTheme = localStorage.getItem("selected-theme") || "pink";

  widgetBox.classList.add(`theme-${savedTheme}`);
  themePicker.value = savedTheme;

  themePicker.addEventListener("change", () => {
    const selected = themePicker.value;
    widgetBox.className = 'widget';
    widgetBox.classList.add(`theme-${selected}`);
    localStorage.setItem("selected-theme", selected);
  });
});

