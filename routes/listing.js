const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controller/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

router
  .route("/")
  // INDEX
  .get(wrapAsync(listingController.index))
  // CREATE (protected)
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// NEW (protected)
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  // SHOW
  .get(wrapAsync(listingController.showListing))
  // UPDATE (protected)
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  // DELETE (protected)
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// EDIT (protected)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;
