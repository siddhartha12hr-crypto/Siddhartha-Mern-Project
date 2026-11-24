import { Router } from "express";
import {
  createBook,
  deleteBook,
  readBook,
  readSpecificBook,
  updateBookController,
  searchBookById,
} from "../controller/bookController.js";
import { uploadBookFiles } from "../utils/fileUpload.js";

const bookRouter = Router();

// /books - search by ID with query param
bookRouter.get("/search", searchBookById);

// /books - get all or create
bookRouter
  .route("/")
  .post(uploadBookFiles.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 }
  ]), createBook)
  .get(readBook);

// /books/:id - get, update, or delete specific book
bookRouter
  .route("/:id")
  .get(readSpecificBook)
  .patch(uploadBookFiles.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 }
  ]), updateBookController)
  .delete(deleteBook);

export default bookRouter;
