let confirmedInfo = document.getElementById('confirmed-info');
let recoveryInfo = document.getElementById('recovered-info');
let deathInfo = document.getElementById('death-info');

var CHART = document.getElementById('manage-display');

class CardUI
{

    static updateCardData(country,data)
    {
     
       if(country === 'global')
       {
         CHART.style.display = "none";
         
          confirmedInfo.innerHTML = `
            New Confirmed cases : <b>${data.global.NewConfirmed}</b> <br>
            Total Active cases : <b>${data.global.TotalConfirmed}</b>
          `;

          recoveryInfo.innerHTML = `
            New Recovered cases : <b>${data.global.NewRecovered}</b> <br>
            Total Recovered cases : <b>${data.global.TotalRecovered}</b>
          `;

          deathInfo.innerHTML = `
          New Death cases : <b>${data.global.NewDeaths}</b> <br>
          Total Death cases : <b>${data.global.TotalDeaths}</b>
        `;


        ChartClass.updateChartData(data.global.TotalConfirmed,data.global.TotalRecovered,data.global.TotalDeaths);
      }

      else
      {
         
        let countryClicked = data.countries.find(countryItem => countryItem.Country === country);

        CHART.style.display = "block";
        
          confirmedInfo.innerHTML = `
          New Confirmed cases : <b>${countryClicked.NewConfirmed}</b> <br>
          Total active cases : <b>${countryClicked.TotalConfirmed}</b>
        `;

          recoveryInfo.innerHTML = `
          New Recovered cases : <b>${countryClicked.NewRecovered}</b> <br>
          Total Recovered cases : <b>${countryClicked.TotalRecovered}</b>
        `;
         
          deathInfo.innerHTML = `
          New Deaths : <b>${countryClicked.NewDeaths}</b> <br>
          Total Deaths : <b>${countryClicked.TotalDeaths}</b>
        `;
        

        ChartClass.updateChartData(countryClicked.TotalConfirmed,countryClicked.TotalRecovered,countryClicked.TotalDeaths);

        handleDailyInfo(countryClicked.Country);

      }

    }
}

function handleDailyInfo(countryName)
{
   let countryname = countryName.toLowerCase();
   let arr  = countryname.split(' ');

   let COUNTRY =  arr.join('-');


   console.log(COUNTRY);

   fetchCountryData(COUNTRY);
   
}

