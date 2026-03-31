# Praktikum 03 - CORS dengan JSCroot

Implementasi CORS (Cross-Origin Resource Sharing) menggunakan library JSCroot dan ES6+ Modules pada halaman HTML statis.

## Deskripsi

Proyek ini merupakan demonstrasi sederhana cara mengambil data dari API eksternal (PokeAPI) menggunakan JSCroot. Proyek ini juga menjelaskan konsep CORS secara praktis melalui contoh nyata.

## Konsep CORS

CORS adalah mekanisme keamanan browser yang membatasi halaman web dari mengakses resource di domain yang berbeda. Browser akan memblokir request lintas domain kecuali server tujuan mengirimkan header izin berikut:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

Penanganan CORS dilakukan di sisi **server**, bukan di kode JavaScript.

## Struktur Proyek

```
Praktikum 03/
├── index.html   # Tampilan utama
├── style.css    # Styling dengan Tailwind CDN + custom CSS
└── main.js      # Logika aplikasi menggunakan JSCroot (ES6 Module)
```

## Teknologi

| Teknologi | Kegunaan |
|---|---|
| JSCroot (`jscroot/lib`) | Manipulasi DOM dan HTTP request |
| Tailwind CSS CDN | Utility class untuk layout |
| PokeAPI | Sumber data eksternal (mendukung CORS) |
| ES6 Modules | Sistem import/export JavaScript modern |

## Cara Menjalankan

Karena menggunakan ES6 Modules, file tidak bisa dibuka langsung via `file://`. Gunakan salah satu cara berikut:

**Python (direkomendasikan):**
```bash
python -m http.server 8080
```
Akses di browser: `http://localhost:8080`

**Node.js:**
```bash
npx serve .
```

## Cara Penggunaan

1. Jalankan server lokal
2. Buka browser dan akses `http://localhost:8080`
3. Ketik nama Pokemon pada kolom input (contoh: `pikachu`, `bulbasaur`)
4. Klik tombol **Cari**
5. Data Pokemon akan ditampilkan beserta gambar, tinggi, dan berat

## Penjelasan Kode

### `main.js`

```js
// Import fungsi dari JSCroot via CDN
import { onClick, getValue, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/element.min.js";

// Tangkap klik tombol, ambil input, kirim request ke PokeAPI
onClick("btnCari", function () {
    const nama = getValue("pokemon");
    fetch("https://pokeapi.co/api/v2/pokemon/" + nama)
        .then(res => res.json())
        .then(data => setInner("hasil", data.name));
});
```

- `onClick(id, fn)` — menangani event klik pada elemen dengan id tertentu
- `getValue(id)` — mengambil nilai dari input
- `setInner(id, html)` — mengisi konten HTML ke elemen tujuan

### `index.html`

Menggunakan `type="module"` pada tag script agar ES6 import dapat berjalan di browser:

```html
<script type="module" src="main.js"></script>
```

## Referensi

- [JSCroot GitHub](https://github.com/jscroot/lib)
- [PokeAPI](https://pokeapi.co/)
- [MDN - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [MDN - ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
