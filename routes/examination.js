const express = require("express");
const router = express.Router();
const Examination = require("../models/Examination");
const Animal = require("../models/Animal");

// Yeni muayene oluşturma
router.post("/create", async (req, res) => {
  try {
    const {
      examinationNumber,
      animalEarTagNumber,
      examinationType,
      examinationDate,
      veterinaryInstitutionName,
      veterinaryClinicTradeName,
      veterinaryClinicCity,
      veterinaryClinicDistrict,
      veterinaryClinicVillage,
      veterinaryClinicAddress,
      personInChargeOfVeterinaryClinic,
      treatingDoctorID,
      treatingDoctorName,
      examinationDescription,
      examinationFee,
    } = req.body;

    // Hayvanın kulak numarasına sahip olup olmadığını kontrol et
    const existingAnimal = await Animal.findOne({
      earTagNumber: animalEarTagNumber,
    });
    if (!existingAnimal) {
      return res
        .status(404)
        .json({
          error: "Belirtilen kulak numarasına sahip bir hayvan bulunamadı.",
        });
    }

    const newExamination = new Examination({
      examinationNumber,
      animalEarTagNumber,
      examinationType,
      examinationDate,
      veterinaryInstitutionName,
      veterinaryClinicTradeName,
      veterinaryClinicCity,
      veterinaryClinicDistrict,
      veterinaryClinicVillage,
      veterinaryClinicAddress,
      personInChargeOfVeterinaryClinic,
      treatingDoctorID,
      treatingDoctorName,
      examinationDescription,
      examinationFee,
    });

    const examination = await newExamination.save();
    res.status(200).json(examination);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Muayene kaydı oluşturulurken bir hata oluştu." });
  }
});

// Belirli bir hayvanın muayene kayıtlarını getirme
router.get("/:earTagNumber", async (req, res) => {
  const { earTagNumber } = req.params;

  try {
    const examinations = await Examination.find({
      animalEarTagNumber: earTagNumber,
    });

    if (examinations.length === 0) {
      res.status(404).json({ error: "Hayvanın muayene kaydı bulunamadı." });
    } else {
      res.status(200).json(examinations);
    }
  } catch (error) {
    console.error("Muayene kayıtları getirilemedi:", error);
    res.status(500).json({ error: "Muayene kayıtları getirilemedi." });
  }
});


// Tüm hayvanların muayene kayıtlarını getirme
router.get("/", async (req, res) => {
    try {
      const examinations = await Examination.find();
  
      if (examinations.length === 0) {
        res.status(404).json({ error: "Hiç muayene kaydı bulunamadı." });
      } else {
        res.status(200).json(examinations);
      }
    } catch (error) {
      console.error("Muayene kayıtları getirilemedi:", error);
      res.status(500).json({ error: "Muayene kayıtları getirilemedi." });
    }
  });

module.exports = router;
