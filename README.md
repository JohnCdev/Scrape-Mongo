# Scrape-Mongo

## Deployed URL
https://pacific-retreat-79059.herokuapp.com/

## Description:
Full-stack application using node and mongodb. Scrape NPR.org for the newest articles and see them on the site. Add notes to articles and reference them later, or scrape for the newset articles.

## Functionality/Pages

- Scrape - Scrapes the nprg.org site for all headline articles and stores them in the mongo database.Removes the older articles.

- Load Articles - Loads articles from the latest scrape.

- Clear Articles - Clears the page of articles, does not clear database.

- Add/See Note - Add and save a note to an article, See note on previously saved articles

## Technologies:
- Node.js
- Jquery
- mongodb
- Materialize

## Packages:
- Express
- axios
- mongoose
- cheerio
