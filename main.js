// Import modul DOM dari jscroot — onClick, getValue, setInner
import { onClick, getValue, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/element.min.js";

// Helper: aktifkan / nonaktifkan border output
const elHasil = document.getElementById("hasil");
function aktif()  { elHasil.classList.add("hasil-aktif"); }
function nonaktif(){ elHasil.classList.remove("hasil-aktif"); }

// Pasang event listener pada button id="btnCari"
onClick("btnCari", function () {
    const nama = getValue("pokemon");

    if (!nama) {
        setInner("hasil", "Masukkan nama pokemon terlebih dahulu.");
        return;
    }

    const url = "https://pokeapi.co/api/v2/pokemon/" + nama.toLowerCase();
    nonaktif();
    setInner("hasil", "Loading...");

    // Gunakan fetch native — lebih reliable untuk public API
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Pokemon tidak ditemukan");
            }
            return response.json();
        })
        .then(function (data) {
            setInner("hasil",
                "<h3>" + data.name + "</h3>" +
                "<img src='" + data.sprites.front_default + "' />" +
                "<p>Tinggi: " + (data.height / 10) + " m</p>" +
                "<p>Berat: " + (data.weight / 10) + " kg</p>"
            );
            aktif();
        })
        .catch(function (error) {
            aktif();
            setInner("hasil", "Error: " + error.message);
        });
});