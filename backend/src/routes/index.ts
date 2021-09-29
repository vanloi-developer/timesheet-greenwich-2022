import { error } from './../middlewares/error';
import ApiRouter from './ApiRouter';
import { BaseRouter } from './BaseRouter';
import express from 'express';
// import bodyParser = require("body-parser");
import cors = require('cors');

class IndexRouter extends BaseRouter {
   constructor() {
      super();
      this.configure();
      this.init();
   }

   private configure() {
      this.router.use(cors());
      this.router.use(express.json());
      this.router.use(express.urlencoded({ extended: true }));
   }

   //Manage all routes
   protected init() {
      this.router.use('/api', ApiRouter);
      this.router.use(error);
   }
}

export = new IndexRouter().router;
