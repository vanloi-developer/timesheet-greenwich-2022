import { error } from './../middlewares/error';
import ApiRouter from './ApiRouter';
import { BaseRouter } from './BaseRouter';
import express from 'express';
// import bodyParser = require("body-parser");
import cors = require('cors');
import path = require('path');
import bodyParser = require('body-parser');

class IndexRouter extends BaseRouter {
   constructor() {
      super();
      this.configure();
      this.init();
   }

   private configure() {
      this.router.use(cors());
      this.router.use(bodyParser.json());
      this.router.use(bodyParser.urlencoded({ extended: true }));
      this.router.use(express.static(path.resolve('src/public')));
   }

   //Manage all routes
   protected init() {
      this.router.use('/api', ApiRouter);
      this.router.use(error);
   }
}

export = new IndexRouter().router;
