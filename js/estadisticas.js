if (document.getElementById("house")) {
    var camara = "house"

}

if (document.getElementById("senate")) {
    var camara = "senate"
}
$(document).ready(
    $.ajax({
        url: `https://api.propublica.org/congress/v1/113/${camara}/members.json`,
        headers: {
            "X-API-Key": "w7e7xGUpZfpzbRS3ZGCd3owxngbkHT8Rnaut2xZ7"

        },
        success: function (house) {
            var miembros = house.results[0].members
            miPrograma(miembros)
        }
    })
)


















function miPrograma(miembros) {


    var app = new Vue({
        el: '#app',
        data: {
            // Objeto Estadisticas

            R: 0,
            D: 0,
            I: 0,
            total: 0,
            votedWithPartyD: 0,
            votedWithPartyR: 0,
            votedWithPartyI: 0,
            leastLoyal: [],
            mostLoyal: [],
            leastEng: [],
            mostEng: [],
            listaMiembros: [],



        }
    })

    miembros.map(miembro => {
        app.listaMiembros.push(miembro)
    })
    console.log(app)
    //     //Cantidad de miembros de cada partido
    miembros.map(miembro => {
        if (miembro.party == "R") {
            app.R++

        } else if (miembro.party == "D") {
            app.D++
        } else if (miembro.party == "ID") {
            app.I++
        }

    })

    app.total = app.D + app.R + app.I
    //Consigo Array de votos de cada partido
    var arrayPorDem = []
    var arrayPorRep = []
    var arrayPorInd = []

    miembros.map(miembro => {
        if (miembro.party == "D") {
            arrayPorDem.push(miembro.votes_with_party_pct)
        } else if (miembro.party == "R") {
            arrayPorRep.push(miembro.votes_with_party_pct)
        } else if (miembro.party == "ID") {
            arrayPorInd.push(miembro.votes_with_party_pct)
        }


    })




    // OBTENGO 	% Voted w/ Party DE CADA PARTIDO 

    function votedWParty(arrayPorPartido, dondeLoGuardo) {

        var suma = arrayPorPartido.reduce((a, b) => a + b, 0)
        var cantidad = arrayPorPartido.length
        app[dondeLoGuardo] = parseFloat((suma / cantidad).toFixed(2)

        )
    }
    votedWParty(arrayPorDem, "votedWithPartyD")
    votedWParty(arrayPorRep, "votedWithPartyR")
    votedWParty(arrayPorInd, "votedWithPartyI")

    // console.log(app.)
    // console.log(votedWParty)
    var arraymiembD = []
    var arraymiembR = []
    var arraymiembInd = []

    miembros.map(miembro => {
        if (miembro.party == "D") {
            arraymiembD.push(miembro)
        } else if (miembro.party == "R") {
            arraymiembR.push(miembro)
        } else if (miembro.party == "ID") {
            arraymiembInd.push(miembro)
        }


    })

    // TOP Attendance


    var leasATT = miembros.slice()
    var leastAttendace = leasATT.filter(leasATT => leasATT.total_votes !== 0)
    leastAttendace.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)

    leastAttendace.length //105 longitud de miembros        10% = (longitud de miembros * 10 )100
    diezPCTMiembros = (leastAttendace.length * 10) / 100 // 10.5
    diezPCTMiembrosRed = Math.floor(diezPCTMiembros)
    app.leastEng = leastAttendace.slice(0, diezPCTMiembrosRed)



    var mostATT = miembros.slice()
    var mostAttendace = mostATT.filter(mostATT => mostATT.total_votes !== 0)
    mostAttendace.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
    mostAttendace.length
    diezPCTMiembros = (mostAttendace.length * 10) / 100
    diezPCTMiembrosRed = Math.floor(diezPCTMiembros)
    app.mostEng = mostAttendace.slice(0, diezPCTMiembrosRed)



    // TOP LOYAL
    var leastRoyal = miembros.slice()

    var leastLoyal1 = leastRoyal.filter(leastRoyal => leastRoyal.total_votes !== 0)
    // console.log(leastLoyal1)

    leastLoyal1.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
    leastLoyal1.length
    diezPCTMiembros = (leastLoyal1.length * 10) / 100
    diezPCTMiembrosRed = Math.floor(diezPCTMiembros)
    app.leastLoyal = leastLoyal1.slice(0, diezPCTMiembrosRed)

    var mostRoyal = miembros.slice()

    var mostLoyal1 = mostRoyal.filter(mostRoyal => mostRoyal.total_votes !== 0)
    // console.log(mostLoyal1)

    mostLoyal1.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
    mostLoyal1.length
    diezPCTMiembros = (mostLoyal1.length * 10) / 100
    diezPCTMiembrosRed = Math.floor(diezPCTMiembros)
    app.mostLoyal = mostLoyal1.slice(0, diezPCTMiembrosRed)




}


if (document.getElementById("boton")) {
    //Creo el boton y el evento Escuchar
    let boton = document.getElementById("boton")
    let texto = document.getElementById("more")

    boton.addEventListener("click", () => {
        if (boton.innerText == "Read More") {
            boton.innerText = "Read Less"
            texto.style.display = "Block"
        } else {
            boton.innerText = "Read More"
            texto.style.display = "none"

        }
    })
} 

