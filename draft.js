const timestamps = [
    '2021-02-23T09:33:21.510+00:00',
    '2021-02-23T09:20:11.677+00:00',
    '2021-02-23T09:35:20.967+00:00'
];

const dates = timestamps
.map(timestamp => new Date(timestamp).getTime()).sort((a,b) => a - b)
const lastTime = dates[dates.length - 1];
console.log(now)
console.log(dates)
console.log((now - lastTime)  / (60 * 1000) / 60)