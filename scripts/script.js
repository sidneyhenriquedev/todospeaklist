const showItems = document.getElementById('showItems')
const inputItemUser = document.getElementById('inputItemUser')
const ModalWarning = document.getElementById('ModalWarning')
const btnCloseModal = document.getElementById('btnClose')
const changeLanguage = document.getElementById('changeLanguage')
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent
const togglebtnShowCalendar = document.getElementById('toggle')
const ShowCalendar = document.getElementById('ShowCalendar');
ShowCalendar.style.display = 'none'

const myListItem = [
    " "
]

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
const grammar = `#JSGF V1.0; grammar colors; public <myListItem> = ${myListItem.join(" | ",)};`;

speechRecognitionList.addFromString(grammar, 1)
recognition.grammars = speechRecognitionList
recognition.continous = false

//Set language in menu for your mic recognition your language
changeLanguage.addEventListener('change', () => {
    if (changeLanguage.value === 'pt-br') {
        recognition.lang = 'pt-br'

    } else if (changeLanguage.value === 'en-US') {
        recognition.lang = 'en-US'

    }
})

recognition.interimResults = false
recognition.maxAlternatives = 1

//here when you click in mic active the recognition voice and disable the button save list
function PressMicSaveList() {
    document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(31, 102, 143)'
    if (changeLanguage.value === 'en-US') {
        document.getElementById('typeorSpeakList').innerHTML = 'Listening...'

        setTimeout(() => {
            if (inputItemUser.value === '' && changeLanguage.value === 'en-US') {
                document.getElementById('typeorSpeakList').innerHTML = "Sorry! I couldn't hear you."
                document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(179, 55, 55)'
                error_listening()



            } else {
                document.getElementById('typeorSpeakList').innerHTML = "Type or speak the list"
                document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(31, 102, 143)'

            }
        }, 5000)


    } else if (changeLanguage.value === 'pt-br') {
        document.getElementById('typeorSpeakList').innerHTML = 'Ouvindo...'

        setTimeout(() => {
            if (inputItemUser.value === '' && changeLanguage.value === 'pt-br') {
                document.getElementById('typeorSpeakList').innerHTML = 'Desculpe! não consegui te ouvir.'
                document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(179, 55, 55)'
                error_listening()
            } else {
                document.getElementById('typeorSpeakList').innerHTML = 'Digite ou Fale Sua Lista'
                document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(31, 102, 143)'
            }
        }, 5000)

    }
    recordingSound()
    recognition.start()
}

//Here sound when press btn record or press f9
function recordingSound() {
    //Comented used in localhost for build the project
    // const AudioRecording = new Audio("../assets/recording.mp3")
    const AudioRecording = new Audio("https://sidneyhenriquedev.github.io/todospeaklist/assets/recording.mp3")
    AudioRecording.addEventListener('canplaythrough', (event) => {
        AudioRecording.play()
    })
}


function error_listening() {
    const ErrorAudioListening = new Audio("https://sidneyhenriquedev.github.io/todospeaklist/assets/error_listening.mp3")
    ErrorAudioListening.addEventListener('canplaythrough', (event) => {
        ErrorAudioListening.play()
    })
}

//Active the microfone for user speak a task list for command of voice
recognition.onresult = (event) => {
    const writeItem = event.results[0][0].transcript;
    inputItemUser.value = `${writeItem}`

    setTimeout(() => {
        AddListItem()
    }, 2500)


}

//Event Keyup When User Press Key Enter ADD List
inputItemUser.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        AddListItem()
    }
})

//Event Keyup When User Press Key F10 Active Microfone for Command of Voice
document.addEventListener("keyup", (event) => {
    if (event.key === 'F9') {
        document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(31, 102, 143)'
        if (changeLanguage.value === 'en-US') {
            document.getElementById('typeorSpeakList').innerHTML = 'Listening...'

            setTimeout(() => {
                if (inputItemUser.value === '' && changeLanguage.value === 'en-US') {
                    document.getElementById('typeorSpeakList').innerHTML = "Sorry! I couldn't hear you."
                    document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(179, 55, 55)'
                    error_listening()

                } else {
                    document.getElementById('typeorSpeakList').innerHTML = "Type or speak the list"
                    document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(31, 102, 143)'

                }
            }, 5000)


        } else if (changeLanguage.value === 'pt-br') {
            document.getElementById('typeorSpeakList').innerHTML = 'Ouvindo...'

            setTimeout(() => {
                if (inputItemUser.value === '' && changeLanguage.value === 'pt-br') {
                    document.getElementById('typeorSpeakList').innerHTML = 'Desculpe! não consegui te ouvir.'
                    document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(179, 55, 55)'
                    error_listening()
                } else {
                    document.getElementById('typeorSpeakList').innerHTML = 'Digite ou Fale Sua Lista'
                    document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(31, 102, 143)'
                }
            }, 5000)

        }
        recordingSound()
        recognition.start()

    }
})

//Define a Key for Item in Localstorage
const keyId = 'ListID'
const calendarShow = 'ShowCalendar'


//Function for add task list and insert of localstorage of the your browser
function AddListItem() {
    if (inputItemUser.value.trim() != '') {
        let ListValues = JSON.parse(localStorage.getItem(keyId) || "[]")
        ListValues.push({
            name: inputItemUser.value
        })
        localStorage.setItem(keyId, JSON.stringify(ListValues))
        inputItemUser.value = ''
        ShowListItem()

        if (changeLanguage.value === 'en-US') {
            ShowMessageSuccessADD_EN()
        } else if (changeLanguage.value === 'pt-br') {
            ShowMessageSuccessADD()
        }

        document.getElementById('typeorSpeakList').style.backgroundColor = 'rgb(31, 102, 143)'
        if (changeLanguage.value === 'pt-br') {
            document.getElementById('typeorSpeakList').innerHTML = 'Digite ou Fale Sua Lista'
        } else {
            document.getElementById('typeorSpeakList').innerHTML = "Type or speak the list"
        }

    } else {
        ModalWarning.style.display = 'flex'
    }

}
// Show all List task
function ShowListItem() {
    let ListValues = JSON.parse(localStorage.getItem(keyId) || "[]")
    let ListItemViewTaks = document.getElementById('showItems')
    ListItemViewTaks.innerHTML = ''
    ListValues.reverse()
    for (let i = 0; i < ListValues.length; i++) {
        let ListItemView = document.createElement('li')
        ListItemView.className = 'to-do-item'
        ListItemView.innerHTML += `<span>${ListValues[i]['name']}</span>
        <button class="btn-edit" onclick= ' ItemListEdit("${ListValues[i]['name']}")'><i class="fas fa-edit"></i></button>
        <button class="btn-delete" onclick='ItemListRemove("${ListValues[i]['name']}")'><i class="fas fa-check"></i></button>
        `
        showItems.appendChild(ListItemView)
    }

}

// close modal information when input value is empty 
btnCloseModal.addEventListener('click', () => {
    ModalWarning.style.display = 'none'
})

//Btn toggle for show and hide the calendar and set key of calendar in localstorage
// if active, set key calendarShow enable else set key calendarShow disabled
togglebtnShowCalendar.addEventListener('change', () => {
    if (togglebtnShowCalendar.checked) {
        ShowCalendar.classList.add('active');
        ShowCalendar.classList.remove('hidden');
        ShowCalendar.style.display = 'flex'
        localStorage.setItem(calendarShow, 'enable')
    } else {
        ShowCalendar.classList.remove('active');
        ShowCalendar.classList.add('hidden');
        localStorage.setItem(calendarShow, 'disabled')
    }
});

//Function for verify the state of calendar if eneble or disabled
function checkCalendarState() {
    let showCalendarActive = localStorage.getItem(calendarShow) || "";
    togglebtnShowCalendar.checked = showCalendarActive === 'enable';
    ShowCalendario();
}


function ShowCalendario() {
    let showCalendarActive = localStorage.getItem(calendarShow) || ""
    if (showCalendarActive === 'enable') {
        ShowCalendar.classList.add('active');
        ShowCalendar.classList.remove('hidden');
        ShowCalendar.style.display = 'flex'
    } else if (showCalendarActive === 'disabled') {
        ShowCalendar.classList.remove('active');
        ShowCalendar.classList.add('hidden');
    }
}

//Function for add animation when task will be finished
function removeTaskRightAnimation() {
    let listItemUser = document.querySelector('.to-do-item');
    listItemUser.classList.add('remove');
    listItemUser.addEventListener('animationend', function () {
        listItemUser.remove();
        ShowListItem()
    }, { once: true });
}


//Function for remove item of task list  when the specific item was selected
function ItemListRemove(data) {
    let ListValues = JSON.parse(localStorage.getItem(keyId) || "[]")
    let indexItem = ListValues.findIndex(element => element.name === data)
    ListValues.splice(indexItem, 1)
    localStorage.setItem(keyId, JSON.stringify(ListValues))
    ShowListItem()
    removeTaskRightAnimation()
}

//Function for Edit item of task list  when the specific item was selected
function ItemListEdit(data) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });


    if (changeLanguage.value === 'en-US') {
        swalWithBootstrapButtons.fire({
            title: "He is sure?",
            text: "You want to edit this task!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: `Yes, Edit`,
            cancelButtonText: "Cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `<div>Update the task: ${data}</div>`,
                    html: `
                        <input autocomplete="off" style="width:100%; display:block; margin:0" id="inputTask" class="swal2-input" placeholder="Enter the new task...">
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'EDIT',
                    cancelButtonText: 'Cancel',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        let inputValue = document.getElementById('inputTask').value;
                        let ListValues = JSON.parse(localStorage.getItem(keyId) || "[]");
                        let indexItem = ListValues.findIndex(element => element.name === data);
                        ListValues[indexItem].name = inputValue;
                        localStorage.setItem(keyId, JSON.stringify(ListValues));
                        ShowListItem();
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        ShowMessageSuccessEdit_EN()
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Edition Canceled",
                    icon: "error"
                });
            }
        });


    } else if (changeLanguage.value === 'pt-br') {
        swalWithBootstrapButtons.fire({
            title: "Tem certeza?",
            text: "Você deseja editar essa tarefa!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: `Sim, Editar`,
            cancelButtonText: "Cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `<div>Atualizar a tarefa: ${data}</div>`,
                    html: `
                        <input autocomplete="off" style="width:100%; display:block; margin:0" id="inputTask" class="swal2-input" placeholder="Digite a nova tarefa...">
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'EDITAR',
                    cancelButtonText: 'Cancelar',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        let inputValue = document.getElementById('inputTask').value;
                        let ListValues = JSON.parse(localStorage.getItem(keyId) || "[]");
                        let indexItem = ListValues.findIndex(element => element.name === data);
                        ListValues[indexItem].name = inputValue;
                        localStorage.setItem(keyId, JSON.stringify(ListValues));
                        ShowListItem();
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        ShowMessageSuccessEdit()
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Edição Cancelada",
                    icon: "error"
                });
            }
        });

    }

}

const date = new Date();
const translateDates = {
    'pt-br': {
        domingo: 'Domingo',
        segunda: 'Segunda-Feira',
        terca: 'Terça-Feira',
        quarta: 'Quarta-Feira',
        quinta: 'Quinta-Feira',
        sexta: 'Sexta-Feira',
        sabado: 'Sábado',
        daysOfWeek: [
            "Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"
        ],
        months: [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]
    },
    'en-US': {
        domingo: 'Sunday',
        segunda: 'Monday',
        terca: 'Tuesday',
        quarta: 'Wednesday',
        quinta: 'Thursday',
        sexta: 'Friday',
        sabado: 'Saturday',
        daysOfWeek: [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        months: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
    }
};

const langDefault = changeLanguage.value;

function TranslateCalendar(lang) {
    const currentLanguage = translateDates[lang] || translateDates[langDefault];
    const NameMonth = document.getElementById('NameMonth');
    const DayOfWeek = document.getElementById('DayOfWeek');
    const DateNumber = document.getElementById('DateNumber');
    const year = document.getElementById('year');

    if (NameMonth && DayOfWeek && DateNumber && year) {
        const currentMonth = currentLanguage.months[date.getMonth()];
        const currentDayOfWeek = currentLanguage.daysOfWeek[date.getDay()];

        NameMonth.innerHTML = currentMonth;
        DayOfWeek.innerHTML = currentDayOfWeek;
        DateNumber.innerHTML = date.getDate();
        year.innerHTML = date.getFullYear();
    }
}

changeLanguage.addEventListener('change', function () {
    const SelectLanguage = this.value;
    TranslateCalendar(SelectLanguage);
});

// Load the calendar when load de page
window.addEventListener('load', function () {
    TranslateCalendar(langDefault);
});


// //Functions For Show Messages ind Portugese SuccessADD List and SuccessEdit List
function ShowMessageSuccessADD() {
    Swal.fire(({
        title: "tarefa inserida com SUCESSO",
        text: "Sua tarefa foi inserida",
        timerProgressBar: true,
        timer: 2000,
        icon: "success",
    }))
    setTimeout(() => {
        Swal.close()
    }, 2000)
}

function ShowMessageSuccessEdit() {
    Swal.fire(({
        title: "Tarefa editada com SUCESSO!",
        text: "Sua tarefa foi editada",
        timerProgressBar: true,
        timer: 2000,
        icon: "success"
    }))
    setTimeout(() => {
        Swal.close()
    }, 2000)
}


// //Functions For Show Messages English SuccessADD List and SuccessEdit List
function ShowMessageSuccessADD_EN() {
    Swal.fire(({
        title: "task inserted SUCCESSFULLY",
        text: "Your task has been entered",
        timerProgressBar: true,
        timer: 2000,
        icon: "success",
    }))
    setTimeout(() => {
        Swal.close()
    }, 2000)
}

function ShowMessageSuccessEdit_EN() {
    Swal.fire(({
        title: "Task edited SUCCESSFULLY!",
        text: "Your task has been edited",
        timerProgressBar: true,
        timer: 2000,
        icon: "success"
    }))
    setTimeout(() => {
        Swal.close()
    }, 2000)
}
checkCalendarState();