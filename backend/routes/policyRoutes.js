import express from 'express'
import { getCarData, getCarMake, submitPolicy, updatePolicy } from '../controllers/policyController.js';

const policyRouter = express.Router();

policyRouter.post("/submitPolicy", submitPolicy)
policyRouter.get("/getCarMakeYear", getCarMake)
policyRouter.post("/getCarData", getCarData)
policyRouter.post("/updatePolicy", updatePolicy)


export default policyRouter;