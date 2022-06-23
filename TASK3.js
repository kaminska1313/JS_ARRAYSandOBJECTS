const enterprises = [
    {
        id: 1,
        name: "Предприятие 1",
        departments: [
            {
                id: 2,
                name: "Отдел тестирования",
                employees_count: 10,
            },
            {
                id: 3,
                name: "Отдел маркетинга",
                employees_count: 20,
            },
            {
                id: 4,
                name: "Администрация",
                employees_count: 15,
            },
        ]
    },
    {
        id: 5,
        name: "Предприятие 2",
        departments: [
            {
                id: 6,
                name: "Отдел разработки",
                employees_count: 50,
            },
            {
                id: 7,
                name: "Отдел маркетинга",
                employees_count: 20,
            },
            {
                id: 8,
                name: "Отдел охраны труда",
                employees_count: 5,
            },
        ]
    },
    {
        id: 9,
        name: "Предприятие 3",
        departments: [
            {
                id: 10,
                name: "Отдел аналитики",
                employees_count: 0,
            },
        ]
    }
]

/* 1. Вывести все предприятия и их отделы. Рядом указать количество сотрудников.
 Для предприятия посчитать сумму всех сотрудников во всех отделах.

 **Пример:**

Предприятие 1 (45 сотрудников)
- Отдел тестирования (10 сотрудников)
- Отдел маркетинга (20 сотрудников)
- Администрация (15 человек)
Предприятие 2 (75 сотрудников)
- Отдел разработки (50 сотрудников)
- Отдел маркетинга (20 сотрудников)
- Отдел охраны труда (5 сотрудников)
Предприятие 3 (нет сотрудников)
- Отдел аналитики (нет сотрудников)*/



function namings(ent) {
    let list = []
    ent.forEach(el => {
        let counter = 0;
        let dep = el.departments.map(item => {
            counter += item.employees_count
            return item.name + ' (' + item.employees_count + ' сотрудников)';
        }).join('\n- ');

        list.push(el.name + ' (' + counter + ' сотрудников)' + '\n' + '- ' + dep);
    });
    return list.join('\n');

}
console.log(namings(enterprises));



/* 2. Написать функцию, которая будет принимать 1 аргумент (id отдела или название отдела и возвращать название предприятия, к которому относится).

 Пример:
 getEnterpriseName(4) // Предприятие 1
 getEnterpriseName("Отдел маркетинга") // Предприятие 2*/



function getEnterpriseName(criteria) {
    return enterprises.filter(ent => {
        if (ent.id == criteria || ent.departments.find(el => el.id == criteria || el.name == criteria)) {
            console.log(ent.name)
        }
    })
}

getEnterpriseName("Отдел маркетинга");
getEnterpriseName(1);
getEnterpriseName(7);



/* 3. Написать функцию, которая будет добавлять предприятие. В качестве аргумента принимает название предприятия

 Пример:
 addEnterprise("Название нового предприятия")*/



function addEnterprise(newEnterprise) {
    let newEnt = Object.assign({}, enterprises.slice(-1)[0]);

    newEnt.name = newEnterprise;
    newEnt.id = newEnt.departments.slice(-1)[0].id + 1;
    let newId = newEnt.id;
    newEnt.departments.forEach(dep => {
        newId++;
        dep.id = newId;
        dep.name = "";
        return newEnt;
    })
    enterprises.push(newEnt);
    return enterprises;
}

console.log(addEnterprise("Предприятие 4"));



/* 4. Написать функцию, которая будет добавлять отдел в предприятие. В качестве аргумента принимает id предприятия, в которое будет добавлен отдел и название отдела.

 Пример:
 addDepartment(1, "Название нового отдела")*/



function addDepartment(depId, depNewName) {
    let index = enterprises.findIndex(ent => {
        return ent.id == depId;
    })
    let newDep = {
        id: 11,
        name: depNewName,
        employees_count: 0
    }

    enterprises[index].departments.push(newDep);
    console.log(enterprises[index]);
}
addDepartment(9, 'Отдел сантехники');



/* 5. Написать функцию для редактирования названия предприятия. Принимает в качестве аргумента id предприятия и новое имя предприятия.

 Пример:
 editEnterprise(1, "Новое название предприятия")*/



function editEnterprise(entId, entNewName) {
    let index = enterprises.findIndex(ent => {
        return ent.id == entId;
    })
    enterprises[index].name = entNewName;
    console.log(enterprises);
}
editEnterprise(9, "Предприятие ХXX");




/* 6. Написать функцию для редактирования названия отдела. Принимает в качестве аргумента id отдела и новое имя отдела.

 Пример:
 editDepartment(7, "Новое название отдела")*/



function editDepartment(depId, newDepName) {
    let indexEnt = enterprises.findIndex(ent => {
        return ent.departments.find(el => el.id == depId);
    })
    let indexDep = enterprises[indexEnt].departments.findIndex(ent => {
        if (ent.id == depId) return ent;
    })
    enterprises[indexEnt].departments[indexDep].name = newDepName;
    console.log(enterprises[indexEnt].departments[indexDep]);

}
editDepartment(10, 'Отдел ночного дожора');



/* 7. Написать функцию для удаления предприятия. В качестве аргумента принимает id предприятия.

 Пример:
 deleteEnterprise(1)*/



function deleteEnterprise(entId) {
    let indexEnt = enterprises.findIndex(ent => {
        return ent.id == entId;
    })

    enterprises.splice(indexEnt, 1)
    console.log(enterprises)
}
deleteEnterprise(5);



/* 8. Написать функцию для удаления отдела. В качестве аргумента принимает id отдела. 
Удалить отдел можно только, если в нем нет сотрудников.

 Пример:
 deleteDepartment(3)*/



function deleteDepartment(depId) {

    let indexEnt = enterprises.findIndex(ent => {
        return ent.departments.find(el => el.id == depId);
    })
    let departments = enterprises[indexEnt].departments;
    let indexDep = departments.findIndex(ent => {
        if (ent.id == depId) return ent;
    })

    if (departments[indexDep].employees_count == 0) {
        departments.splice(indexDep, 1)
        console.log(enterprises[indexEnt])
    }
}
deleteDepartment(10);



/*9. Написать функцию для переноса сотрудников между отделами одного предприятия.
В качестве аргумента принимает два значения: id отдела, из которого будут переноситься сотрудники
и id отдела, в который будут переноситься сотрудники).

Пример:
moveEmployees(2, 3)*/



function moveEmployees(depIdFrom, depIdTo) {
    let indexEnt = enterprises.findIndex(ent => {
        return ent.departments.find(el => el.id == depIdFrom);
    })
    let departments = enterprises[indexEnt].departments;
    departments.find(el => el.id == depIdTo).employees_count += departments.find(el => el.id == depIdFrom).employees_count
    departments.find(el => el.id == depIdFrom).employees_count = 0;
    console.log(departments)
}
moveEmployees(7, 8);