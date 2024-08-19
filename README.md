![page1](https://user-images.githubusercontent.com/42054433/132652050-cef34bf0-7228-4a53-b6b9-dba8404c4b9d.JPG)  
![page2](https://user-images.githubusercontent.com/42054433/132651939-c1bd24d9-6d05-4913-922b-ab9f23ff22d5.JPG)  
---
## Deployment
Deployment Url: http://aws-s3-tokyo.s3-website-ap-northeast-1.amazonaws.com/  

## Description
A time series chart depicting power supply and demand in Japan.  
Data source: Publicly available and provided by OCCTO.  
Server: AWS S3  

## Build
Build: webpack, babel  

## CI/CD
CI/CD: GitHub Actions  

## Project Structure

## Scripts
- `build`: `npx webpack`
- `build-v`: `npx webpack --mode=development`
- `build-w`: `npx webpack --watch`
- `postbuild`: `npx postcss ./dev/css/style.css --config postcss.config.js -o ./dist/css/ms-style.css`
- `create-data`: `cd ./test && npx ts-node ./create-rowdata.ts`

## Dependencies
- `@babel/cli`: `^7.24.8`
- `@babel/core`: `^7.25.2`
- `@babel/preset-env`: `^7.25.3`
- `autoprefixer`: `^10.4.20`
- `babel-loader`: `^8.3.0`
- `core-js`: `^3.38.0`
- `crossfilter2`: `^1.5.4`

## Workflows
### Babel Load
Defined in `.github/workflows/babel-load.yml`:
- Runs on push to `master` branch
- Uses Node.js 16
- Builds the project using webpack
- Uploads artifacts to AWS S3
