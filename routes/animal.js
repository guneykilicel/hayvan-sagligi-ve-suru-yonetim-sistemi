const router = require("express").Router();
const Animal = require("../models/Animal");
const Farmer = require("../models/Farmer");

// Yeni hayvan ekleme
router.post("/register", async (req, res) => {
  try {
    const {
      earTagNumber,
      ownerTC,
      animalType,
      breed,
      gender,
      motherEarTagNumber,
      fatherEarTagNumber,
      birthDate,
      weight,
      group,
      dailyMilkYieldLt,
      pregnancyStatus,
      lastInseminationDate,
      numberOfInsemination,
      dryShippingDate,
      transitionToTheDeliveryRoomDate,
      lastBirthDate,
      numberOfBirths,
      mayBeSick,
    } = req.body;

    // Check if the animal with the given earTagNumber already exists
    const existingAnimal = await Animal.findOne({ earTagNumber });

    if (existingAnimal) {
      return res.status(400).json({
        error: "Bu kulak numarasına sahip bir hayvan zaten mevcut!",
      });
    }

    const newAnimal = new Animal({
      earTagNumber,
      ownerTC,
      animalType,
      breed,
      gender,
      motherEarTagNumber,
      fatherEarTagNumber,
      birthDate,
      status: "Alive",
      weight,
      group,
      dailyMilkYieldLt,
      pregnancyStatus,
      lastInseminationDate,
      numberOfInsemination,
      dryShippingDate,
      transitionToTheDeliveryRoomDate,
      lastBirthDate,
      numberOfBirths,
      mayBeSick,
    });
    // Save the new animal to the database
    const animal = await newAnimal.save();

    // Generate vaccination schedule based on animalType and birthDate
    // Generate vaccination schedule based on animalType and birthDate
    if (animalType) {
      const vaccinationSchedule = generateVaccinationSchedule(true, birthDate);
      animal.vaccinationSchedule = vaccinationSchedule;
    } else {
      const vaccinationSchedule = generateVaccinationSchedule(false, birthDate);
      animal.vaccinationSchedule = vaccinationSchedule;
    }

    // Save the updated animal with vaccination schedule
    await animal.save();

    res.status(200).json(animal);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Hayvan kaydı oluşturulurken bir hata oluştu." });
  }
});
function generateVaccinationSchedule(animalType, birthDate) {
  console.log(animalType);
  const schedule = [];

  // Convert birthDate to a JavaScript Date object
  const birthDateObj = new Date(birthDate);

  // Function to add a vaccine to the schedule
  function addVaccine(month, vaccine, description) {
    schedule.push({
      month,
      vaccine,
      description
    });
  }

  // Common vaccines for both types
  addVaccine(0, "Doğum", "Hayvanınızın doğum tarihi.");

  // Define specific schedule for each animalType
  if (animalType) {  // Büyükbaş hayvan
    addVaccine(4, "S.19 Aşısı", "4 aylıkken dişi danalara S.19 aşısı, doğumları yaklaşan sığırlara ise septisemi aşısı yapılır.");
    addVaccine(6, "Şap Aşısı", "6 aylıkken sığırlara şap aşısı uygulanır.");
    addVaccine(8, "S-9 Aşısı", "8 aylıkken danalara S-9 aşısı yapılır.");
    addVaccine(9, "Septisemi Aşısı", "Gebelikte olan ineklere septisemi aşısı uygulanır.");
    addVaccine(11, "Theileriosis Aşısı", "Theileriosis hastalığına karşı koruyucu aşılama yapılır.");
    addVaccine(12, "BR. S 19 Aşısı", "12 aylık olan dişi danalara BR. S 19 aşısı uygulanır.");
    addVaccine(12, "Buzağı Septisemi Aşısı", "Doğuma yaklaşan sığırlara buzağı septisemi aşısı uygulanır.");
  } else {  // Küçükbaş hayvan
    addVaccine(1, "Septisemi Aşısı", "Yeni doğan kuzu-oğlaklara öldürücü ishale karşı septisemi aşısı uygulanır.");
    addVaccine(3, "Enterotoksemi (Mera) Aşısı", "Kuzu ve oğlaklarda enterotoksemi aşısı uygulanır.");
    addVaccine(3, "Şap Aşısı", "Kuzu ve oğlaklarda şap aşısı uygulanır.");
    addVaccine(3, "Ektima Aşısı", "Kuzu ve oğlaklarda ektima aşısı uygulanır.");
    addVaccine(6, "Keçi Çiğer Ağrısı Aşısı", "Keçi çiğer ağrısı aşısı yapılır.");
    addVaccine(6, "Agalaksi Aşısı", "Agalaksi aşısı yapılır.");
    addVaccine(8, "Çiçek Aşısı", "Çiçek aşısı uygulanır.");
    addVaccine(8, "Topallık Aşısı", "Topallık aşısı uygulanır.");
    addVaccine(10, "Koyun Keçi Şap Aşısı", "Koyun ve keçilere şap aşısı uygulanır.");
    addVaccine(10, "Keçi Veba Aşısı", "Keçi veba aşısı uygulanır.");
    addVaccine(10, "Çelertme (Enterotoksemi) Aşısı", "Koyun ve keçilere çelertme aşısı uygulanır.");
    addVaccine(12, "Septisemi Aşısı", "Doğumuna 1-1,5 ay kala gebe koyunlara septisemi aşısı uygulanır.");
  }

  return schedule;
}

// Hayvanı kulak numarasına göre silme
router.delete("/delete/:earTagNumber", async (req, res) => {
  try {
    const { earTagNumber } = req.params;

    // Hayvanı bul ve sil
    const deletedAnimal = await Animal.findOneAndDelete({ earTagNumber });

    if (!deletedAnimal) {
      return res.status(404).json({ error: "Silinecek hayvan bulunamadı." });
    }

    res.status(200).json({ message: "Hayvan başarıyla silindi.", deletedAnimal });
  } catch (error) {
    console.error("Hayvan silinirken bir hata oluştu:", error);
    res.status(500).json({ error: "Hayvan silinirken bir hata oluştu." });
  }
});


// Tüm hayvanları listeleme
router.get("/list", async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (error) {
    console.error("Hayvanlar getirilemedi:", error);
    res.status(500).json({ error: "Hayvanlar getirilemedi." });
  }
});

// Dişi hayvanları listeleme
router.get("/females", async (req, res) => {
  try {
    const animals = await Animal.find({ gender: "true" });
    res.status(200).json(animals);
  } catch (error) {
    console.error("Hayvanlar getirilemedi:", error);
    res.status(500).json({ error: "Hayvanlar getirilemedi." });
  }
});

// Erkek hayvanları listeleme
router.get("/males", async (req, res) => {
  try {
    const animals = await Animal.find({ gender: "false" });
    res.status(200).json(animals);
  } catch (error) {
    console.error("Hayvanlar getirilemedi:", error);
    res.status(500).json({ error: "Hayvanlar getirilemedi." });
  }
});

// // Belirli bir hayvanı getirme
// router.get("/:earTagNumber", async (req, res) => {
//   const { earTagNumber } = req.params;

//   try {
//     const animal = await Animal.findOne({ earTagNumber });
//     if (!animal) {
//       res.status(404).json({ error: "Hayvan bulunamadı." });
//     } else {
//       res.status(200).json(animal);
//     }
//   } catch (error) {
//     console.error("Hayvan getirilemedi:", error);
//     res.status(500).json({ error: "Hayvan getirilemedi." });
//   }
// });

// Belirli bir hayvanı getirme
router.get("/:earTagNumber", async (req, res) => {
  const { earTagNumber } = req.params;

  try {
    const animal = await Animal.findOne({ earTagNumber });

    if (!animal) {
      res.status(404).json({ error: "Hayvan bulunamadı." });
    } else {
      // Şu anki tarih
      const currentDate = new Date();

      // Son doğum tarihi
      const lastBirthDate = new Date(animal.lastBirthDate);

      // Son doğumdan geçen gün sayısı
      const daysSinceLastBirth = Math.floor(
        (currentDate - lastBirthDate) / (1000 * 60 * 60 * 24)
      );

      // Hayvanın yaşını hesapla
      const animalBirthDate = new Date(animal.birthDate);
      const age = Math.floor(
        (currentDate - animalBirthDate) / (1000 * 60 * 60 * 24)
      );

      // Hayvanın kuruya alınma tarihini hesapla (önerilen, ekstradan çiftçinin aldığı tarihi de alacağız)
      let daysToDry = "";
      if (
        currentDate - new Date(animal.lastInseminationDate) <=
        220 * (1000 * 60 * 60 * 24)
      ) {
        daysToDry = "Kuruya alınacak";
      } else {
        const daysRemaining = Math.floor(
          (currentDate - new Date(animal.lastInseminationDate)) /
            (1000 * 60 * 60 * 24)
        );
        daysToDry = daysRemaining + " gün sonra kuruya alınacak";
      }

      // // BURASI SONRADAN KULLANILACAK
      // // Hayvanın beklenen doğum tarihini güncelle ve veritabanına kaydet
      // if (!animal.expectedBirthDate) {
      //   const expectedBirthDate = new Date(animal.lastInseminationDate);
      //   expectedBirthDate.setDate(expectedBirthDate.getDate() + 280);
      //   animal.expectedBirthDate = expectedBirthDate;
      //   await animal.save();
      // }

      // Hayvanın tahmini doğum tarihini hesapla ve kaç gün kaldığını bul
      let expectedBirthDate = "";
      let daysToExpectedBirth = "";
      if (animal.lastInseminationDate) {
        const lastInseminationDate = new Date(animal.lastInseminationDate);
        expectedBirthDate = new Date(
          lastInseminationDate.getTime() + 280 * (1000 * 60 * 60 * 24)
        );
        daysToExpectedBirth = Math.floor(
          (expectedBirthDate - currentDate) / (1000 * 60 * 60 * 24)
        );
      }

      // Lohusa sorgusunu yap
      const isPostpartum =
        currentDate - new Date(animal.lastBirthDate) <=
        40 * (1000 * 60 * 60 * 24);

      // Tüm hayvan bilgilerini içeren özel JSON
      const animalInfo = {
        id: animal.earTagNumber,
        earTagNumber: animal.earTagNumber,
        farmNumber: animal.farmNumber,
        ownerTC: animal.ownerTC,
        animalType: animal.animalType,
        breed: animal.breed,
        gender: animal.gender,
        motherEarTagNumber: animal.motherEarTagNumber,
        fatherEarTagNumber: animal.fatherEarTagNumber,
        birthDate: animal.birthDate,
        status: animal.status,
        weight: animal.weight,
        group: animal.group,
        dailyMilkYieldLt: animal.dailyMilkYieldLt,
        pregnancyStatus: animal.pregnancyStatus,
        lastInseminationDate: animal.lastInseminationDate,
        numberOfInsemination: animal.numberOfInsemination,
        dryShippingDate: animal.dryShippingDate,
        // expectedBirthDate: animal.expectedBirthDate,
        transitionToTheDeliveryRoomDate: animal.transitionToTheDeliveryRoomDate,
        lastBirthDate: animal.lastBirthDate,
        numberOfBirths: animal.numberOfBirths,
        mayBeSick: animal.mayBeSick,
        profitAndLoss: animal.profitAndLoss,
        offspring: animal.offspring,
        vaccinationSchedule: animal.vaccinationSchedule,
        daysSinceLastBirth: daysSinceLastBirth, // Son doğumdan geçen gün sayısı
        age, // Hayvanın yaşı
        dryShippingDateShould: daysToDry, // Kuruya alınma tarihi veya kaç gün kaldığı
        expectedBirthDate, // Tahmini doğum tarihi
        daysToExpectedBirth, // Tahmini doğuma kaç gün kaldığı
        isPostpartum, // Lohusa sorgusu
      };

      res.status(200).json(animalInfo);
    }
  } catch (error) {
    console.error("Hayvan getirilemedi:", error);
    res.status(500).json({ error: "Hayvan getirilemedi." });
  }
});

// Gebe ve tohumlanmış inek oranlarını hesaplayan fonksiyon
function calculatePregnancyRate(animals) {
  const totalAnimals = animals.length;
  const pregnantAnimals = animals.filter(
    (animal) => animal.pregnancyStatus === true
  );
  const inseminatedAnimals = animals.filter(
    (animal) => animal.numberOfInsemination > 0
  );

  const pregnancyRate = (pregnantAnimals.length / totalAnimals) * 100;
  const inseminationRate = (inseminatedAnimals.length / totalAnimals) * 100;

  return { pregnancyRate, inseminationRate };
}

// Gebe ve tohumlanmış inek oranlarını döndüren GET endpoint'i
router.get("/pregnancy-rates", async (req, res) => {
  try {
    // Tüm hayvanları getir
    const animals = await Animal.find();

    // Oranları hesapla
    const { pregnancyRate, inseminationRate } = calculatePregnancyRate(animals);

    res.status(200).json({
      pregnancyRate: pregnancyRate.toFixed(2) + "%",
      inseminationRate: inseminationRate.toFixed(2) + "%",
    });
  } catch (error) {
    console.error("Oranlar hesaplanamadı:", error);
    res.status(500).json({ error: "Oranlar hesaplanırken bir hata oluştu." });
  }
});

/*
{
  "birthDate": "2023-02-15"
}
*/
// Hayvan bilgilerini güncelleme
router.put("/:earTagNumber/update", async (req, res) => {
  const { earTagNumber } = req.params;
  const updatedAnimalData = req.body;

  try {
    const updatedAnimal = await Animal.findOneAndUpdate(
      { earTagNumber },
      { $set: updatedAnimalData },
      { new: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ error: "Hayvan bulunamadı." });
    }

    return res.status(200).json(updatedAnimal);
  } catch (error) {
    console.error("Hayvan güncellenemedi:", error);
    return res
      .status(500)
      .json({ error: "Hayvan güncellenirken bir hata oluştu." });
  }
});

// Hayvan grubunu güncelleme
router.put("/:earTagNumber/updateGroup", async (req, res) => {
  const { earTagNumber } = req.params;
  const newGroup = req.body.group; // Yeni grup bilgisi

  try {
    const animal = await Animal.findOne({ earTagNumber });

    if (!animal) {
      return res.status(404).json({ error: "Hayvan bulunamadı." });
    }

    // Hayvanın grubunu güncelle
    animal.group = newGroup;
    await animal.save();

    return res
      .status(200)
      .json({ message: "Hayvan grubu güncellendi.", animal });
  } catch (error) {
    console.error("Hayvan grubu güncellenemedi:", error);
    return res
      .status(500)
      .json({ error: "Hayvan grubu güncellenirken bir hata oluştu." });
  }
});

// Beklenen Doğum tarihi hayvan bilgilerini güncelleme
// Hayvan bilgilerini güncelleme
router.put("/:earTagNumber/updateExpectedBirthDate", async (req, res) => {
  const { earTagNumber } = req.params;
  const updatedAnimalData = req.body;

  try {
    // Veritabanından hayvanı bul
    const animal = await Animal.findOne({ earTagNumber });

    if (!animal) {
      return res.status(404).json({ error: "Hayvan bulunamadı." });
    }

    // lastInseminationDate ve expectedBirthDate varsa, expectedBirthDate'i 280 gün sonrasına ayarla
    if (updatedAnimalData.lastInseminationDate) {
      const lastInseminationDate = new Date(
        updatedAnimalData.lastInseminationDate
      );
      const expectedBirthDate = new Date(
        lastInseminationDate.getTime() + 280 * (24 * 60 * 60 * 1000)
      );
      updatedAnimalData.expectedBirthDate = expectedBirthDate;
    }

    // Güncellenmiş verileri kaydet
    Object.assign(animal, updatedAnimalData);
    await animal.save();

    return res.status(200).json(animal);
  } catch (error) {
    console.error("Hayvan güncellenemedi:", error);
    return res
      .status(500)
      .json({ error: "Hayvan güncellenirken bir hata oluştu." });
  }
});

// // Günlük süt üretimini güncelleme
// router.put("/:earTagNumber/update-daily-milk-production", async (req, res) => {
//   const { earTagNumber } = req.params;
//   const { dailyMilkYieldLt, farmerTC } = req.body;

//   try {
//     const updatedAnimal = await Animal.findOneAndUpdate(
//       { earTagNumber, "ownerTC": farmerTC },
//       { $set: { dailyMilkYieldLt } },
//       { new: true }
//     );

//     if (!updatedAnimal) {
//       return res.status(404).json({ error: "Hayvan bulunamadı veya çiftçiye ait değil." });
//     }

//     // Çiftçinin yıllık süt üretimini güncelle
//     await Farmer.findOneAndUpdate(
//       { farmerTC },
//       { $inc: { "producedMilkYear.$[year].TotalMilkProductionLt": dailyMilkYieldLt } },
//       { arrayFilters: [{ "year.Year": new Date().getFullYear() }] }
//     );

//     return res.status(200).json(updatedAnimal);
//   } catch (error) {
//     console.error("Hayvan güncellenemedi:", error);
//     return res.status(500).json({ error: "Hayvan güncellenirken bir hata oluştu." });
//   }
// });

// Günlük süt üretimini ve çiftçinin yıllık süt üretimini güncelleme
router.put("/:earTagNumber/update-daily-milk-production", async (req, res) => {
  const { dailyMilkYieldLt, earTagNumber } = req.body;

  try {
    // Hayvanı bul
    const animal = await Animal.findOne({ earTagNumber });

    if (!animal) {
      return res.status(404).json({ error: "Hayvan bulunamadı." });
    }

    // Hayvanın sahibinin TC'sini al
    const farmerTCAssociatedWithAnimal = animal.ownerTC;

    // Hayvanın sahibinin çiftçi bilgisini bul
    const farmer = await Farmer.findOne({
      farmerTC: farmerTCAssociatedWithAnimal,
    });

    if (!farmer) {
      return res.status(404).json({ error: "Çiftçi bulunamadı." });
    }

    // Çiftçinin yıllık süt üretim verisini güncelle
    const currentYear = new Date().getFullYear();
    const milkProductionForCurrentYear = farmer.producedMilkYear.find(
      (item) => item.Year === currentYear
    );

    if (milkProductionForCurrentYear) {
      milkProductionForCurrentYear.TotalMilkProductionLt += dailyMilkYieldLt;
    } else {
      farmer.producedMilkYear.push({
        Year: currentYear,
        TotalMilkProductionLt: dailyMilkYieldLt,
        TotalIncome: 0, // İlgili bilgileri doldurmalısınız
        TotalExpenditure: 0, // İlgili bilgileri doldurmalısınız
      });
    }

    // Çiftçinin bilgilerini güncelle
    await farmer.save();

    // Hayvanın günlük süt üretimini güncelle
    animal.dailyMilkYieldLt = dailyMilkYieldLt;
    await animal.save();

    res.status(200).json({ message: "Süt üretimi başarıyla güncellendi." });
  } catch (error) {
    console.error("Süt üretimi güncellenirken bir hata oluştu:", error);
    res
      .status(500)
      .json({ error: "Süt üretimi güncellenirken bir hata oluştu." });
  }
});

// Günlük süt verimi eklemek için POST endpoint'i
router.post("/:earTagNumber/add-milk-yield", async (req, res) => {
  try {
    const { earTagNumber } = req.params;
    const { yieldLt } = req.body;

    // Bu günün tarihini alalım
    const currentDate = new Date();

    // Hayvanı bulalım
    const animal = await Animal.findOne({ earTagNumber });

    // Eğer hayvanın günlük süt verisi varsa, son eklenen verinin tarihini kontrol edelim
    if (animal && animal.dailyMilkYieldLt.length > 0) {
      const lastMilkEntryDate =
        animal.dailyMilkYieldLt[animal.dailyMilkYieldLt.length - 1].date;

      // Eğer son eklenen süt verisi bugünkü tarihten ise hata döndürelim
      if (isSameDay(currentDate, lastMilkEntryDate)) {
        return res.status(400).json({
          error:
            "Bugün bu hayvan için günlük süt miktarı girişi zaten yapıldı. Lütfen yarına kadar bekleyiniz.",
        });
      }
    }

    // Yeni süt verimi verisini oluşturalım
    const newMilkYieldData = {
      date: currentDate,
      yieldLt,
    };

    // Hayvanı bulup, güncel süt verimi verisini ekleyelim
    const updatedAnimal = await Animal.findOneAndUpdate(
      { earTagNumber },
      { $push: { dailyMilkYieldLt: newMilkYieldData } },
      { new: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ error: "Hayvan bulunamadı." });
    }

    res.status(200).json(updatedAnimal);
  } catch (error) {
    console.error("Süt verimi eklenirken bir hata oluştu:", error);
    res.status(500).json({ error: "Süt verimi eklenirken bir hata oluştu." });
  }
});

// İki tarihin aynı gün olup olmadığını kontrol eden yardımcı fonksiyon
function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// {
//   "dailyMilkYieldLt": [
//   {
//     "date": "2023-12-06T12:22:49.464Z",
//     "yieldLt": 20
//   },
//   {
//     "date": "2023-12-07T12:22:49.464Z",
//     "yieldLt": 18
//   },
//   {
//     "date": "2023-12-08T12:22:49.464Z",
//     "yieldLt": 21
//   },
//   {
//     "date": "2023-12-09T12:22:49.464Z",
//     "yieldLt": 17
//   },
//   {
//     "date": "2023-12-10T12:22:49.464Z",
//     "yieldLt": 19
//   },
//   {
//     "date": "2023-12-11T12:22:49.464Z",
//     "yieldLt": 18
//   },
//   {
//     "date": "2023-12-12T12:22:49.464Z",
//     "yieldLt": 20
//   },
//   {
//     "date": "2023-12-13T12:22:49.464Z",
//     "yieldLt": 21
//   }
// ]
// }
// ------------------------------------------------------------------------------------------------- fonskiyonlu GET

//çiftçiye hayvna ekleme (daha önce başka bir çiftliğe eklenmiş mi sorgusu yapıp yapmamada kararsızım)
/* risk: hayvanı sahibi olmayan biri ekleyebilir o zaman ne yapılmalı */

// hayvan bilgilerini güncelleme +++++++
/*
tohumlama sayısı,
kuru alım tarihi,
beklenen doğum tarihi,
günlük süt verim lt,
grup,
doğum haneye geçiş
*/

// dişi hayvan arama fonksiyonu +++++++

// erkek hayvan arama foksiyonu +++++++++

// hayvanın yaşını bulan fonksiyon +++++++++

// ++++++ (Hayvanın kuruya alma tarihi, tohumlandığı tarihten 280 gün gidip -60 gün geriye gelirsek son 60 günde biz bunu dinlendiriyoruz. Beklenen doğum (ortalama 280 gün sonra)) (bugün - lastInseminationDate <= 220 ? kuru)

// (ortalama 280 gün sonra),  (280 - bugün - lastInseminationDate = doğuma bu kadar var ) +++++

// son doğumdan itibaren kaç gün geçmiş, ++++++

// Lohusa sorgusu: Bugün - sonDoğurmaTarihi <=40 ? true : false verim derdine düşme, tohumlama sadece sağlığı iyi mi kötü mü ona bak ++++++++
/* Bu hayvan (kırmzı 20) doğuralı 20 gün olmuş seksüel aktiviteleri boş, eğer buradaki sayı 40 dan küçükse inek lousa oluyor yani süt verim derdine düşme, tohumlama sadece sağlığı iyi mi kötü mü ona bak */

// Kesime Gidecek: Tedaviye cevap vermedi ve zarar yaptırıyor, kestir

// gelir gider fonksiyonu

// süt verimi düşük olanların grubunu düşüren fonksiyon (aslında grubu boolean yapsak sadece change yapsa mantıklı olur çünkü grubu yükseğe alan fonksiyon da lazım)
/* hayvan yüksek grupta ama düşük süt verdi bu hayvanı izlemek lazım */
/* mayBeSick = true */

// doğumu yaklaşan inekler fonksiyonu ---- f

// +- (normal güncelleme ile yapılır) doğum fonksiyonu:  bir inek doğum yaptığında o kırmızı alandan kesip en alttaki renksiz alana yapıştırıyor sonra: Doğurduğu tarihi güncelliyor, lkno yu güncelliyor(bir arttırıyor), gebsonuç taze oluyor, sağ gün de güncelleniyor.
/* Şimdi doğum oldu, kurudaki hayvan 4 e indi , taze hayvan 7'ye çıktı, sağılan hayvan 48'e çıktı, Rasyona geldiğimde kuru 4 e indi, yüksek sağmal 30'a çıktı yemlemeyi de kendisi yaptı. */

// kuru alma fonksiyonu: Eğer hayvnaımı erkenden kuruya almak istersem KurAlTar'ı Kuruya Alma'daki tarih ile aynı yapıyorum, Grup'unu (bizimkinin grubu düşüktü) uzak yaptık, Durum'u sağmal dan kuru ya çevirdik, SonSV 0 yaptık.
/* Şimdi RASYON'a baktığımızda kurudaki 5'e çıktı, düşük sağmal 17'ye indi bu bir sorun çünkü benim sağım sistemim 9'lu yani bir tane makinam boş kalmasın diye yüksek gruptan bir tanesini oraya atarsam sağım makinası boşuna çalışmaz, ne yaparım:
Mesela 14 lt süt veren bir hayvan Grup yüksekte bunu düşük'e alırım bu sayede düşük sağmal inek sayım 18 olur. Ertesi gün verilecek yem de buna göre dizayn edildi */

// evlendirme fonksiyonu: Bu hayvan 392 günlük yaşta, hayvan doğduktan 450 gün sonra evlendir. Eğer hayvanın doğduğundaki kilosu 40 kilonun altındaysa 71 gün süt ile besle, 40'ın üstündeyse 61 gün süt ile besle 1 hafta sonra tamamen kesilsinler anadan

// sürü dışı kalma riskli fonksiyonu:  31  Aralık tarihine kadar, kesime gidecek hayvanlar vardı ya, O hayvanları listelettir. Bu hayvanlar kaybedilebilir bunları nakite dönüştürmek gerek

// gebelik ve tohumlanmış inek oranları

module.exports = router;
