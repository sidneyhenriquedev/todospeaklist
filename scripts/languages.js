const Translations = {
    'pt-br': {
        title: 'To Do Speak List',
        calendar: 'Calendário',
        home: 'Início',
        typeorspeaklist: 'Digite ou Fale Sua Lista',
        changeLanguage: 'Trocar Idioma (Mic)',
        typeorspeak: 'DIGITE OU FALE',
        btnClose: 'OK FECHAR',
        titleModal: 'Atenção',
        paragraphModal: 'Por favor digite ou toque no microfone para inserir uma tarefa, você não inseriu nenhuma Tarefa.',

    },

    'en-US': {
        title: 'To Do Speak List',
        calendar: 'Calendar',
        home: 'Home',
        typeorspeaklist: 'Type or Speak Your List',
        changeLanguage: 'Change language (Mic)',
        typeorspeak: 'TYPE OR SPEAK',
        btnClose: 'OK CLOSE',
        titleModal: 'Attention',
        paragraphModal: 'Please type or tap the microphone to enter a task, you have not entered any Tasks.',
    }
}


function TranslateAppllication(lang) {
    // Elements in Window list task
    document.getElementById('lblCaledar').innerHTML = Translations[lang].calendar
    document.getElementById('home').innerHTML = Translations[lang].home
    document.getElementById('typeorSpeakList').innerHTML = Translations[lang].typeorspeaklist
    document.getElementById('lblChangeLanguage').innerHTML = Translations[lang].changeLanguage
    document.getElementById('inputItemUser').placeholder = Translations[lang].typeorspeak
    document.getElementById('btnClose').innerHTML = Translations[lang].btnClose

    //Window Modal When user no type in input
    document.getElementById('titleModal').innerHTML = Translations[lang].titleModal
    document.getElementById('paragraphModal').innerHTML = Translations[lang].paragraphModal


}

document.getElementById('changeLanguage').addEventListener('change', function () {
    const SelectedLanguage = this.value
    TranslateAppllication(SelectedLanguage)
})