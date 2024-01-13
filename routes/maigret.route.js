import express from "express";
import {getInfoTop10} from '../controllers/maigret.controller.js'

export const router = express.Router();

router.get("/:username", getInfoTop10);