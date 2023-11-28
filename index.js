
const requestSchemeBtn = document.getElementById("get-scheme")

requestSchemeBtn.addEventListener('click', () => {
    const colorPickerEl = document.getElementById('color-picker').value;
    const selectSchemeEl = document.getElementById('color-dropdown').value;
    const colorAPI = "https://www.thecolorapi.com/id";
    

    const params = new URLSearchParams({
        hex: colorPickerEl.replace('#', ''),
        mode: selectSchemeEl,
    });

    const url = `${colorAPI}?${params}&count=5`;

    console.log(url);
    console.log(colorPickerEl.value);
    console.log(selectSchemeEl.value);
    console.log(params)
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
});