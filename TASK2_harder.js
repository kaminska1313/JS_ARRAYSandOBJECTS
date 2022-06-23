/*Task 2*** Реализуйте считывание из JSONки из файла task2.json с помощью, например, модуля fs,
для дальнейшего использования в функции, описанной в задании 2*/

const fs = require('fs')
const users = fs.readFileSync('task2.json', 'utf-8');

function unique(users) {
    let list = [];
    for (let user of JSON.parse(users)) {
        if (!JSON.stringify(list).includes(user['name'])) {
            list.push(user);
        }
    }

    return list;
}

console.log(unique(users));
