const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const fileMiddleware = require("../middlewares/file.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/authUser/id", authMiddleware, userController.getAuthUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.patch(
  "/avatar",
  authMiddleware,
  fileMiddleware.single("avatar"),
  userController.editAvatar
);
router.patch("/editUser", authMiddleware, userController.editUser);
router.patch("/editInfo", authMiddleware, userController.postInfo);
router.patch("/bag/:id", authMiddleware, userController.fillTheBag);
router.patch("/bag/remove/:id", userController.removeFromBag);
router.patch("/favourites", authMiddleware, userController.addToFavourite);
router.patch(
  "/favourites/remove",
  authMiddleware,
  userController.removeFromFavourite
);
router.patch(
  "/:id/finished/:taskId",
  authMiddleware,
  userController.addToFinished
);
router.patch(
  "/:id/failed/:taskId",
  authMiddleware,
  userController.addToFailed
);
router.patch("/friends", authMiddleware, userController.addToFriends);
router.patch(
  "/friends/remove",
  authMiddleware,
  userController.removeFromFriends
);
router.patch("/blacklist", authMiddleware, userController.addToBlacklist);
router.patch(
  "/blacklist/remove",
  authMiddleware,
  userController.removeFromBlacklist
);
router.patch("/rating/:id", userController.addToRating);
router.patch(
  "/confirmation/:id",
  authMiddleware,
  userController.addToConfirmation
);
router.patch(
  "/confirmation/remove/:id",
  authMiddleware,
  userController.removeFromConfirmation
);
router.patch("/addWallet", authMiddleware, userController.addWallet);
router.patch("/wallet/deduct", authMiddleware, userController.deductFromWallet);

module.exports = router;
