# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

## Dokumentasi API Endpoint Untuk Gacha

1. Eksekusi Gacha (Utama)
Digunakan untuk melakukan percobaan undian gacha. Sistem akan mengecek limit harian dan ketersediaan hadiah secara otomatis.
URL: `POST /api/gacha`
Method: `POST`
Headers: `Content-Type: application/json`
Input (Request Body):
    ```json
    {
      "username": "string" // Nama user yang melakukan gacha
    }
    ```
Respons: Mengembalikan objek yang berisi status kemenangan dan detail hadiah jika menang.

2. Histori Gacha User (Poin Bonus 1)
Menampilkan riwayat lengkap percobaan gacha untuk 1 user yang ingin di cari.
URL: `/api/gacha/history/:username`
Method: `GET`
Parameter:
    `username`: Nama user yang ingin dicari historinya (misal: `/api/gacha/history/oscar`).
Respons:Array berisi daftar percobaan, tanggal, dan status (Menang/Zonk).

3. Daftar Sisa Kuota Hadiah (Poin Bonus 2)
Menampilkan data real-time sisa kuota hadiah yang tersedia di mongodb atlas.
URL: `/api/gacha/prizes`
Method: `GET`
Respons: Daftar hadiah beserta `total_quota` dan `remaining_quota`.

4. Daftar Pemenang Ter-masking (Poin Bonus 3)
Menampilkan daftar seluruh pemenang hadiah dengan nama yang disamarkan.
URL: `/api/gacha/winners`
Method: `GET`
Respons: Daftar pemenang dengan format nama yang disamarkan (Contoh: `O**ar`) dan nama hadiah yang didapatkan.
