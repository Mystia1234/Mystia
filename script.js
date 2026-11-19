const tabs = document.querySelectorAll('.tab');
const newsItems = document.querySelectorAll('.news-list li');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.remove('active'));
    tab.classList.add('active');

    const kind = tab.dataset.tab;
    newsItems.forEach(item => {
      item.style.display = item.dataset.kind === kind ? 'flex' : 'none';
    });
  });
});

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');

function openModal(title) {
  modalTitle.textContent = title;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

document.querySelectorAll('.login-open').forEach(button => {
  button.addEventListener('click', () => openModal('로그인'));
});

document.querySelectorAll('.join-open').forEach(button => {
  button.addEventListener('click', () => openModal('모험가 등록'));
});

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelector('.modal-close').addEventListener('click', closeModal);

modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

document.querySelector('.modal-submit').addEventListener('click', () => {
  alert('시안 페이지입니다. 실제 로그인 및 회원가입 기능은 연결되어 있지 않습니다.');
});
