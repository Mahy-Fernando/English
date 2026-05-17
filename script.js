const copyButtons = document.querySelectorAll('.copy-button');
const copyMessage = document.querySelector('#copyMessage');

let messageTimer;

function showMessage(message) {
  copyMessage.textContent = message;
  copyMessage.classList.add('is-visible');

  clearTimeout(messageTimer);

  messageTimer = setTimeout(() => {
    copyMessage.classList.remove('is-visible');

    setTimeout(() => {
      copyMessage.textContent = '';
    }, 250);
  }, 2000);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return fallbackCopyToClipboard(text);
  }
}

function fallbackCopyToClipboard(text) {
  const temporaryField = document.createElement('textarea');

  temporaryField.value = text;
  temporaryField.setAttribute('readonly', '');
  temporaryField.setAttribute('aria-hidden', 'true');

  document.body.appendChild(temporaryField);
  temporaryField.select();

  const copied = document.execCommand('copy');

  document.body.removeChild(temporaryField);

  return copied;
}

function getSuccessMessage(button) {
  const label = button.querySelector('.copy-label')?.textContent || '';

  if (label.toLowerCase().includes('e-mail')) {
    return 'E-mail copiado!';
  }

  if (label.toLowerCase().includes('line')) {
    return 'Número do Line copiado!';
  }

  return 'Informação copiada!';
}

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const textToCopy = button.dataset.copy;

    if (!textToCopy) {
      showMessage('Não foi possível copiar esta informação.');
      return;
    }

    const copied = await copyToClipboard(textToCopy);

    if (copied) {
      showMessage(getSuccessMessage(button));
      return;
    }

    showMessage('Não foi possível copiar automaticamente.');
  });
});
