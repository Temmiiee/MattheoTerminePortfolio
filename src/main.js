const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const alert = document.querySelector('#form-alert');
const submit = form.querySelector('button');
const fields = [
  { input: form.elements.name, error: document.querySelector('#name-error'), required: 'Indiquez votre nom.' },
  { input: form.elements.email, error: document.querySelector('#email-error'), help: 'email-help', required: 'Indiquez votre adresse e-mail.' },
  { input: form.elements.message, error: document.querySelector('#message-error'), help: 'project-help', required: 'Décrivez votre projet.' },
];

function validate({ input, error, help, required }) {
  let message = '';
  if (!input.value.trim()) {
    message = required;
  } else if (input.validity.typeMismatch) {
    message = 'Indiquez une adresse e-mail valide, par exemple nom@exemple.fr.';
  } else if (input.validity.tooLong) {
    message = `Limitez ce champ à ${input.maxLength} caractères.`;
  }

  error.textContent = message;
  error.hidden = !message;
  if (message) {
    input.setAttribute('aria-invalid', 'true');
  } else {
    input.removeAttribute('aria-invalid');
  }
  const description = [message && error.id, help].filter(Boolean).join(' ');
  if (description) {
    input.setAttribute('aria-describedby', description);
  } else {
    input.removeAttribute('aria-describedby');
  }
  return !message;
}

for (const field of fields) {
  field.input.addEventListener('input', () => {
    if (field.input.hasAttribute('aria-invalid')) validate(field);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (submit.getAttribute('aria-disabled') === 'true') return;
  status.textContent = '';
  alert.textContent = '';

  const invalid = fields.filter((field) => !validate(field));
  if (invalid.length) {
    const first = invalid[0];
    if (document.activeElement === first.input) {
      alert.textContent = first.error.textContent;
    } else {
      first.input.focus();
    }
    return;
  }

  const data = new FormData(form);
  submit.setAttribute('aria-disabled', 'true');
  for (const { input } of fields) input.readOnly = true;
  status.textContent = 'Envoi en cours…';

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error('Échec de l’envoi');
    form.reset();
    status.textContent = 'Votre demande a été envoyée. Merci pour votre message.';
  } catch {
    status.textContent = '';
    alert.textContent = 'Impossible de confirmer l’envoi. Réessayez ou contactez-moi directement par e-mail.';
  } finally {
    submit.removeAttribute('aria-disabled');
    for (const { input } of fields) input.readOnly = false;
  }
});

form.noValidate = true;

function openLinkedTicket() {
  const id = window.location.hash.slice(1);
  const summary = document.getElementById(id);
  if (summary?.matches('.ticket > summary')) {
    summary.parentElement.open = true;
  }
}

openLinkedTicket();
window.addEventListener('hashchange', openLinkedTicket);

document.querySelector('.journey a[href="#ticket-recherche"]').addEventListener('click', (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  document.getElementById('ticket-recherche').parentElement.open = true;
});
