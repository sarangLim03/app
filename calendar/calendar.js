document.addEventListener('DOMContentLoaded', function () {
  const date = new Date();
  let currYear = date.getFullYear();
  let currMonth = date.getMonth();

  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const currentDate = document.querySelector('.current-date');
  const daysTag = document.querySelector('.days');

  const renderCalendar = () => {
    currentDate.innerHTML = `${currYear} ${months[currMonth]}`;
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();

    let liTag = '';
    for (let i = lastDateOfPrevMonth - firstDayOfMonth + 1; i <= lastDateOfPrevMonth; i++) {
      liTag += `<li class="prev-date" data-month="${currMonth - 1}" data-year="${currMonth === 0 ? currYear - 1 : currYear}">${i}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear() ? 'active' : '';
      liTag += `<li class="${isToday}" data-month="${currMonth}" data-year="${currYear}">${i}</li>`;
    }

    const remainingDays = 42 - (firstDayOfMonth + lastDateOfMonth);
    for (let i = 1; i <= remainingDays; i++) {
      liTag += `<li class="next-date" data-month="${currMonth + 1}" data-year="${currMonth === 11 ? currYear + 1 : currYear}">${i}</li>`;
    }

    daysTag.innerHTML = liTag;

    // fetch 부분을 renderCalendar 함수 안에 넣음
    fetch(`/calendar.php?year=${currYear}&month=${currMonth + 1}`)
      .then(response => response.json())
      .then(data => {
        const eventsContainer = document.getElementById('event-list');
        const events = data.map(event => `<div>${event.date}: ${event.title}</div>`).join('');
        eventsContainer.innerHTML = events || '저장된 일정 없음';
      })
      .catch(error => console.error('Error fetching events:', error));
  };

  renderCalendar();

  const prevIcon = document.querySelector('.last-icons');
  const nextIcon = document.querySelector('.next-icons');

  prevIcon.addEventListener('click', () => {
    currMonth--;
    if (currMonth < 0) {
      currMonth = 11;
      currYear--;
    }
    renderCalendar();
  });

  nextIcon.addEventListener('click', () => {
    currMonth++;
    if (currMonth > 11) {
      currMonth = 0;
      currYear++;
    }
    renderCalendar();
  });

  daysTag.addEventListener('click', (event) => {
    const clickedDate = event.target;
    const clickedMonth = parseInt(clickedDate.dataset.month);
    const clickedYear = parseInt(clickedDate.dataset.year);

    if (!isNaN(clickedMonth) && !isNaN(clickedYear)) {
      currMonth = clickedMonth;
      currYear = clickedYear;
      renderCalendar();
    }
  });
});
