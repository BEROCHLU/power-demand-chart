# ⚡ Japan Power Demand Chart

[![Deploy to S3](https://github.com/BEROCHLU/power-demand-chart/actions/workflows/deploy-s3.yml/badge.svg)](https://github.com/BEROCHLU/power-demand-chart/actions/workflows/deploy-s3.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive, high-performance web dashboard that visualizes Japan's power supply and demand situations over time. Built with modern web technologies, it allows users to analyze energy breakdowns, trends, and patterns through various specialized charts.

![Dashboard Preview 1](https://github.com/BEROCHLU/power-demand-chart/blob/main/.github/image1.png)
![Dashboard Preview 2](https://github.com/BEROCHLU/power-demand-chart/blob/main/.github/image2.png)

---

## 🔗 Deployment URL
Live Website Hosted on AWS S3:  
👉 [http://aws-s3-tokyo.s3-website-ap-northeast-1.amazonaws.com/](http://aws-s3-tokyo.s3-website-ap-northeast-1.amazonaws.com/)

---

## 💡 Key Features

- **Rich Visualizations**:
  - **Heatmap**: Time-of-day (24h) vs. Date matrix showing demand intensities.
  - **Stacked Area/Bar Chart**: Visualizes generation breakdowns by energy sources (Nuclear, Thermal, Hydro, Solar, Wind, Biomass, etc.).
  - **Percentage Breakdown**: 100% stacked bar chart showing energy mix ratios over time.
  - **Time Series Line Chart**: Zoomable line charts for detailed demand tracking.
- **Flexible Aggregation Units**:
  - Instantly switch data granularity between **1 Hour** (raw hourly data), **1 Day** (daily totals), and **1 Month** (monthly totals).
- **Smart Unit Scaling**:
  - Automatically scales Y-axis labels and total summary calculations to the most readable physical unit (e.g., `MWh` ➔ `GWh` ➔ `TWh` ➔ `PWh`) depending on the selected range.
- **Interactive UI**:
  - High-performance dashboard with smooth tab transitions and zoomable chart scopes (DataZoom).

---

## 🗄️ Data Source & Architecture

- **Data Origin**: Public power supply and demand statistics provided by the **OCCTO** (Organization for Cross-regional Coordination of Transmission Operators, Japan) under the Agency for Natural Resources and Energy, Ministry of Economy, Trade and Industry.
- **Client-Side Heavy Architecture**: 
  - To minimize server dependencies, the application compiles raw data into a local store and executes high-speed multidimensional filtering and aggregation entirely on the client-side.

## 🖱️ How to Use

The dashboard consists of two main pages (panels). You can navigate the pages using the page selector buttons (◀ / ▶) at the bottom.

### 📌 Page 1: Heatmap & Demand Trends
This page is focused on visual intensity patterns and individual energy trends.
1. **Filter Data**: Use the left control panel to select the **Period**, **Energy Source**, and **Aggregation Unit** (1hour, 1day, or 1month).
2. **Apply Changes**: Click the **"Change" (変更)** button to refresh the Heatmap and Line Charts.
3. **Data Summaries**: Check the **"Total Power" (電力量合計)** in the sidebar to see the sum of the filtered range.

### 📌 Page 2: Energy Breakdowns & Mix Ratios
This page visualizes the energy generation mix and stacked capacities.
1. **Filter Range**: Select the start/end months and aggregation units in the left sidebar, then click **"Change" (変更)**.
2. **Interactive Analysis**:
   - **Legend Toggle**: Click on any energy source in the top legend (e.g., "Solar" or "Thermal") to toggle its visibility on/off. The stacked heights and percentage ratios will automatically recalculate.
   - **Zoom & Scroll**: Use the slide bar at the bottom of the charts (DataZoom) to zoom into specific date ranges or scroll through the timeline.
   - **Export Data/Images**: Hover over the top-right icons on any chart to open a data table view or download the chart as an image.

---

## 🛠️ Tech Stack & Libraries

- **Core Rendering & Charting**:
  - [ECharts (v5)](https://echarts.apache.org/): Core high-performance visualization library.
- **Data Engine**:
  - [Crossfilter2](https://github.com/crossfilter/crossfilter2): Ultra-fast client-side multidimensional filtering and data reduction.
- **Utilities**:
  - [Math.js (v12+)](https://mathjs.org/): For dynamic physical units handling and formatting.
  - [Day.js](https://day.js.org/): Lightweight datetime parser and ranges matcher.
  - [jQuery](https://jquery.com/) & [Lodash](https://lodash.com/): DOM operations and array manipulation helpers.
- **Bundler & Build Pipeline**:
  - [Webpack (v5)](https://webpack.js.org/): Lightweight ES6+ JS bundler (Optimized, no transpilation overhead for modern browsers).
  - [GitHub Actions](https://github.com/features/actions): CI/CD pipeline deploying updates automatically to AWS S3.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Recommended: v22 LTS)
- npm

### Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/BEROCHLU/power-demand-chart.git
cd power-demand-chart

# 2. Install dependencies
npm install

# 3. Build bundle for production (Outputs to ./dist/build/)
npm run build
```

Open [dist/index.html](dist/index.html) in your browser to view the application locally.

---

## 📊 Data Preparation (Optional)

If you need to update or regenerate the chart source data from raw statistics (Excel/CSV files from OCCTO):

1. Put the raw Excel/CSV data files in the `./test/data/` directory.
2. Run the parser script:
   ```bash
   npm run create-data
   ```
   This compiles the Excel rows into a consolidated JSON object array in `./dev/src/rowdata-all.js` used by the application.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.