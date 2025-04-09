const users = { barbi:'Barbi', luna:'Luna', iara:'Iara', mica:'Mica' };
let currentUser = null;
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const userSelect = document.getElementById('user-select');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const welcomeDiv = document.getElementById('welcome');
const newClassBtn = document.getElementById('new-class-btn');
const classForm = document.getElementById('class-form');
const classTitleInput = document.getElementById('class-title');
const exercisesFieldset = document.getElementById('exercises-fieldset');
const saveClassBtn = document.getElementById('save-class-btn');
const classList = document.getElementById('class-list');

function showScreen(screen) {
  loginScreen.classList.add('hidden');
  appScreen.classList.add('hidden');
  screen.classList.remove('hidden');
}

function loadClasses() {
  const all = JSON.parse(localStorage.getItem('classes')||'[]');
  return all.filter(c=>c.user===currentUser);
}

function renderClasses() {
  classList.innerHTML = '';
  const classes = loadClasses();
  classes.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${c.title}</strong><br>Ejercicios: ${c.exercises.join(', ')}`;
    classList.appendChild(li);
  });
}

loginBtn.addEventListener('click', () => {
  const val = userSelect.value;
  if (users[val]) {
    currentUser = val;
    welcomeDiv.textContent = `Bienvenida, ${users[val]}`;
    renderClasses();
    showScreen(appScreen);
  } else {
    alert('Selecciona un usuario.');
  }
});

logoutBtn.addEventListener('click', () => {
  currentUser = null;
  userSelect.value = '';
  showScreen(loginScreen);
});

newClassBtn.addEventListener('click', () => {
  classForm.classList.toggle('hidden');
});

saveClassBtn.addEventListener('click', () => {
  const title = classTitleInput.value.trim();
  const checks = Array.from(exercisesFieldset.querySelectorAll('input[type=checkbox]:checked')).map(i => i.value);
  if (!title) { alert('Pon un título'); return; }
  if (checks.length < 5 || checks.length > 7) { alert('Selecciona entre 5 y 7 ejercicios'); return; }
  const all = JSON.parse(localStorage.getItem('classes')||'[]');
  all.push({ user: currentUser, title, exercises: checks });
  localStorage.setItem('classes', JSON.stringify(all));
  classTitleInput.value = '';
  exercisesFieldset.querySelectorAll('input[type=checkbox]').forEach(i => i.checked = false);
  classForm.classList.add('hidden');
  renderClasses();
});

document.addEventListener('DOMContentLoaded', () => showScreen(loginScreen));
