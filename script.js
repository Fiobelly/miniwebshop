let termekek = [];
let aktualisKategoriak = [];
let aktualisKategoria = "";
let kosar = [];

fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {

        termekek = data;

        megjelenit(termekek);

        kategoriakMegjelenit();

    });

function kategoriakMegjelenit() {

    const kategoriak = [...new Set(termekek.map(t => t.category))];

    const kategoriadiv = document.getElementById("kategoriak");

    const osszes = document.createElement("button");

    osszes.innerText = "Összes";
    osszes.className = "kategoriagomb";

    osszes.onclick = () => {

        aktualisKategoriak = termekek;
        aktualisKategoria = "";

        megjelenit(termekek);
    };

    kategoriadiv.appendChild(osszes);

    kategoriak.forEach(kategoria => {

        const button = document.createElement("button");

        button.innerText = kategoria;

        button.className = "kategoriagomb";

        button.onclick = () => {

            aktualisKategoria = kategoria;

            aktualisKategoriak = termekek.filter(t => t.category == kategoria);

            megjelenit(aktualisKategoriak);
        };

        kategoriadiv.appendChild(button);

    });

}

function megjelenit(lista) {

    document.getElementById("container").innerHTML = "";

    lista.forEach(termek => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
                    <img src="${termek.image}">
                    <p>${termek.title}</p>
                    <h3>${termek.price} $</h3>
                    <button onclick="kosarba(${termek.id})">Kosárba</button>
                `;

        document.getElementById("container").appendChild(div);

    });

}

document.getElementById("search").addEventListener("input", function () {

    const beirt = this.value.toLowerCase();

    let szurtLista;

    if (aktualisKategoria == "") {

        szurtLista = termekek.filter(t =>
            t.title.toLowerCase().includes(beirt)
        );

    } else {

        szurtLista = aktualisKategoriak.filter(t =>
            t.title.toLowerCase().includes(beirt)
        );

    }

    megjelenit(szurtLista);

});

function kosarba(id) {

    const termek = termekek.find(t => t.id == id);

    kosar.push(termek);

    kosarMegjelenit();

}

function kosarMegjelenit() {

    const tartalom = document.getElementById("kosartartalom");

    tartalom.innerHTML = "";

    kosar.forEach((t, index) => {

        const div = document.createElement("div");

        div.className = "kosartermek";

        div.innerHTML = `
            <p>${t.title}</p>
            <strong>${t.price} $</strong>
            <br><br>
            <button onclick="torles(${index})">Eltávolítás</button>
        `;

        tartalom.appendChild(div);

    });

}

function torles(index) {

    kosar.splice(index, 1);

    kosarMegjelenit();

}