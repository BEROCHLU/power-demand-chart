# ⚡ Japan Power Demand Chart

<p align="right">
  <a href="./README.md">日本語</a> | <strong>English</strong>
</p>

[![Deploy to S3](https://github.com/BEROCHLU/power-demand-chart/actions/workflows/deploy-s3.yml/badge.svg)](https://github.com/BEROCHLU/power-demand-chart/actions/workflows/deploy-s3.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An interactive, high-performance web dashboard that visualizes Japan's power supply and demand situations over time. Built with modern web technologies, it allows users to analyze energy breakdowns, trends, and patterns through various specialized charts.

This repository compiles monthly CSV files into `dist/data/rowdata-all.json`, which is then loaded in the browser and rendered using ECharts. All aggregation and rendering are processed client-side without any server-side APIs.

![Dashboard preview 1](.github/image1.png)

![Dashboard preview 2](.github/image2.png)

## Deployment URL

The application is deployed using AWS S3 static website hosting:

[http://aws-s3-tokyo.s3-website-ap-northeast-1.amazonaws.com/](http://aws-s3-tokyo.s3-website-ap-northeast-1.amazonaws.com/)

Whenever a push is made to the `main` branch, GitHub Actions will automatically run `npm install`, `npm run build`, and sync the `dist` directory with the S3 bucket.

## Key Features

- Select target periods in month-level granularity.
- Visualize power demand and various power generation sources: `Power Demand`, `Nuclear`, `Geothermal`, `Hydro`, `Thermal`, `Biomass`, `Wind Power (Actual)`, `Wind Control (Suppression)`, `Solar Power (Actual)`, `Solar Control (Suppression)`, and `Pumping (Hydro Storage)`.
- Aggregate data in 1-hour, 1-day, 1-month, or 1-year granularities.
- Interactive features powered by ECharts `dataZoom` for scaling and panning timelines.
- ECharts toolbox options: data view, line/bar chart format switching, and save as image.
- Formats total values and axis labels dynamically to readable physical units like `MWh`, `GWh`, or `TWh` using a custom formatter.

## Screen Layout

The arrows at the bottom-middle of the screen switch between the 2 main pages.

### Page 1: Individual Item Trends

Page 1 focuses on a single category's hourly or historical trends.

- **Top-left controls**: Select target month and data item.
- **Top-middle panel**: Heatmap of Day x Hour.
- **Top-right panel**: Time series line chart of the selected month.
- **Bottom-left controls**: Select start month, end month, item, and aggregation unit (1hour, 1day, 1month, 1year).
- **Bottom-right panel**: Time series line chart for the selected period.

### Page 2: Energy Breakdown

Page 2 visualizes the relationship between total power demand and energy sources.

- **Left controls**: Select start month, end month, and aggregation unit (1hour, 1day, 1month, 1year).
- **Top panel**: Percentage stacked bar chart showing the energy breakdown of power demand.
- **Bottom panel**: Absolute stacked area/bar chart showing power demand and supply sources.
- **Legends**: Click legend items to toggle visibility of individual categories.
- **Sidebar**: Displays the calculated total values of visible categories for the selected period.

## Data Details

The current `dist/data/rowdata-all.json` dataset contains:

| Item | Details |
| --- | --- |
| Total Records | 65,063 |
| Date Range | 2018-10-01 to 2026-03-31 |
| Granularity | 1 hour |
| Base Unit | MWh |
| Input Files | `rawdata/data/*_10エリア計.csv` |
| Compiled Output | `dist/data/rowdata-all.json` |

*Note: Raw CSV files are compiled from general transmission and distribution companies' public releases. They are CP932/Shift_JIS encoded, and parsed using the `xlsx` library with `codepage: 932`.*

Important notes on the dataset:
- Current raw data files cover `201810_10エリア計.csv` through `202603_10エリア計.csv`.
- `2026-02` CSV data is missing in the current repository.
- In `2024-03`, there are 743 records (1 hour short).
- Totals may slightly differ from the sum of individual items due to rounding in raw files.

## Technical Stack

| Category | Technology |
| --- | --- |
| Charting | ECharts |
| Client-side Filtering/Grouping | crossfilter2 |
| Date/Time Library | dayjs |
| DOM / Tab Manipulation | jQuery |
| Object/Array Helpers | lodash |
| Bundler | Webpack |
| Data Compilation | TypeScript + xlsx |
| Deployment | GitHub Actions + AWS S3 |

## Directory Layout

```text
.
├── .github/
│   ├── image1.png
│   ├── image2.png
│   └── workflows/deploy-s3.yml
├── dev/
│   ├── css/style.css
│   └── src/
│       ├── jqtab.js
│       ├── native.js
│       └── vendor.js
├── dist/
│   ├── build/
│   │   ├── main.js
│   │   ├── vendor.js
│   │   └── vendor.js.LICENSE.txt
│   ├── css/style.css
│   ├── data/rowdata-all.json
│   ├── img/
│   └── index.html
├── rawdata/
│   ├── create-rowdata.ts
│   └── data/
├── package.json
├── tsconfig.json
└── webpack.config.js
```

Key Files:
- `dist/index.html`: Main HTML file served to clients.
- `dist/css/style.css`: Stylesheet with dark glassmorphic dashboard theme.
- `dev/src/native.js`: Data loading, aggregation, and ECharts drawing logic.
- `dev/src/jqtab.js`: Tab panel toggler.
- `rawdata/create-rowdata.ts`: Script converting monthly CSV files to `dist/data/rowdata-all.json`.
- `webpack.config.js`: Webpack bundle configuration.

## Setup

Requires Node.js 22.

```bash
npm install
```

## Build

To compile a production bundle:

```bash
npm run build
```

To compile with source maps for development:

```bash
npm run build-v
```

To watch files and rebuild on changes:

```bash
npm run build-w
```

*Note: Webpack compiles and outputs JS bundles. Static assets like `dist/index.html`, `dist/css/style.css`, `dist/data/rowdata-all.json`, and `dist/img` are loaded directly by the browser.*

## Local Verification

Since this application fetches `rowdata-all.json` dynamically, opening `dist/index.html` directly as a file (`file://`) will fail due to CORS restrictions. Please run a local HTTP server from the `dist` directory.

Example:

```bash
python3 -m http.server 8000 --directory dist
```

Then visit:
```text
http://localhost:8000/
```

## Data Update

When adding new monthly CSV files:

1. Drop the new CSV file formatted as `YYYYMM_10エリア計.csv` in `rawdata/data/`.
2. Run the data creation script:

```bash
npm run create-data
```

This runs `rawdata/create-rowdata.ts` and overwrites `dist/data/rowdata-all.json`.

*Note: `create-data` utilizes `npx ts-node`. If `ts-node` is not installed globally, `npx` will download and execute it automatically on first run.*

## Deployment

The GitHub Actions workflow defined in `.github/workflows/deploy-s3.yml` triggers on pushes to the `main` branch:

1. Checks out the repository.
2. Sets up Node.js 22.
3. Runs `npm install`.
4. Runs `npm run build`.
5. Authenticates with AWS via GitHub Secrets.
6. Backs up the current S3 bucket.
7. Deploys the built `dist` directory to `s3://aws-s3-tokyo`.

Required GitHub Secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

Target AWS region is `ap-northeast-1`.

## Development Notes

- The core logic is built with vanilla JavaScript. It does not use UI frameworks like React or Vue.
- `dist/data/rowdata-all.json` is around 16 MB. The charts are initialized after this JSON is completely fetched.
- `dev/src/vendor.js` is the pre-compiled vendor bundle. Normal development focuses on editing `dev/src/native.js` and `dev/src/jqtab.js`.
- `dist/css/style.css` is referenced directly by HTML. Make sure to update the static stylesheet for layout changes.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
