const addbtn = document.getElementById("add-note");
const main = document.querySelector("#main");

addbtn.addEventListener("click", function () {
  addnote();
});

const addnote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const savedata = () => {
    const data = [];
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    notes.forEach((note) => {
      data.push(note.value);
    });
    if (data.length === 0) {
      localStorage.removeItem("notes");
    } else {
      localStorage.setItem("notes", JSON.stringify(data));
    }
  };

  note.innerHTML = `<div class="toolbar">
     <i class="fa-solid fa-floppy-disk" id="save"></i>
     <i class="fa-solid fa-trash" id="dlt"></i>
   </div>
  <textarea>${text}</textarea>`;

  note.querySelector("#save").addEventListener("click", function () {
    savedata();
  });

  note.querySelector("#dlt").addEventListener("click", function () {
    note.remove();
    savedata();
  });
  note
    .querySelector(".note textarea")
    .addEventListener("focusout", function () {
      savedata();
    });
  main.appendChild(note);
  savedata();
};

(function () {
  const lsnotes = JSON.parse(localStorage.getItem("notes"));
  if (lsnotes === null) {
    addnote();
  } else {
    lsnotes.forEach((lsnote) => {
      addnote(lsnote);
    });
  }

  // if (lsnotes.length === 0) {
  //   localStorage.removeItem("notes");
  // } else {
  //   addnote();
  // }
})();
