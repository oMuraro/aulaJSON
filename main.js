const diasSem = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
const mesElem = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

async function getDados(ano) {
    const dados = await fetch("./aulas.json").then(async res => {
        const dias = await res.json();
        return dias;
    })
    return dados[ano];
}

async function criarDias() {
    const dados = await getDados("2022");

    mesElem.forEach(function(mes) {
        const elemMes = document.querySelector("."+mes);
        let dias = dados[elemMes.dataset.mes];
        
        dias.forEach(function(dia) {
            const elemSemana = document.querySelector("tr."+dia.dia_semana);
            const elemDia = document.createElement("td");
            if(dia.quantidade < 2) {
                elemDia.setAttribute("class", "dia ruim");
            } else if(dia.quantidade < 4) {
                elemDia.setAttribute("class", "dia medio");
            } else {
                elemDia.setAttribute("class", "dia bom");
            }
            elemDia.innerHTML = dia.quantidade;

            const divElem = document.createElement("div");
            divElem.innerHTML = "QTDE: "+dia.quantidade + " Dia: "+dia.dia;
            divElem.setAttribute("class", "info");
            elemDia.appendChild(divElem);

            elemDia.addEventListener("mouseenter", function() {
                divElem.classList.add("show")
            });
            elemDia.addEventListener("mouseleave", function() {
                divElem.classList.remove("show");
            });
            elemSemana.appendChild(elemDia); 
        });
    })
}

criarDias();