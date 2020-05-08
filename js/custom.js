
$("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

$("#my-numb").on("keyup", function() {
    $(this).toLocaleString('id')
});

$()

var objectCurrency=[{name:"IDR",detail:"Indonesia Rupiah"},{name:"USD",detail:"US Dollar"},{name:"AUD",detail:"Australian Dollar"},{name:"BGN",detail:"Bulgarian Lev"},{name:"BRL",detail:"Brazilian Real"},{name:"CAD",detail:"Canadian Dollar"},{name:"CHF",detail:"Swiss Franc"},{name:"CNY",detail:"Yuan Renminbi"},{name:"CZK",detail:"Czech Koruna"},{name:"DKK",detail:"Danish Krone"},{name:"GBP",detail:"Pound Sterling"},{name:"HKD",detail:"Hong Kong Dollar"},{name:"HRK",detail:"Kuna"},{name:"HUF",detail:"Forint"},{name:"ILS",detail:"New Israeli Sheqel"},{name:"INR",detail:"Indian Rupee"},{name:"ISK",detail:"Iceland Krona"},{name:"JPY",detail:"Yen"},{name:"KRW",detail:"Won"},{name:"MXN",detail:"Mexican Peso"},{name:"MYR",detail:"Malaysian Ringgit"},{name:"NOK",detail:"Norwegian Krone"},{name:"NZD",detail:"New Zealand Dollar"},{name:"PHP",detail:"Phillipine Peso"},{name:"PLN",detail:"Zloty"},{name:"RON",detail:"Romanian Leu"},{name:"RUB",detail:"Russian Rubble"},{name:"SEK",detail:"Swedish Krona"},{name:"SGD",detail:"Singapore Dollar"},{name:"THB",detail:"Baht"},{name:"TRY",detail:"Turkish Lira"},{name:"ZAR",detail:"Rand"}];

objectCurrency.forEach ( result => {
    $("#myTable").append(`
        <tr>
            <td>${result.name}</td>
            <td>${result.detail}</td>
        </tr>
    `)
})

function swap() {
    let a = $("#from").val();
    let b = $("#to").val();
    [a, b] = [b, a];
    $("#from").val(a);
    $("#to").val(b)
}

$("#from")

let url = 'https://api.exchangeratesapi.io/latest'
$.ajax({
    url: url,
    type: 'GET',
    success: (response => {
        let from = $("#from");
        let to = $("#to");
        // buat munculin key
        $.each(response.rates, function(key, value){
            from.append(`
                <option value=${key}>${key}</option>
            `);
            to.append(`
                <option value=${key}>${key}</option>
            `)				
        });
    })
})

function compare(){
    let from = $("#from").val();
    let to = $("#to").val();
    $.ajax({
        url: url,
        type: 'GET',
        data: { base: from, symbols: to },
        success: (response => {
            let number = $("#my-numb").val();
            let parsNumber = parseInt(number);
            let timenya = $("#time");
            let today = response.date;
            var monthWording={"01":"Januari","02":"Februari","03":"Maret","04":"April","05":"Mei","06":"Juni","07":"Juli","08":"Agustus","09":"September",10:"Oktober",11:"November",12:"Desember"};

            let sliceMonth = today.slice(5,7);
            let sliceDay = today.slice(8,10)
            let sliceYear = today.slice(0,4)
            
            let resultToday = `${sliceDay} ${monthWording[sliceMonth]} ${sliceYear}`
            
            timenya.text(resultToday);

            $.each(response.rates, function(key, value){
                var currency = parsNumber * value;
                var theCurrency = currency.toLocaleString('id');
                var result = $("#result");
                console.log("hasilnya: ", currency);
                result.text(`${theCurrency} - ${key}`)
            });
        })
    })
}