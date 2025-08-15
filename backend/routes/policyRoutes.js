import express from 'express'
import { getCarMake, submitPolicy } from '../controllers/policyController.js';

const policyRouter = express.Router();

policyRouter.post("/submitPolicy", submitPolicy)
policyRouter.get("/getCarMakeYear", getCarMake)


export default policyRouter;