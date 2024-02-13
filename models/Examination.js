const mongoose = require("mongoose");

const ExaminationSchema = new mongoose.Schema(
  {
    examinationNumber: {
      type: String,
      required: true,
      // Türkçe: Muayene no
      // İngilizce: Examination Number
    },
    animalEarTagNumber: {
      type: String,
      required: true,
      // Türkçe: Hayvan küpe no
      // İngilizce: Animal Ear Tag Number
    },
    examinationType: {
      type: String,
      // Türkçe: Muayene tipi (aşı, doğum…)
      // İngilizce: Examination Type (vaccination, birth, etc.)
    },
    examinationDate: {
      type: Date,
      // Türkçe: Muayene tarihi
      // İngilizce: Examination Date
    },
    veterinaryInstitutionName: {
      type: String,
      // Türkçe: Veteriner ticari kurum/kuruluş adı
      // İngilizce: Name of Veterinary Commercial Institution
    },
    veterinaryClinicTradeName: {
      type: String,
      // Türkçe: Veteriner kliniği ticari ünvanı (X Veteriner Kliniği)
      // İngilizce: Veterinary Clinic Trade Name (X Veterinary Clinic)
    },
    veterinaryClinicCity: {
      type: String,
      // Türkçe: Veteriner kliniği ili
      // İngilizce: Veterinary Clinic City
    },
    veterinaryClinicDistrict: {
      type: String,
      // Türkçe: Veteriner kliniği ilçesi
      // İngilizce: Veterinary Clinic District
    },
    veterinaryClinicVillage: {
      type: String,
      // Türkçe: Veteriner kliniği mahalle/köyü
      // İngilizce: Veterinary Clinic Village
    },
    veterinaryClinicAddress: {
      type: String,
      // Türkçe: Veteriner klinik adresi
      // İngilizce: Veterinary Clinic Address
    },
    personInChargeOfVeterinaryClinic: {
      type: String,
      // Türkçe: Veteriner kliniğinden sorumlu olan kişi
      // İngilizce: Person in Charge of Veterinary Clinic
    },
    treatingDoctorID: {
      type: String,
      // Türkçe: Hayvanı tedavi eden doktorun TC’si
      // İngilizce: ID Number of the Doctor Treating the Animal
    },
    treatingDoctorName: {
      type: String,
      // Türkçe: Hayvanı tedavi eden doktorun Adı Soyadı
      // İngilizce: Name and Surname of the Doctor Treating the Animal
    },
    examinationDescription: {
      type: String,
      // Türkçe: Muayene açıklaması
      // İngilizce: Examination Description
    },
    examinationFee: {
      type: Number,
      // Türkçe: Muayene ücreti
      // İngilizce: Examination Fee
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Examination", ExaminationSchema);
