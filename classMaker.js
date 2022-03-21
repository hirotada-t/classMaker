// const forconstructorForm = '<div class="mb-3" id="inputRow"><label for="constructorName" class="form-label me-3">constructor</label><i class="fa-solid fa-trash" onclick="deleteFormBtn()"></i><input type="text" id="constructorName" class="form-control" placeholder="constructorName"></div>';

const addFormBtn = () => {
    const addRow = document.getElementById('inputConstructor');
    let copied = addRow.lastElementChild.cloneNode(true);
    addRow.appendChild(copied);
}

const elementGetBtn = () => {
    const className = document.getElementById('classNama').value;
    let constructorName = makeElementArray('c');
    let methodName = [];

    for (i = 1; i < 4; i++) {
        m = document.getElementById('methodName' + i).value;
        if (m == '') continue;
        methodName.push(m);
    }
    classCreate(className, constructorName, methodName);
}

const makeElementArray = (target) => {
    let array = [];
    const targetId = {
        c: 'constructorName',
        m: 'methodName',
    }
    for (i = 1; i < 6; i++) {
        value = document.getElementById(targetId[target] + i).value;
        if (value == '') continue;
        array.push(value);
    }
    return array;
}

const classCreate = (className, constructorName, methodName) => {
    let constructorSetting = '';
    let methodSetting = '';

    // コンストラクターの設定
    for (i = 0; i < 5; i++) {
        if (typeof constructorName[i] == 'undefined') continue;
        constructorSetting += 'this.' + constructorName[i] + '=' + constructorName[i] + ';\n';
    }
    // メソッドの設定
    for (i = 0; i < 5; i++) {
        if (typeof methodName[i] == 'undefined') continue;
        methodSetting += methodName[i] + '{}\n';
    }
    // 結果を出力
    document.getElementById('outputArea').value = `class ${className}{
    constructor(${constructorName}){
      ${constructorSetting}
    }
    ${methodSetting}
  }`
}

// 
const clearResultBtn = () => {
    let result = confirm('Do you really want to clear result?');
    if (result) document.getElementById('outputArea').value = '';
}

// 
const resetAllBtn = () => {
    let result = confirm('Do you really want to reset all value?');
    if (result) {
        document.getElementById('outputArea').value = '';
        let elements = document.getElementsByTagName('input');
        for (i = 0; i < elements.length; i++) {
            elements[i].value = '';
        }
    }
}

const addBtn = document.querySelectorAll('button.add');
addBtn.forEach(button => button.addEventListener('click', (e) => {
    const clickedBtnElement = e.currentTarget;
    const cloneElement = clickedBtnElement.closest('div').querySelector('div#constructorInputArea div').cloneNode(true);
    document.getElementById("constructorInputArea").appendChild(cloneElement);
    const deleteFormBtn = document.querySelectorAll('i.fa-trash');
    deleteFormBtn.forEach(i => i.addEventListener('click', deleteForm));
}));

// 
const resetBtn = document.querySelectorAll('button.reset');
resetBtn.forEach(button => button.addEventListener('click', (e) => {
    let result = confirm('Do you really want to clear value?');
    if (result) {
        const clickedBtnElement = e.currentTarget;
        const elements = clickedBtnElement.closest('div').querySelectorAll('input');
        for (i = 0; i < elements.length; i++) {
            elements[i].value = '';
        }
    }
}));

// 
const deleteFormBtn = document.querySelectorAll('i.fa-trash');
deleteFormBtn.forEach(i => i.addEventListener('click', deleteForm));

function deleteForm(e) {
    const clickedElement = e.currentTarget;
    clickedElement.closest('div').remove();
}


function copyToClipboard() {
    // コピー対象をJavaScript上で変数として定義する
    var copyTarget = document.getElementById("outputArea");

    // コピー対象のテキストを選択する
    copyTarget.select();

    // 選択しているテキストをクリップボードにコピーする
    document.execCommand("Copy");

    // コピーをお知らせする
    alert("コピーしました");
}