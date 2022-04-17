'use strict';
const $ = function(id) {
    return document.getElementById(id);
}

let createChart = function(chartData) {
    let chart = document.createElement('div');
    chart.setAttribute('id', 'chart');
    chart.style.position = 'relative';
    let chartHeight = 0;
    for (let i = 0; i < chartData.length; i++) {
        chartHeight = Math.max(chartHeight, chartData[i].spending);
    }

    chart.style.height = (chartHeight * 0.25 + 20) + 'px';
    chart.style.borderStyle = 'solid';
    chart.style.borderWidth = '1px';
    chart.style.marginTop = '1em';
    chart.style.marginBottom = '2em';

    let barPosition = 50;
    let barWidth = 50;

    let width = chartData.length * (barWidth * 1.5) + 200;
    chart.style.width = width + 'px';

    for (let j = 0; j < chartData.length; j++) {
        let arrItem = chartData[j];
        let bar = document.createElement('div');
        chart.appendChild(bar);
        bar.setAttribute('id', 'bar-' + [j]);
        bar.className = 'bar';
        bar.style.position = 'absolute';
        bar.style.left = barPosition + 'px';
        bar.style.width = barWidth + 'px';
        bar.style.backgroundColor = arrItem.color;
        bar.style.borderTopLeftRadius = '10px';
        bar.style.borderTopRightRadius = '10px';
        bar.style.borderWidth = '1px';
        bar.style.borderBottomColor = arrItem.color;
        bar.style.bottom = '0px';
        barPosition += (barWidth * 2);

        let height = 0;
        (function() {
            height = setInterval(setHeight, 1);
            function setHeight() {
                if (height <arrItem.spending) {
                    height += 10;
                    bar.style.height = height * 0.25 + 'px';
                }
            }
        })();

        let barCategory = document.createElement('div');
        barCategory.className = 'barCat';
        barCategory.innerHTML = arrItem.category + '<br>$' + arrItem.spending.toFixed(2);
        barCategory.style.fontSize = '80%';
        barCategory.style.textAlign = 'center';
        barCategory.style.padding = '5px';
        barCategory.style.fontWeight = 'bold';
        bar.appendChild(barCategory);
    }
    return chart;
}

let resetChart = function() {
    let bars = document.getElementsByClassName('bar');
    let categories = document.getElementsByClassName('barCat');
    for (let i = 0; i < bars.length; i++) {
        let bar = bars[i];
        let barCategory = categories[i];
        bar.style.height = 0 + 'px';
        barCategory.style.display = 'none';
    }
}

let init = function() {
    let chartData = [
        {category: 'Food and Dining', spending: 2005.00, color: '#3399FF'},
        {category: 'Auto and Transport', spending: 1471.31, color: '#FF9933'},
        {category: 'Shopping', spending: 892.86, color: '#66CC99'},
        {category: 'Bills and Utilities', spending: 531.60, color: '#FFFF66'},
        {category: 'Mortgage', spending: 1646.00, color: '#FF3333'},
        {category: 'Entertainment', spending: 179.52, color: '#CCFFFF'},
    ];

    let spendChart = createChart(chartData)
    $('spendChart').appendChild(spendChart);

    $('reset-btn').onclick = resetChart;
}

if (addEventListener) {
    window.addEventListener('load', init, false);
} else {
    window.attachEvent('onload', init);
}