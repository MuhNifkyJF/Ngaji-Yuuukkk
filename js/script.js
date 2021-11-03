const url = "https://equran.id/api";
const surat ="surat";
const tafsir ="tafsir";
const GetSurat =`${url}/${surat}`;
const GetTafsir =`${url}/${tafsir}`;
const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");


function getSurah(){
    title.innerHTML = "Alquran";
    fetch(GetSurat)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let baca ="";
            let i = 1;
            resJson.forEach(membaca => {
                baca += `
                <div class="col s6 m6 l4">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="https://www.freepnglogos.com/uploads/al-quran-png/al-quran-tokyo-iqra-international-school-home-35.png">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">Surah ${membaca.nama_latin}<i class="material-icons right">more_vert</i></span>
                            <p>${membaca.nomor}</p>
                            <p>${membaca.nama}</p>
                            <p>${membaca.arti}</p>
                            <p>${membaca.tempat_turun}</p>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">Keterangan<i class="material-icons right">close</i></span>
                            <p>${membaca.deskripsi}</p>
                        </div>
                        <div class="card-action">
                            <a href="#" class="primary-content" data-id="${membaca.nomor} ">DENGARKAN</a>
                            <a href="#" class="secondary-content" data-id="${membaca.nomor}">BACA</a>
                        </div>
                    </div>
                </div>

                `;
                i++;
            });
            contents.innerHTML = `${baca}`;
            const read = document.querySelectorAll('.secondary-content');
            read.forEach(btn=>{
                btn.onclick=(event)=>{
                getNgaji(event.target.dataset.id);
                console.log(event.target.dataset.id);
                }   
            })
            const read2 = document.querySelectorAll('.primary-content');
            read2.forEach(btn=>{
                btn.onclick=(event)=>{
                DengarAyat(event.target.dataset.id);
                console.log(event.target.dataset.id);
                }   
            })
        }).catch(err => {
            console.error(err);
        })       
}

function DengarAyat(id){
    let urlAPI = GetSurat+"/"+id;
    title.innerHTML = "Dengarkan Ayat";
    fetch(urlAPI)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            contents.innerHTML = `
            <audio controls>
                <source src="${resJson.audio}" type="audio/mpeg">
            </audio>
            `;
        }).catch(err => {
            console.error(err);
        })       

}

function getNgaji(id){
    let url = GetSurat + "/" + id;
    title.innerHTML = "Surah";
    fetch(url)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.ayat);
            let baca = "";
            let nomor = 1;
            resJson.ayat.forEach(membaca => {
                baca += `
                <table>
                <thead>
                <tr>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>${nomor}</td>
                    <td>${membaca.ar}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>${membaca.tr}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>${membaca.idn}</td>
                </tr>
                </tbody>
            </table>
                `;
                nomor++;
            });

            contents.innerHTML = `
            <div class="card">
            <table class="stripped responsive-table">
                <thead>
                </thead>
                <tbody>
                    ${baca}
                </tbody>
            </table>
            
        </div>`;
        }).catch(err => {
            console.error(err);
        })

}
function DengarAyatLengkap(){
    title.innerHTML = "Dengarkan Ayat";
    fetch(GetSurat)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let baca = "";
            let nomor = 1;
            resJson.forEach(membaca => {
                baca += `
            <div class="col s6 m6 l4">
                <li ">
                    <span class="title">${nomor}.  ${membaca.nama_latin}</span>
                    <p> Artinya :${membaca.arti} <br>
                        Tempat Diturunkan :${membaca.tempat_turun}<br>
                        Jumlah Ayat :${membaca.jumlah_ayat} ayat<br>
                    </p>
                    <audio controls>
                        <source src="${membaca.audio}" type="audio/mpeg">
                    </audio>
                </li>
                </div>
                `;
                nomor++;
            });
            contents.innerHTML = `${baca}
            `;
        }).catch(err => {
            console.error(err);
        })  
}
function loadPage(page) {
    switch (page) {
        case "alquran":
            getSurah();
            break;
        case "ayat":
            DengarAyatLengkap();
            break;
    }
}
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "alquran";
    loadPage(page);
});
