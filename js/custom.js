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

var objectCurrency = [{ name: "IDR", detail: "Indonesia Rupiah" }, { name: "USD", detail: "US Dollar" }, { name: "AUD", detail: "Australian Dollar" }, { name: "BGN", detail: "Bulgarian Lev" }, { name: "BRL", detail: "Brazilian Real" }, { name: "CAD", detail: "Canadian Dollar" }, { name: "CHF", detail: "Swiss Franc" }, { name: "CNY", detail: "Yuan Renminbi" }, { name: "CZK", detail: "Czech Koruna" }, { name: "DKK", detail: "Danish Krone" }, { name: "GBP", detail: "Pound Sterling" }, { name: "HKD", detail: "Hong Kong Dollar" }, { name: "HRK", detail: "Kuna" }, { name: "HUF", detail: "Forint" }, { name: "ILS", detail: "New Israeli Sheqel" }, { name: "INR", detail: "Indian Rupee" }, { name: "ISK", detail: "Iceland Krona" }, { name: "JPY", detail: "Yen" }, { name: "KRW", detail: "Won" }, { name: "MXN", detail: "Mexican Peso" }, { name: "MYR", detail: "Malaysian Ringgit" }, { name: "NOK", detail: "Norwegian Krone" }, { name: "NZD", detail: "New Zealand Dollar" }, { name: "PHP", detail: "Phillipine Peso" }, { name: "PLN", detail: "Zloty" }, { name: "RON", detail: "Romanian Leu" }, { name: "RUB", detail: "Russian Rubble" }, { name: "SEK", detail: "Swedish Krona" }, { name: "SGD", detail: "Singapore Dollar" }, { name: "THB", detail: "Baht" }, { name: "TRY", detail: "Turkish Lira" }, { name: "ZAR", detail: "Rand" }];

objectCurrency.forEach(result => {
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

let url = 'http://api.exchangeratesapi.io/v1/latest?access_key=b7962ff94e8bb972a375d4db55efeb58&format=1'
    // let convert = 'https://api.exchangeratesapi.io/v1/convert?access_key=b7962ff94e8bb972a375d4db55efeb58&format=1'
$.ajax({
    url: url,
    type: 'GET',
    success: (response => {
        let from = $("#from");
        let to = $("#to");

        // buat munculin key
        // console.log(response);
        $.each(response.rates, function(key, value) {
            from.append(`
                <option value=${key}>${key}</option>
            `);
            to.append(`
                <option value=${key}>${key}</option>
            `)
        });
    })
})

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

var min_yyyy = yyyy - 5;

var min_today = min_yyyy + '-' + mm + '-' + dd;
today = yyyy + '-' + mm + '-' + dd;


function compare() {
    let from = $("#from").val();
    let to = $("#to").val();
    let amount = $("#my-numb").val();

    $.ajax({
        url: url,
        type: 'GET',
        data: { from: from, to: to, amount: amount, date: today },
        success: (response => {
            let number = $("#my-numb").val();
            let parsNumber = parseInt(number);
            let timenya = $("#time");
            let today = response.date;
            var monthWording = { "01": "Januari", "02": "Februari", "03": "Maret", "04": "April", "05": "Mei", "06": "Juni", "07": "Juli", "08": "Agustus", "09": "September", 10: "Oktober", 11: "November", 12: "Desember" };

            let sliceMonth = today.slice(5, 7);
            let sliceDay = today.slice(8, 10)
            let sliceYear = today.slice(0, 4)

            let resultToday = `${sliceDay} ${monthWording[sliceMonth]} ${sliceYear}`

            timenya.text(resultToday);

            // console.log(response);

            $.each(response.rates, function(key, value) {
                var to = $("#to").val();
                var from = $("#from").val();
                if (key == to) {
                    // console.log('to', key);
                    var currency = parsNumber * value;
                    var theCurrency = currency.toLocaleString('id');
                    var result = $("#result");
                    console.log("hasilnya: ", currency);
                    result.text(`${theCurrency} - ${key}`)
                }
            });
        })
    })
}

function reverseNumber(input) {
    return [].map.call(input, function(x) {
        return x;
    }).reverse().join('');
}

function plainNumber(number) {
    return number.split('.').join('');
}

function oneDot(input) {
    var value = input.value,
        reversed = reverseNumber(plain),
        reversedWithDots = reversed.match(/.{1,3}/g).join('.'),
        normal = reverseNumber(reversedWithDots);
}