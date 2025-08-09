document.addEventListener("DOMContentLoaded", () => {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const grid = document.getElementById('mood-grid');

  function getWeekNumber(date = new Date()) {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const daysPassed = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
    return Math.ceil((daysPassed + firstDay.getDay() + 1) / 7);
  }

  const weekKey = `mood-week-${getWeekNumber()}-${new Date().getFullYear()}`;
  let moodData = JSON.parse(localStorage.getItem(weekKey)) || {};

  function saveMood(day, color) {
    moodData[day] = color;
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

      if (moodData[day]) {
        cell.style.backgroundColor = moodData[day];
      }

      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.value = moodData[day] || '#f4c7c3';
      colorInput.style.display = 'none';

      colorInput.addEventListener('input', () => {
        cell.style.backgroundColor = colorInput.value;
        saveMood(day, colorInput.value);
      });

      cell.appendChild(colorInput);

      cell.addEventListener('click', () => {
        colorInput.click();
      });

      grid.appendChild(cell);
    });
  }

  createGrid();
});
