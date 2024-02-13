const mongoose = require('mongoose');
  const AnimalSchema = new mongoose.Schema({
    earTagNumber: {
      type: String,
      require: true,
      unique: true,
      // TR061234567
      // Türkçe: Hayvan küpe no
      // İngilizce: Animal Ear Tag Number
    },
    farmNumber: {
      type: String,
      default: ""
      // Çiftlik numarası örneğin bu bir isim de olabilir numara da
    },
    animalType: {
      type: Boolean,
      default: true,
      // büyükbaş = true, küçükbaş = false
    },
    ownerTC: {
      type: String,
      require: true,
      // Türkçe: Hayvan sahibi TC si
      // İngilizce: Owner's Turkish ID Number
    },
    breed: {
      type: String,
      default: ""
      // Türkçe: Hayvan ırkı
      // İngilizce: Animal Breed
    },
    gender: {
      type: String,
      default: ""
      // Türkçe: Hayvan cinsiyeti
      // İngilizce: Animal Gender
    },
    motherEarTagNumber: {
      type: String,
      default: ""
    },
    fatherEarTagNumber: {
      type: String,
      default: ""
    },
    birthDate: {
      type: Date,
      default: ""
      // Türkçe: Hayvan doğum tarihi
      // İngilizce: Animal Birth Date
    },
    status: {
      type: String,
      default: ""
      // Türkçe: Hayvan durumu (ölü/canlı)
      // İngilizce: Animal Status (dead/alive)
    },
    weight: {
      type: Number,
      default: ""
      // Türkçe: Hayvan kg’si
      // İngilizce: Animal Weight
    },
    group: {
      type: String,
      default: false,
      // hayvan grubu
    },
    dailyMilkYieldLt: {
      type: Array,
      default: [],
      // günlük süt verimi lt
    //   {
    //     "date": "2023-12-06T12:22:49.464Z",
    //     "yieldLt": 20
    //   },
    },
    pregnancyStatus: {
      type: Boolean,
      default: false,
      // gebelik durumu
    },
    lastInseminationDate: {
      type: Date,
      default: "",
      // son tohumlama tarihi
    },
    numberOfInsemination: {
      type: Number,
      default: "",
      // tohumlama sayisi (gebe kaldığında sıfırlanacak)
    },
    dryShippingDate: {
      type: Date,
      default: "",
      // kuruya alım tarihi
    },
    // expectedBirthDate: {
    //   type: Date,
    //   default: "",
    //   // beklenen doğum tarihi (ortlaama 280 gün sonra)
    // },
    transitionToTheDeliveryRoomDate: {
      type: Date,
      default: "",
      // doğum haneye geçiş tarihi
    },
    lastBirthDate: {
      type: Date,
      default: ""
      // Türkçe: Son doğum yaptığı tarih
      // İngilizce: Date of Last Birth
    },
    numberOfBirths: {
      type: Number,
      default: ""
      // Doğurma sayısı
    },
    mayBeSick: {
      type: Boolean,
      default: false
      // hasta olabilir mi, mesela yüksek grubunda ama 8 lt süt vermiş
    },
    profitAndLoss: {
      type: Number,
      default: "",
      // gelir gider
    },
    offspring: {
      type: Array,
      default: [],
      // earTagNumbers
    },
    vaccinationSchedule: {
      type: Array,
      default: [],
    }
    // vaccinationSchedule: [{
    //   vaccineName: {
    //     type: String,
    //     default: ""
    //     // aşı ismi
    //   },
    //   vaccinationStatus: {
    //     type: Boolean,
    //     default: false
    //   },
    //   vaccinationStartTime: {
    //     type: Date,
    //     default: ""
    //     // Türkçe: Aşının başlangıç tarihi ve saati
    //     // İngilizce: Start Date and Time of Vaccination
    //   },
    //   vaccinationTime: {
    //     type: Date,
    //     default: ""
    //     // aşı yapılma zamanı
    //   }
    // }] 
  }); 

  module.exports = mongoose.model("Animal", AnimalSchema);


  // e devlet tarım hayvanile entegrasyon 