import express from "express";
import { bookTimeSlot, getApiKey, getBookings, getGroundById, getGrounds, userLogin, userSignup ,deleteBookingById} from "../controllers/userController.js";
import { authenticateJWT } from "../utils/jwtAuth.js";

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/grounds', getGrounds);
router.get('/ground/:id', getGroundById);
router.post('/book-slot/:id', authenticateJWT, bookTimeSlot);
router.get('/bookings', authenticateJWT, getBookings);
router.get('/api-key', getApiKey);

router.delete('/delete-booking/:id', authenticateJWT, deleteBookingById);

export default router;