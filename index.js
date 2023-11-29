
const requestSchemeBtn = document.getElementById("get-scheme");

requestSchemeBtn.addEventListener('click', () => {
    let colorPickerEl = document.getElementById('color-picker').value;
    const selectSchemeEl = document.getElementById('color-dropdown').value;
    const colorAPI = "https://www.thecolorapi.com/scheme";
    const colorCards = document.getElementById('color-cards');

    colorPickerEl = colorPickerEl.replace('#', '')

    const url = `https://www.thecolorapi.com/scheme?hex=${colorPickerEl}&format=json&mode=${selectSchemeEl}&count=5`;
    
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            colorCards.innerHTML = ""
            for(const color of data.colors){
                colorCards.innerHTML += `
                <div style="padding: 3rem 1rem 1rem; background-color: ${color.hex.value};"
                </div>`
            }
        });
});