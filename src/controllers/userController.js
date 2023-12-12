import express from "express";
import {
    signupService,
    signinService,
    logoutService,
    changeUserRoleService,
    uploadDocumentsService,
} from "../services/userService.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Configura la carpeta de destino según el tipo de documento
        if (file.fieldname === "profileImage") {
            cb(null, "uploads/profiles");
        } else if (file.fieldname === "productImage") {
            cb(null, "uploads/products");
        } else if (file.fieldname === "document") {
            cb(null, "uploads/documents");
        } else {
            cb(new Error("Invalid fieldname"));
        }
    },
    filename: function (req, file, cb) {
        // Genera un nombre de archivo único
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage
});

router.post("/:uid/documents", upload.array("documents"), async (req, res) => {
    try {
        const {
            uid
        } = req.params;
        const documents = req.files.map((file) => {
            return {
                name: file.originalname,
                reference: file.path,
            };
        });

        const result = await uploadDocumentsService(uid, documents);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

router.post("/premium/:uid", changeUserRoleController);

export default router;