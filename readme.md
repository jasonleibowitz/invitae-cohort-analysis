# Intro
Run cohort analysis between a list of customers and orders. This project accepts customers and orders as CSV files to be uploaded to a web front-end and will display a graphical representation of basic analysis. For more detailed analysis download the CSV.

# Getting Started

### Prerequisites
This project uses Docker, which will make starting it up incredibly simple. The only prerequisite you need to run this project is to ensure that [git is installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your machine so you can clone the repo and docker, so you can run the project.

On a mac I recommend installing [Docker Desktop](https://www.docker.com/products/docker-desktop). For any other informatio about installing docker see [this](https://docs.docker.com/install/).

## How to Run the App
After you cloned this repo, navigate to the project's root folder in your terminal. Then run the following command:

```
docker-compose up -d
```

You will see an output where the three applications (web front-end, api, and database) as all being build. As soon as that is finished, and especially if you are rebuilding the containers, you will need to run a quick migration script. You can do that by typing the following into your terminal:

```
docker exec api sequelize db:migrate
```

You can avoid having to do the migrations again by running `docker-compose pause` isntead of `docker-compose down`.

Once that's done you can visit the web front end by visiting `localhost:80`. The API is available behind port `3000` and the database is behind port `8001`.

# Project Structure
This project is in a monorepo, meaning that both the web front-end and the api exist within this one project.

* `/api` - As the name suggests, this is the repo for the application's API. It is build using [NodeJS](https://nodejs.org/en/) and [HapiJS](https://hapijs.com/) as the Node framework. It's using [Sequelize](http://docs.sequelizejs.com/) as the Postgres ORM.
* `/client` - This is the web front-end repo. This is a basic [React](https://reactjs.org/)/[Redux](https://redux.js.org/) application that is also using [ImmutableJS](https://facebook.github.io/immutable-js/) and [Redux Thunk](https://github.com/reduxjs/redux-thunk).

# Testing
Both the API and the Client app have unit tests run through [Jest](https://jestjs.io/). To run tests for either project just navigate to it, install any dependencies via `yarn install` then run `yarn test`.