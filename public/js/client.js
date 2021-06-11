ymaps.ready(init);
async function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10,
  });
  const response = await fetch('/map', {
    method: 'POST',
  });
  const dataFromServer = await response.json();
  dataFromServer.map((el) => {
    const placemark = new ymaps.Placemark([el.latitude, el.longitude], {
      balloonContent: el.balloon,
      hintContent: el.hint,
    });
    myMap.geoObjects.add(placemark);
  });
}

const $container = document.querySelector('[data-container]');
const $accountcontainer = document.querySelector('[data-accountcontainer]');
const $editform = document.forms.editform;

$container?.addEventListener('click', (e) => {
  if (e.target.className === 'viewmore') {
    const $cardWr = e.target.closest('[data-id]');
    const cardId = $cardWr.dataset.id;
    window.location = `/players/${cardId}/info`;
  } else if (e.target.className === 'readmore') {
    const $cardWr = e.target.closest('[data-id]');
    const cardId = $cardWr.dataset.id;
    window.location = `/tournaments/${cardId}/info`;
  }
});

$accountcontainer?.addEventListener('click', async (e) => {
  if (e.target.className === 'editbutton') {
    const $cardWr = e.target.closest('[data-id]');
    const cardId = $cardWr.dataset.id;
    window.location = `/players/${cardId}/edit`;
  } else if (e.target.className === 'deletebutton') {
    const $cardWr = e.target.closest('[data-id]');
    const cardId = $cardWr.dataset.id;
    const response = await fetch(`/players/${cardId}`, {
      method: 'DELETE',
    });
    if (response.status === 200) $cardWr.remove();
  }
});

$editform?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch(`/players/${e.target.id}/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      img: e.target.img.value,
      name: e.target.name.value,
      birthdate: e.target.birthdate.value,
      nationality: e.target.nationality.value,
      height: e.target.height.value,
      position: e.target.position.value,
      club: e.target.club.value,
      trophy: e.target.trophy.value,
      transfer: e.target.transfer.value,
    }),
  });
  await response.json();
  window.location = '/players';
});
