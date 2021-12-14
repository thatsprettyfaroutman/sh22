
## Summer Hunters 2020 -promo website

![porcuboi](https://github.com/hoxhunt/summer-hunters-22/blob/main/public/images/pixel-porcuboi.gif?raw=true)
![duckyduck](https://github.com/hoxhunt/summer-hunters-22/blob/main/public/images/pixel-duckyduck.gif?raw=true)
![snek](https://github.com/hoxhunt/summer-hunters-22/blob/main/public/images/pixel-snek.gif?raw=true)


### Good to know
Text content used is hosted in contentful. You'll need two env variables to dev & build. These can be set into .env.local file

`CONTENTFUL_SPACE_ID`
`CONTENTFUL_ACCESS_TOKEN`
### How to dev
`yarn && yarn dev` 

### Install to prod
- Ensure you have environment variables available
- Run `yarn build:prod`
- Commit built `docs` folder into `main` branch
- Wait 0-10 minutes until github pages propagate changes to live
