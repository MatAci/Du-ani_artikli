const container = window.document.querySelector(".movements");
async function customHttp(url = "", method = "GET", data = null) {
  const response = await fetch(url, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data ? JSON.stringify(data) : undefined,
  });

  return response.json();
}

const loadEvent = function () {
  const data = customHttp("http://localhost:3000/items", "GET");
  try {
    data.then(
      (value) => {
        container.innerHTML = "";
        value.forEach((element) => {
          let html = `<div class="movements__row" id="${element.id}">
      
          <!--
      <div class="movements__type movements__type--deposit">ID:${element.id}</div>
      -->
      <div class="movements__date">Ime:<br>${element.naziv}</div>
      <div class="movements__date">Adresa:<br> ${element.adresa}</div>
      <div class="movements__date">
       Koordinate:(${element.gpsduzina},<br>
        ${element.gpssirina})
      </div>
      <!--<div class="movements__value"></div>-->
      <div class="movements__date">
      <button type="button" class="artikli">Artikli</button>
      </div>

    </div>`;
          container.insertAdjacentHTML("afterbegin", html);
        });
      },
      (e) => {}
    );
  } catch (e) {}
};
loadEvent();

const exit_modal = window.document.querySelector(".exit-modal-btn-2");
const modal = window.document.querySelector(".modal_artikli");
const overlay = window.document.querySelector(".overlay_artikli");

exit_modal.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.querySelector(".ispis").innerHTML = "";
});

const artikli_popis = [
  "Mlijeko",
  "Jaja",
  "Kobasica",
  "Meso",
  "Krastavac",
  "Banana",
  "Paprika",
  "Kruh",
  "Brašno",
  "Riba",
  "Jogurt",
  "Vino",
  "Pivo",
  "Ajvar",
  "Majoneza",
  "Sir",
  "Pršut",
  "Šunka",
  "Med",
  "Marmelada",
];

function add_artikli(artikli_popis) {
  let helper = [];
  let artikli = [];
  while (helper.length != 6) {
    let k = getRndInteger(0, 19);
    if (!helper.includes(k)) {
      helper.push(k);
    }
  }
  for (let i = 0; i < 6; i++) {
    artikli[i] = artikli_popis[helper[i]];
  }
  return artikli;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.document
  .querySelector(".movements")
  .addEventListener("click", function (e) {
    if (e.target.classList.value === "artikli") {
      const parent = e.target.closest(".movements__row");
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
      const data = customHttp(
        `http://localhost:3000/items/${parent.id}`,
        "GET"
      );
      data.then((value) => {
        let array = [];
        array = value.artikli;
        console.log(array);
        array.forEach((element) => {
          let html = `${element} <br>`;
          document
            .querySelector(".ispis")
            .insertAdjacentHTML("beforeend", html);
        });
      });
    }
  });
