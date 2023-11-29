// Check if permission has already been granted or denied
const storedPermission = localStorage.getItem('clipboard-write-permission');
if (storedPermission !== null) {
  // Use the stored permission preference
  if (storedPermission === 'granted') {
    addClickToCopyFunctionality();
  } else if (storedPermission === 'denied') {
    console.error('Clipboard write permission denied');
  }
} else {
  // Prompt the user for permission
  navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
    if (result.state === 'granted') {
      // Proceed with setting up click-to-copy functionality
      addClickToCopyFunctionality();

      // Store the granted permission in local storage
      localStorage.setItem('clipboard-write-permission', 'granted');
    } else if (result.state === 'prompt') {
      // Display warning message
      const warningMessage = document.createElement('div');
      warningMessage.textContent = 'Click-to-copy functionality requires clipboard permission. Please allow permission to enable this feature.';
      document.body.appendChild(warningMessage);

      // Prompt the user for permission
      result.user().grant();

      // Check for permission again after granting and set up click-to-copy functionality if granted
      navigator.permissions.query({ name: 'clipboard-write' }).then(secondResult => {
        if (secondResult.state === 'granted') {
          addClickToCopyFunctionality();
          document.body.removeChild(warningMessage);

          // Store the granted permission in local storage
          localStorage.setItem('clipboard-write-permission', 'granted');
        }
      });
    } else {
      console.error('Clipboard write permission denied');
    }
  });
}

const requestSchemeBtn = document.getElementById("get-scheme");
const clickableColumns = document.querySelectorAll('.color-column'); // Get initial color columns

requestSchemeBtn.addEventListener('click', () => {
  const colorPickerEl = document.getElementById('color-picker').value;
  const selectSchemeEl = document.getElementById('color-dropdown').value;
  const colorAPI = "https://www.thecolorapi.com/scheme";
  const colorCards = document.getElementById('color-cards');

  const hexColor = colorPickerEl.substring(1);
  const mode = selectSchemeEl.toLowerCase();

  fetch(`https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${mode}&count=5`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      colorCards.innerHTML = ""; // Clear existing color cards

      for (const color of data.colors) {
        const colorColumn = document.createElement('div');
        colorColumn.classList.add('color-column'); // Add color-column class
        colorColumn.style.padding = '3rem 1rem 1rem';
        colorColumn.style.backgroundColor = color.hex.value;

        const colorText = document.createElement('p');
        colorText.classList.add('inverse-text');
        colorText.textContent = color.hex.value;

        colorColumn.appendChild(colorText);
        colorCards.appendChild(colorColumn); // Append color column

        // Attach click-to-copy listener to newly created color column
        colorColumn.addEventListener('click', () => {
          const text = colorText.innerText;
          navigator.clipboard.writeText(text);

          // Delay the paste action to allow time for text to be copied
          setTimeout(() => {
            navigator.clipboard.readText().then(copiedText => {
              if (copiedText === text) {
                alert('Text copied to clipboard!');
              } else {
                console.error('Text copying failed');
              }
            });
          }, 100); // Delay of 100 milliseconds
        });
      }
    })
    .catch(error => {
      console.error(error);
      alert('There was an error fetching the color scheme. Please try again later.');
    });
});
