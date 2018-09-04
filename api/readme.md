# Install
```
git clone
docker-compose up -d --build
```

On the first run of this app you'll have to run a migrations script. Paste the following in the command line

```
docker exec api_invitae_api_1 sequelize db:migrate
```

You should see output like this:

```
Sequelize CLI [Node: 10.9.0, CLI: 4.1.1, ORM: 4.38.0]

Loaded configuration file "config/config.json".
Using environment "production".
Tue, 04 Sep 2018 01:21:23 GMT sequelize deprecated String based operators are now deprecated. Please use Symbol based operators for better security, read more at http://docs.sequelizejs.com/manual/tutorial/querying.html#operators at node_modules/sequelize/lib/sequelize.js:242:13
== 20180825185604-create-customer: migrating =======
== 20180825185604-create-customer: migrated (0.037s)

== 20180825212727-create-order: migrating =======
== 20180825212727-create-order: migrated (0.027s)
```

## To Do
* New customer ids must be unique. Throw an error otherwise
* Handle timezones
  * Customer/Order seeding
  * Returning objects
  * Grouping Customers
* Add eslint
* Add babel
  * es6
  * ramda plugin

* How to test things that touch the database?
  * maybe mock sequelize methods?


* New Util Functions
  * Sorting Func

* Validations
  * What if uploaded csv doesn't match? Fail early