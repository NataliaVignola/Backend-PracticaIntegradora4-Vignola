import {
    Router
} from "express";
import {
    changeUserRoleController,
    uploadDocumentsController,
} from "../controllers/userController";

const router = Router();

router.post("/premium/:uid", changeUserRoleController);
router.post("/:uid/documents", uploadDocumentsController);

export default router;