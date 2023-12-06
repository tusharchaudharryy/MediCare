const { PaymentModel } = require("../models/paymentModel");

const getPayments = async (req, res) => {
    try {
      const payments = await PaymentModel.find().populate({
        path: "reportID",
      });
      res.status(200).send(payments);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Something went wrong" });
    }
  }

const addPayment = async (req, res) => {
    const payload = req.body;
    try {
      const payment = new PaymentModel(payload);
      await payment.save();
      res.send({ message: "Payment created successfully" });
    } catch (error) {
      res.send("Error occurred, unable to receive the payment.");
      console.log(error);
    }
  }

const updatePayment = async (req, res) => {
    const id = req.params.paymentId;
    const payload = req.body;
    try {
      const payment = await PaymentModel.findByIdAndUpdate({ _id: id }, payload);
      if (!payment) {
        res.status(404).send({ msg: `Payment with id ${id} not found` });
      }
      res.status(200).send(`Payment with id ${id} updated`);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Something went wrong, unable to Update." });
    }
  }

const deletePayment =  async (req, res) => {
    const id = req.params.paymentId;
    try {
      const payment = await PaymentModel.findByIdAndDelete({ _id: id });
      if (!payment) {
        res.status(404).send({ msg: `Payment with id ${id} not found` });
      }
      res.status(200).send(`Payment with id ${id} deleted`);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Something went wrong, unable to Delete." });
    }
  }

module.exports = {
    getPayments,
    addPayment,
    updatePayment,
    deletePayment
}