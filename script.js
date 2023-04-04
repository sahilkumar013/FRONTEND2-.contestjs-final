var count = 0;
var students = [];

function addStudent() {

    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const ageValue = document.getElementById('age').value;
    const gradeValue = document.getElementById('grade').value;
    const degreeValue = document.getElementById('degree').value;

    //Inputs Mandatory, Blank will not be submitted.
    if (nameValue == '' || emailValue == '' || ageValue == '' || gradeValue == '' || degreeValue == "") {
        alert("All fields are required!")
        return;
    }

    //Iterate the ID
    count++;

    students.push({
        ID: count, name: nameValue, email: emailValue, age: ageValue, grade: gradeValue, degree: degreeValue
    });

    // Store the updated students array in local storage
    localStorage.setItem("students", JSON.stringify(students));

    // Clear the input fields   
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('age').value = "";
    document.getElementById('grade').value = "";
    document.getElementById('degree').value = "";
    console.log(students);
    showTable();
}

function showTable() {
    const table = document.getElementById('tbody');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    table.value = "";
    students.forEach((student) => {
        const row = document.createElement("tr");

        var keys = Object.keys(student);
        var id = document.createElement('td');

        const name = document.createElement('td');
        const email = document.createElement('td');
        const age = document.createElement('td');
        const grade = document.createElement('td');
        const degree = document.createElement('td');

        keys.forEach((key) => {
            if (key == 'ID') {
                id.innerHTML = student[key];
            }
            else if (key == 'name') {
                name.innerHTML = student[key];
            }
            else if (key == 'email') {
                email.innerHTML = student[key];
            }
            else if (key == 'age') {
                age.innerHTML = student[key];
            }
            else if (key == 'grade') {
                grade.innerHTML = student[key];
            }
            else
                degree.innerHTML = `<div>${
                    student[key]
                }
                </div> <div class="icons"><a onClick="edit(${student['ID']})" class='fa'>&#xf044;</a> <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> </div> `;
            // degree.innerHTML = student[key] + "  <li class='fa'>&#xf044;</li>";

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(age);
            row.appendChild(grade);
            row.appendChild(degree);
        })
        table.appendChild(row);
    })
}

function search() {
    var input, filter, table, tr, td, i, txtValue, txtValue1, txtValue2;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbody");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[2];
        td2 = tr[i].getElementsByTagName("td")[5];

        if (td || td1 || td2) {
            txtValue = td.textContent || td.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }

            else {
                tr[i].style.display = "none";
            }

        }
    }
}

function edit(id) {
    students.forEach((student) => {
        if (student['ID'] == id) {
            document.getElementById('name').value = student['name'];
            document.getElementById('email').value = student['email'];
            document.getElementById('age').value = student['age'];
            document.getElementById('grade').value = student['grade'];
            document.getElementById('degree').value = student['degree'];
            document.getElementById('submit').innerText = 'Edit Student';

            document.getElementById("submit").onclick = function jsFunc() {

                student['name'] = document.getElementById('name').value;
                student['email'] = document.getElementById('email').value;
                student['age'] = document.getElementById('age').value;
                student['grade'] = document.getElementById('grade').value;
                student['degree'] = document.getElementById('degree').value;

                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                document.getElementById('age').value = "";
                document.getElementById('grade').value = "";
                document.getElementById('degree').value = "";

                document.getElementById('submit').innerText = 'Add Student';

                showTable();
            }
        }
    })
}

function del(id) {
    students.forEach((student, index) => {
        if (student['ID'] == id) {
            students.splice(index, 1);
            showTable();
        }
    })
}

window.onload = () => {
    students = JSON.parse(localStorage.getItem('students')) || [];
    count = students.reduce((max, student) => Math.max(max, student.ID), 0);
    showTable();
};

window.onbeforeunload = () => {
    localStorage.setItem('students', JSON.stringify(students));
};