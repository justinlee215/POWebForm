const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const express = require('express')

const mongoose = require("mongoose");
const AdminJSMongoose = require("@adminjs/mongoose");
const { Book } = require("./model/book.model.js");

const mongoDB = require('./dbConnect');

const PORT = 3000

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const startAdminJS = async () => {
  const app = express()

  const mongooseDB = await mongoDB;

  const BookResourceOptions = {
    databases: [mongooseDB],
    resource: Book,
    options: {
      actions: {
        GetJsonData: {
          actionType: "record",
          component: false,
          handler: (request, response, context) => {
            const { record, currentAdmin } = context;
            console.log("record", record);
            return {
              record: record.toJSON(currentAdmin),
              msg: "Hello world",
            };
          },
        },
      },
    },
  };

  const adminOptions = {
    rootPath: "/admin",
    resources: [BookResourceOptions],
  };

  const admin = new AdminJS({})

  const adminRouter = AdminJSExpress.buildRouter(admin)



  
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}, AdminJS server started on URL: http://localhost:${PORT}${admin.options.rootPath}`)
  })

  const DEFAULT_ADMIN = {
    email: 'developer@admin.com',
    password: 'administrator',
  }
  
  // handle authentication
  const authenticate = async (email, password) => {
    //condition to check for correct login details
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      //if the condition is true
      return Promise.resolve(DEFAULT_ADMIN)
    }
    //if the condition is false
    return null
  }
  

}

startAdminJS()