document.addEventListener("DOMContentLoaded", () => {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const grid = document.getElementById('mood-grid');
  const widgetBox = document.getElementById('widget-box');
  const gifURL = "https://i.pinimg.com/originals/9e/04/6b/9e046bd40cd5e178205311426057de98.gif";

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

      const label = document.createElement('div');
      label.className = 'day-label';
      label.textContent = day;
      cell.appendChild(label);

      const content = document.createElement('div');
      content.className = 'day-content';

      if (moodData[day]) {
        if (moodData[day] === 'awesome-gif') {
          content.innerHTML = `<img src="${gifURL}" style="width: 100%; height: 100%; border-radius: 8px;">`;
        } else {
          content.style.backgroundColor = moodData[day];
        }
      }

      cell.appendChild(content);

      cell.addEventListener('click', () => {
        // Remove any existing mood menus
        const existingMenus = document.querySelectorAll('.mood-menu');
        existingMenus.forEach(menu => menu.remove());

        // Create the popup menu
        const menu = document.createElement('div');
        menu.className = 'mood-menu';

        // Add mood options
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

            if (mood.label === 'awesome') {
              content.innerHTML = `<img src="${gifURL}" style="width: 100%; height: 100%; border-radius: 8px;">`;
              content.style.backgroundColor = '';
              saveMood(day, 'awesome-gif');
            } else {
              content.innerHTML = '';
              content.style.backgroundColor = mood.color;
              saveMood(day, mood.color);
            }

            menu.remove();
          });

          menu.appendChild(option);
        });

        // Calculate position relative to the widget
        const offsetTop = cell.offsetTop + cell.offsetHeight + 4;
        const offsetLeft = cell.offsetLeft + (cell.offsetWidth / 2);

        menu.style.top = `${offsetTop}px`;
        menu.style.left = `${offsetLeft}px`;
        menu.style.transform = 'translateX(-50%)';

        // Add the menu inside the widget
        widgetBox.appendChild(menu);
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
