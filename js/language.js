

function changeLanguage() {
    const currentLang = navigator.language;
    const newLang = (currentLang === 'ru-RU') ? 'ru' : 'en';

    fetch(`/languages/${newLang}.json`)
        .then(response => response.json())
        .then(translationData => {
            document.documentElement.lang = newLang; 

            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                if (translationData[key]) {
                    element.textContent = translationData[key];
                }
            });   
        })
        .catch(error => console.error('Error loading language file:', error));
}

changeLanguage()
