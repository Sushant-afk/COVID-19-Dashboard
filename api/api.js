let url = 'https://api.covid19api.com/summary';
let selector = document.querySelector('.lists');

const fetchData = async (url) => {

    let response = await fetch(url);
    let json = await response.json();

    let responseObject = 
    {
        global:json.Global,
        countries:json.Countries
    }

    return responseObject;


}

let dataObject =  fetchData(url);

dataObject.then((data) => {

    getCountries(data.countries);
    
    CardUI.updateCardData('global',data);

    selector.addEventListener('change' , (e) => {

        CardUI.updateCardData(e.target.value,data);
        
    });

});


function getCountries(countries)
{

    countries.forEach((country) => {
       
     selector.innerHTML += ` <option valur = "${country.Country}">${country.Country}</option>  `;
        
    });
}

const fetchCountryData = async (country) => {

    let urlActive = `https://api.covid19api.com/dayone/country/${country}/status/confirmed`;
    let urlRecovered = `https://api.covid19api.com/dayone/country/${country}/status/recovered`;
    let urlDeaths = `https://api.covid19api.com/dayone/country/${country}/status/deaths`;
    
    let a_Response = await fetch(urlActive);
    let json = await a_Response.json();

    let r_Response = await fetch(urlRecovered);
    let json1 = await r_Response.json();

    let d_Response = await fetch(urlDeaths);
    let json2 = await d_Response.json();

    let cases = [];
    let dates = [];

    let jsonArray = [json,json1,json2];
    let objectArray = [];
    
   

    for(let i = 0;i<3;i++)
    {
        for(let j = 0;j<jsonArray[i].length;j++)
        { 
           if(jsonArray[i][j].Cases !== 0)
           { 
            cases.push(jsonArray[i][j].Cases);
            dates.push(jsonArray[i][j].Date);
           } 
        }
        

        const object = 
        {
          case:cases,
          date:dates
        }

        cases = [];
        dates = [];

        objectArray.push(object);

   }

     ChartClass.updateCountryChartData(objectArray);
}


