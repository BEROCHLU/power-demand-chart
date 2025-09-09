# Power Demand Chart

![page1](https://user-images.githubusercontent.com/42054433/132652050-cef34bf0-7228-4a53-b6b9-dba8404c4b9d.JPG)  
![page2](https://user-images.githubusercontent.com/42054433/132651939-c1bd24d9-6d05-4913-922b-ab9f23ff22d5.JPG)   

---

## Deployment URL  
[http://aws-s3-tokyo.s3-website-ap-northeast-1.amazonaws.com/](http://aws-s3-tokyo.s3-website-ap-northeast-1.amazonaws.com/)

## Description  
This project is a chart that displays the power supply and demand situation in Japan over time. It provides diverse visualizations such as energy breakdowns of supply and demand, heatmaps, and stacked graphs.

## Data Source  
The data is public and provided by the OCCTO (Organization for Cross-regional Coordination of Transmission Operators, Japan) under the Agency for Natural Resources and Energy, Ministry of Economy, Trade and Industry.

## Server  
Static site hosting: AWS S3

## Build Environment  
- Webpack  
- Babel (ES6 → ES5 transpilation)

## Continuous Integration / Delivery  
- GitHub Actions

## Tech Stack / Libraries  
- [ECharts](https://echarts.apache.org/): High-performance charting library  
- [jQuery](https://jquery.com/): DOM manipulation, event management  
- [Lodash](https://lodash.com/): Data manipulation utilities  
- [Day.js](https://day.js.org/): Lightweight date handling library  
- [Crossfilter](http://square.github.io/crossfilter/): High-speed data filtering  
- [Math.js](https://mathjs.org/): Mathematics functions library

---

## Usage

1. Select any period and energy type, then click the "Change" button.  
2. You can switch charts and analyze data while referring to annotations and legends.

---

## Development Environment Setup

```bash
# Install dependencies
npm install

# Build (production mode)
npm run build

# Development mode (watch)
npm run build-w
```

---

## Data Creation

Run the following command to create data:

```bash
npm run create-data
```

---

## License

MIT License