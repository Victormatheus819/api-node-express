
const express= require("express");
const router= express.Router();
const  controller = require( '../controllers/ProductControllers')
 const authService = require("../services/auth-service")
router.get("/",controller.get);
router.get("/slug/:slug",controller.getBySlug);
router.get("/admin/:id",controller.getById);
router.get("/tags/:tag",controller.getByTag);
 router.post("/",authService.IsAdmin,controller.post);
 router.put("/:id",authService.IsAdmin,controller.put);
 router.delete("/:id",authService.IsAdmin,controller.delete);

module.exports = router;