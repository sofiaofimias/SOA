const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const firestore = admin.firestore();

exports.addReservation = functions.https.onRequest(async (req, res) => {
  try {
    const { dogName, checkInDate, checkOutDate } = req.body;

    if (!dogName || !checkInDate || !checkOutDate) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const reservationRef = await firestore.collection("reservations").add({
      dogName,
      checkInDate,
      checkOutDate,
    });

    return res.json({ result: `Reservation added with ID: ${reservationRef.id}` });
  } catch (error) {
    console.error("Error adding reservation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

exports.checkInDog = functions.https.onRequest(async (req, res) => {
  try {
    const { reservationId } = req.body;

    if (!reservationId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    await firestore.collection("reservations").doc(reservationId).update({
      checkedIn: true,
    });

    return res.json({ result: "Dog checked in successfully" });
  } catch (error) {
    console.error("Error checking in dog:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
