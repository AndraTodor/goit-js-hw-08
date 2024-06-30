import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

// Funcția care salvează starea formularului în local storage
const saveFormState = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

// Funcția care încarcă starea formularului din local storage
const loadFormState = () => {
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
  }
};

// Funcția care resetează formularul și șterge starea din local storage
const onFormSubmit = event => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
};

// Adăugarea listenerelor pentru evenimentele input și submit
form.addEventListener('input', saveFormState);
form.addEventListener('submit', onFormSubmit);

// Încărcarea stării formularului la încărcarea paginii
loadFormState();
