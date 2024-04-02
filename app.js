import { apiDeleteStudents, getStudents, getStudents2 } from "./api-calls.js";
const url = "https://63000b629350a1e548e9abfc.mockapi.io/api/v1/students";

const selectSortBy = document.querySelector("select");
const addStudentBtn = document.getElementById("add-student");
// --------------- Spinner ---------------
const bsSpinner = document.getElementById("spinner");
// --------------- Search ---------------
const searchInput = document.getElementById("search");
const searchGlassIcon = document.getElementById("search-glass");
const clearIcon = document.getElementById("clear");
// --------------- Modal ---------------
const myModalEl = document.getElementById("myModal");
const modalForm = document.getElementById("modalForm");
const delConfirmTxt = document.getElementById("delete-confirmation-text");
const liveToast = document.getElementById("liveToast");
const tableBody = document.querySelector("tbody");
const submitBtn = document.querySelector("#submit");
const modalTitle = document.querySelector(".modal-header h1");
const modalBody = document.querySelector("#myModal .modal-body");
const modalFooter = document.querySelector("#myModal .modal-footer");

window.deleteStudent = deleteStudent;

let students = [];

addStudentBtn.addEventListener("click", () => {});

selectSortBy.addEventListener("change", (e) => {
  console.log(e.target.value);
});

// async function initApp() {
function initApp() {
  //   bsSpinner.classList.add("d-none");
  //   bsSpinner.classList.remove("d-none");
  bsSpinner.classList.toggle("d-none");

  //   const data = await getStudents();
  //   const data2 = await getStudents2();

  //   getStudents2().then((d) => console.log(d));
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       bsSpinner.classList.toggle("d-none");
  //       students = data;
  //       createStudents(students);
  //     });
  getStudents().then((data) => {
    bsSpinner.classList.toggle("d-none");
    students = data;
    createStudents(students);
  });
  //   setTimeout(() => {}, 2000);

  //   bsSpinner.classList.add("d-none");

  //   getStudents().then((data) => console.log(data));
}

initApp();

function createStudents(students) {
  tableBody.innerHTML = "";

  if (!students.length) {
    // if(!0){}
    tableBody.innerHTML = `
          <tr>
              <td colspan="8">No data found!</td>
          </tr>
      `;
    return;
  }

  for (let student of students) {
    createSingleStudent(student);
  }
}

function createSingleStudent({ id, fname, lname, age, avatar, email, github }) {
  //   const { id, fname, lname, age, avatar, email, github } = student;
  const studentEl = `
            <tr>
                <td>${id}</td>
                <td>
                    <img src="${avatar}" alt="" />
                </td>
                <td>${fname}</td>
                <td>${lname}</td>
                <td>${age}</td>
                <td>${email}</td>
                <td>${github}</td>
                <td>
                <button id="edit" type="button" class="btn btn-secondary">
                    <i class="bi bi-pencil"></i>
                </button>
                <button id="delete" onclick="deleteStudent(${id})" type="button" class="btn btn-danger">
                    <i class="bi bi-trash"></i>
                </button>
                <button id="info" type="button" class="btn btn-primary">
                    <i class="bi bi-info-circle-fill"></i>
                </button>
                </td>
            </tr>
  `;

  tableBody.innerHTML += studentEl;
}

function deleteStudent(id) {
  apiDeleteStudents(id).then((d) => {
    initApp();
  });
  console.log("deleting", id);
}
