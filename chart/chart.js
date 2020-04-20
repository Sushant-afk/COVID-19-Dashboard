var canvas = document.getElementById('chart-canvas');
var ctx = canvas.getContext('2d');

var canvas1 = document.getElementById('chart-canvas-1');
var ctx1 = canvas1.getContext('2d');

var canvas2 = document.getElementById('chart-canvas-2');
var ctx2 = canvas2.getContext('2d');

var canvas3 = document.getElementById('chart-canvas-3');
var ctx3 = canvas3.getContext('2d');

let object = {

    type: 'bar',
    label:['Active cases','Recovered cases','Total deaths'],

    data: {
        labels: ['Active', 'Recovered', 'Deaths'],
        datasets: [{
            label: 'people',
            backgroundColor: ['rgba(0,0,0,0.6)','rgba(0,255,0,0.5)','rgba(255,0,0,0.3)'] ,
            borderColor: ['rgba(0,0,0)','rgba(0,255,0)','rgba(255,0,0)'],
            data: [0,0,0]
        }]
    },

}

let objectCountry = {

    type: 'line',
    label:[],

    data: {
        labels: [],
        datasets: [{
            label: 'Number of people infected from first day',
            backgroundColor:'rgba(0,0,0,0.6)',
            borderColor:'rgba(0,0,0)',
            data: []
        }]
    },

}

let objectCountry2 = {

    type: 'line',
    label:[],

    data: {
        labels: [],
        datasets: [{
            label: 'Number of people Recovered',
            backgroundColor:'rgba(0,255,0,0.3)',
            borderColor:'rgba(0,255,0)',
            data: []
        }]
    },

}

let objectCountry3 = {

    type: 'line',
    label:[],

    data: {
        labels: [],
        datasets: [{
            label: 'Number of people died due to covid-19',
            backgroundColor:'rgba(255,0,0,0.3)',
            borderColor:'rgba(255,0,0)',
            data: []
        }]
    },

}

class ChartClass
{

    static updateChartData(active,recovered,deaths)
    {
       [...object.data.datasets[0].data] = [active,recovered,deaths];  
       chart.update();
    }

    static updateCountryChartData([o1,o2,o3])
    {
        this.deleteOldChartData();

        for(let i = 0;i<o1.date.length;i++)
        {
          objectCountry.data.labels.push(new Date(o1.date[i]).toDateString());
          objectCountry.data.datasets[0].data.push(o1.case[i]);
          chart1.update();
        }
        for(let i = 0;i<o2.date.length;i++)
        {
          objectCountry2.data.labels.push(new Date(o2.date[i]).toDateString());
          objectCountry2.data.datasets[0].data.push(o2.case[i]);
          chart2.update();
        }
        for(let i = 0;i<o3.date.length;i++)
        {
          objectCountry3.data.labels.push(new Date(o3.date[i]).toDateString());
          objectCountry3.data.datasets[0].data.push(o3.case[i]);
          chart3.update();
        }

        console.log("a");

    }

    static deleteOldChartData()
    {
         // have to delete older daily data stored in chart data objects

         objectCountry.data.labels = [];
         objectCountry.data.datasets.forEach((dataset) => {dataset.data = []});
         objectCountry2.data.labels = [];
         objectCountry2.data.datasets.forEach((dataset) => {dataset.data = []});;
         objectCountry3.data.labels = [];
         objectCountry3.data.datasets.forEach((dataset) => {dataset.data = []});;

         chart.update();chart1.update();chart2.update();chart3.update();
         console.log("bbb");
    }
   
}

var chart = new Chart(ctx, object);
var chart1 = new Chart(ctx1,objectCountry);
var chart2 = new Chart(ctx2,objectCountry2);
var chart3 = new Chart(ctx3,objectCountry3);