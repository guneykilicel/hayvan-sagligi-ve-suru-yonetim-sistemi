const router = require("express").Router();
const Farmer = require("../models/Farmer");
const bcrypt = require("bcryptjs");

const Animal = require("../models/Animal");

// register
router.post("/register", async (req, res) => {
  try {
    const {
      farmerTC,
      farmerPassword,
      farmerFullName,
      farmerPhone,
      farmerCity,
      farmerDistrict,
      farmerVillage,
      farmerAddress,
      feeding,
      producedMilkYear,
      animals,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(farmerPassword, salt);

    const newFarmer = new Farmer({
      farmerTC,
      farmerPassword: hashedPassword,
      // farmerPassword,
      farmerFullName,
      farmerPhone,
      farmerCity,
      farmerDistrict,
      farmerVillage,
      farmerAddress,
      feeding,
      producedMilkYear,
      animals,
    });

    const farmer = await newFarmer.save();
    res.status(200).json(farmer);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Çiftçi kaydı oluşturulurken bir hata oluştu." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ farmerTC: req.body.farmerTC });
    !farmer && res.status(404).send("User not found!");

    const validPassword = await bcrypt.compare(
      req.body.farmerPassword,
      farmer.farmerPassword
    );

    if (!validPassword) {
      res.status(403).send("Invalid password!");
    } else {
      // Çiftçinin son 7 feeding verisini al
      const last7FeedingArray = farmer.feeding.slice(-7);
      
      // calculateMonthlyTotalFeeding fonksiyonunu kullanarak dataları ekleyin
      const monthlyTotalFeedingResults = calculateMonthlyTotalFeeding(last7FeedingArray);
      
      // Çiftçi verilerine ekleyin
      const farmerDataWithMonthlyTotalFeeding = {
        ...farmer.toObject(),
        monthlyTotalFeeding: monthlyTotalFeedingResults,
      };

      res.status(200).json(farmerDataWithMonthlyTotalFeeding);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const calculateMonthlyTotalFeeding = (feedingArray) => {
  const monthlyTotalArray = [];

  feedingArray.forEach((feeding) => {
    const monthlyTotal = {
      date: feeding.date,
      totalFeeding: {
        dryHerbMixture: 0,
        herbSilage: 0,
        cornSilage: 0,
        barley: 0,
        forage: 0,
        price: 0,
      },
    };

    // milch ve others içindeki her öğeyi topla
    ['dryHerbMixture', 'herbSilage', 'cornSilage', 'barley', 'forage', 'price'].forEach((item) => {
      monthlyTotal.totalFeeding[item] += (feeding.milch[item] || 0) + (feeding.others[item] || 0);
    });

    monthlyTotalArray.push(monthlyTotal);
  });

  return monthlyTotalArray;
};
// alttaki için gerekli
// const getAnimalByEarTagNumber = async (earTagNumber) => {
//   try {
//     const animal = await Animal.findOne({ earTagNumber });
//     return animal;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

const getAnimalPieStatistics = async (farmerTC) => {
  const result = {
    femaleBovineCount: 0,
    maleBovineCount: 0,
    femaleOvineCaprineCount: 0,
    maleOvineCaprineCount: 0,
  };

  try {
    const animalList = await Animal.find({ ownerTC: farmerTC });
    // console.log (animalList)

    for (const animal of animalList) {
      
      // Her hayvanın cinsiyet ve türüne göre sayım yap
      if (animal.animalType && animal.gender == "true") {
        result.femaleBovineCount += 1;
      } else if (animal.animalType && animal.gender == "false") {
        result.maleBovineCount += 1;
      } else if (!animal.animalType && animal.gender == "true") {
        result.femaleOvineCaprineCount += 1;
      } else if (!animal.animalType && animal.gender == "false") {
        result.maleOvineCaprineCount += 1;
      }
    }

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
      // getAnimalStatistics fonksiyonunu kullanarak hayvan istatistiklerini alın
router.get("/:farmerTC/getAnimalPieStatistics", async (req, res) => {
  try {
    const { farmerTC } = req.params;

    // getAnimalPieStatistics fonksiyonunu çağır
    const animalStatistics = await getAnimalPieStatistics(farmerTC);

    if (!animalStatistics) {
      return res.status(500).json({ error: "Hayvan istatistikleri alınamadı." });
    }

    // İstatistikleri döndür
    res.status(200).json(animalStatistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bir hata oluştu." });
  }
});

// Çiftçinin TC'si ile erişilen hayvanların içinde olduğumuz gün içinde en çok süt veren 6 hayvanı listeleme
router.get('/:farmerTC/topMilkProducingAnimals', async (req, res) => {
  try {
    const { farmerTC } = req.params;

    // Çiftçinin hayvanlarını getir
    const animalList = await Animal.find({ ownerTC: farmerTC });

    if (!animalList || animalList.length === 0) {
      return res.status(404).json({ error: "Çiftçinin hiç hayvanı yok." });
    }
    
    // Günlük süt verisi olan hayvanları filtrele
    const animalsWithDailyMilk = animalList.filter(animal => animal.dailyMilkYieldLt && animal.dailyMilkYieldLt.length > 0);
    
    if (animalsWithDailyMilk.length === 0) {
      return res.status(404).json({ error: "Çiftçinin hiç günlük süt verisi olan hayvanı yok." });
    }
    
    // Günlük süt verilerini toplam süt üretimine göre büyükten küçüğe sırala
    const sortedAnimals = animalsWithDailyMilk.sort((a, b) => {
      const totalMilkA = a.dailyMilkYieldLt.reduce((acc, curr) => acc + curr.yieldLt, 0);
      const totalMilkB = b.dailyMilkYieldLt.reduce((acc, curr) => acc + curr.yieldLt, 0);
      return totalMilkB - totalMilkA;
    });
    
    // İlk 6 hayvanı al
    const top6Animals = sortedAnimals.slice(0, 6);
    
    res.status(200).json(top6Animals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hayvanlar listelenirken bir hata oluştu." });
  }
});



// Çiftçi bilgilerini güncelleme
router.put("/:farmerTC/update", async (req, res) => {
  const { farmerTC } = req.params;
  const updatedFarmerData = req.body;

  try {
    const updatedFarmer = await Farmer.findOneAndUpdate(
      { farmerTC },
      { $set: updatedFarmerData },
      { new: true }
    );

    if (!updatedFarmer) {
      return res.status(404).json({ error: "Çiftçi bulunamadı." });
    }

    return res.status(200).json(updatedFarmer);
  } catch (error) {
    console.error("Hayvan güncellenemedi:", error);
    return res
      .status(500)
      .json({ error: "Hayvan güncellenirken bir hata oluştu." });
  }
});

// Çiftçinin sahip olduğu hayvanları listeleme
router.get("/:farmerTC/animals", async (req, res) => {
  const { farmerTC } = req.params;

  try {
    const farmer = await Farmer.findOne({ farmerTC });

    if (!farmer) {
      res.status(404).json({ error: "Çiftçi bulunamadı." });
    } else {
      const animalList = await Animal.find({ ownerTC: farmerTC });

      // Animal bilgilerini düzenleme
      const formattedAnimalList = animalList.map((animal) => {
        const currentDate = new Date();
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

        return {
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
          expectedBirthDate: animal.expectedBirthDate,
          transitionToTheDeliveryRoomDate:
            animal.transitionToTheDeliveryRoomDate,
          lastBirthDate: animal.lastBirthDate,
          numberOfBirths: animal.numberOfBirths,
          mayBeSick: animal.mayBeSick,
          profitAndLoss: animal.profitAndLoss,
          offspring: animal.offspring,
          vaccinationSchedule: animal.vaccinationSchedule,
          daysSinceLastBirth, // Son doğumdan geçen gün sayısı
          age, // Hayvanın yaşı
          dryShippingDateShould: daysToDry, // Kuruya alınma tarihi veya kaç gün kaldığı
          expectedBirthDate, // Tahmini doğum tarihi
          daysToExpectedBirth, // Tahmini doğuma kaç gün kaldığı
          isPostpartum, // Lohusa sorgusu
        };
      });

      res.status(200).json(formattedAnimalList);
    }
  } catch (error) {
    console.error("Hayvanlar getirilemedi:", error);
    res.status(500).json({ error: "Hayvanlar getirilemedi." });
  }
});

// Farmer'ın sahip olduğu hayvan gruplarını sayma
router.get("/:farmerTC/animal-groups", async (req, res) => {
  const { farmerTC } = req.params;

  try {
    const farmer = await Farmer.findOne({ farmerTC });

    if (!farmer) {
      return res.status(404).json({ error: "Çiftçi bulunamadı." });
    }

    // Farmer'ın sahip olduğu hayvanların earTagNumbers'larını al
    const animalEarTagNumbers = farmer.animals;

    // Hayvanları veritabanından getir
    const animals = await Animal.find({
      earTagNumber: { $in: animalEarTagNumbers },
    });

    // Hayvan gruplarını sayma
    let highGroupCount = 0;
    let lowGroupCount = 0;

    animals.forEach((animal) => {
      // Burada hayvanın grup bilgisine göre sayım yapabilirsiniz.
      // Örneğin, animal.group === "yüksek" gibi bir koşul ekleyebilirsiniz.
      if (animal.group === "high") {
        highGroupCount++;
      } else if (animal.group === "low") {
        lowGroupCount++;
      }
    });

    res.status(200).json({
      highGroupCount,
      lowGroupCount,
    });
  } catch (error) {
    console.error("Hayvan grupları sayılamadı:", error);
    res.status(500).json({ error: "Hayvan grupları sayılamadı." });
  }
});

// Çiftçinin sahip olduğu hayvanlardan son tohumlanma tarihi 25 günden fazla olan ve gebelik durumu true olan hayvanları listeleme
router.get("/:farmerTC/pregnancy-stats", async (req, res) => {
  const { farmerTC } = req.params;

  try {
    const farmer = await Farmer.findOne({ farmerTC });

    if (!farmer) {
      res.status(404).json({ error: "Çiftçi bulunamadı." });
    } else {
      const animalList = await Animal.find({ ownerTC: farmerTC });

      // Hayvan sayılarını sayma
      let countOver25DaysSinceLastInsemination = 0;
      let countPregnant = 0;

      animalList.forEach((animal) => {
        if (animal.lastInseminationDate) {
          const lastInseminationDate = new Date(animal.lastInseminationDate);
          const currentDate = new Date();

          // Son tohumlama tarihinden geçen gün sayısı
          const daysSinceLastInsemination = Math.floor(
            (currentDate - lastInseminationDate) / (1000 * 60 * 60 * 24)
          );

          // Son tohumlama tarihi 25 günden fazla ise sayacı artır
          if (daysSinceLastInsemination > 25) {
            countOver25DaysSinceLastInsemination++;
          }

          // Gebelik durumu true ise sayacı artır
          if (animal.pregnancyStatus) {
            countPregnant++;
          }
        }
      });

      const result = {
        countOver25DaysSinceLastInsemination,
        countPregnant,
      };

      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Hayvan istatistikleri getirilemedi:", error);
    res.status(500).json({ error: "Hayvan istatistikleri getirilemedi." });
  }
});

// Çiftçinin elde ettiği sütün yüzde kaçı "low" ve "high" gruplarından geliyor
router.get("/:farmerTC/milk-stats", async (req, res) => {
  const { farmerTC } = req.params;

  try {
    const farmer = await Farmer.findOne({ farmerTC });

    if (!farmer) {
      res.status(404).json({ error: "Çiftçi bulunamadı." });
    } else {
      const animalList = await Animal.find({ ownerTC: farmerTC });

      // "low" ve "high" gruplarından gelen süt miktarlarını tutma
      let lowMilkTotal = 0;
      let highMilkTotal = 0;

      animalList.forEach((animal) => {
        if (animal.group === "low" && animal.dailyMilkYieldLt) {
          lowMilkTotal += animal.dailyMilkYieldLt;
        } else if (animal.group === "high" && animal.dailyMilkYieldLt) {
          highMilkTotal += animal.dailyMilkYieldLt;
        }
      });

      // Toplam süt miktarını bulma
      const totalMilk = lowMilkTotal + highMilkTotal;

      // "low" ve "high" gruplarından gelen süt miktarlarının yüzdesini hesaplama
      const percentageLowMilk = ((lowMilkTotal / totalMilk) * 100).toFixed(1);
      const percentageHighMilk = ((highMilkTotal / totalMilk) * 100).toFixed(1);

      const result = {
        percentageLowMilk,
        percentageHighMilk,
      };

      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Süt istatistikleri getirilemedi:", error);
    res.status(500).json({ error: "Süt istatistikleri getirilemedi." });
  }
});

// hayvanın günlük Çiftçinin yıllık süt üretimini güncelle
router.post("/:farmerTC/update-annual-milk-production", async (req, res) => {
  const { farmerTC } = req.params;
  const { dailyMilkYieldLt, earTagNumber } = req.body;

  try {
    const farmer = await Farmer.findOne({ farmerTC });

    if (!farmer) {
      res.status(404).json({ error: "Çiftçi bulunamadı." });
    } else {
      // Şu anki tarih
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      // Çiftçinin yıllık süt üretimi bilgilerini al
      let annualMilkProduction = farmer.producedMilkYear.find(
        (entry) => entry.Year === currentYear
      );

      // Eğer bulunamazsa, yeni bir yıl eklenir
      if (!annualMilkProduction) {
        annualMilkProduction = {
          Year: currentYear,
          TotalMilkProductionLt: 0,
          TotalIncome: 0,
          TotalExpenditure: 0,
        };
        farmer.producedMilkYear.push(annualMilkProduction);
      }

      // Günlük süt üretimini toplam süt üretimine ekleyerek, her hayvanın kendi günlük üretimini de güncelle
      annualMilkProduction.TotalMilkProductionLt += dailyMilkYieldLt;
      const animalIndex = farmer.animals.indexOf(earTagNumber);
      if (animalIndex !== -1) {
        farmer.animals[animalIndex].dailyMilkYieldLt = dailyMilkYieldLt;
      }

      // Çiftçiyi kaydet
      await farmer.save();

      res.status(200).json(farmer);
    }
  } catch (error) {
    console.error("Yıllık süt üretimi güncellenirken bir hata oluştu:", error);
    res
      .status(500)
      .json({ error: "Yıllık süt üretimi güncellenirken bir hata oluştu." });
  }
});

router.put("/update-annual-milk-production", async (req, res) => {
  const { dailyMilkYieldLt, earTagNumber } = req.body;

  try {
    const animal = await Animal.findOne({ earTagNumber });

    if (!animal) {
      return res.status(404).json({ error: "Hayvan bulunamadı." });
    }

    // Günlük süt üretimini güncelle
    animal.dailyMilkYieldLt = dailyMilkYieldLt;

    // Yıllık süt üretimine ekle
    const currentYear = new Date().getFullYear();
    const milkYearIndex = animal.producedMilkYear.findIndex(
      (milkYear) => milkYear.Year === currentYear
    );

    if (milkYearIndex !== -1) {
      // İlgili yıl zaten var, güncelle
      animal.producedMilkYear[milkYearIndex].TotalMilkProductionLt +=
        dailyMilkYieldLt;
    } else {
      // İlgili yıl yok, yeni yıl ekle
      animal.producedMilkYear.push({
        Year: currentYear,
        TotalMilkProductionLt: dailyMilkYieldLt,
        TotalIncome: 0, // Bu kısmı güncellemeniz gerekebilir
        TotalExpenditure: 0, // Bu kısmı güncellemeniz gerekebilir
      });
    }

    await animal.save();

    res
      .status(200)
      .json({
        message: "Günlük süt üretimi ve yıllık süt üretimi güncellendi.",
      });
  } catch (error) {
    console.error("Süt üretimi güncellenemedi:", error);
    res
      .status(500)
      .json({ error: "Süt üretimi güncellenirken bir hata oluştu." });
  }
});

// Farmer'ın feeding bilgisini güncelleme
router.post("/:farmerTC/updateFeeding", async (req, res) => {
  const { farmerTC } = req.params;
  const { milch, others } = req.body;

  try {
    const farmer = await Farmer.findOne({ farmerTC });

    if (!farmer) {
      res.status(404).json({ error: "Çiftçi bulunamadı." });
    } else {
      // Şu anki tarih
      const currentDate = new Date();
    const todayString = today.toISOString().split("T")[0];

    // Yeni feeding bilgisi
    const newFeeding = {
      date: currentDate,
      milch,
      others,
    };

    // Farmer'ın feeding listesine ekle
    farmer.feeding.push(newFeeding);

    // Farmer'ı kaydet
    await farmer.save();

    res.status(200).json(farmer);
  }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Feeding bilgisi güncellenirken bir hata oluştu." });
  }
});


// Çiftçinin feeding bilgisine yeni bir veri ekleyen route
router.post("/:farmerTC/addFeeding", async (req, res) => {
  const { farmerTC } = req.params;
  const { milch, others } = req.body;

  try {
    const farmer = await Farmer.findOne({ farmerTC });

    if (!farmer) {
      res.status(404).json({ error: "Çiftçi bulunamadı." });
    } else {
      // Şu anki tarih
      const currentDate = new Date();

      // Yeni feeding bilgisi
      const newFeeding = {
        date: currentDate.toISOString().split("T")[0],
        milch,
        others,
      };

      // Farmer'ın feeding listesine ekle
      farmer.feeding.push(newFeeding);

      // Farmer'ı kaydet
      await farmer.save();

      res.status(200).json(farmer);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Feeding bilgisi eklenirken bir hata oluştu." });
  }
});

// // Çiftçinin sahip olduğu hayvanlardan lastInseminationDate'i 25 günden fazla olan hayvanların oranı ve gebelik durumu true olanların oranını döndürme
// router.get("/:farmerTC/pregnancy-stats", async (req, res) => {
//   const { farmerTC } = req.params;

//   try {
//     const farmer = await Farmer.findOne({ farmerTC });

//     if (!farmer) {
//       res.status(404).json({ error: "Çiftçi bulunamadı." });
//     } else {
//       const animalList = await Animal.find({ ownerTC: farmerTC });

//       // Hayvanların sayısını ve lastInseminationDate'i 25 günden fazla olanların sayısını bulma
//       let totalAnimals = 0;
//       let inseminationOver25Days = 0;
//       let pregnantAnimals = 0;

//       for (const animal of animalList) {
//         totalAnimals++;

//         if (animal.lastInseminationDate) {
//           const daysSinceLastInsemination = Math.floor((new Date() - new Date(animal.lastInseminationDate)) / (1000 * 60 * 60 * 24));
//           if (daysSinceLastInsemination > 25) {
//             inseminationOver25Days++;
//           }
//         }

//         if (animal.pregnancyStatus === true) {
//           pregnantAnimals++;
//         }
//       }

//       // Oranları hesapla
//       const inseminationOver25DaysRatio = totalAnimals > 0 ? inseminationOver25Days / totalAnimals : 0;
//       const pregnantAnimalsRatio = totalAnimals > 0 ? pregnantAnimals / totalAnimals : 0;

//       res.status(200).json({
//         inseminationOver25DaysRatio,
//         pregnantAnimalsRatio,
//       });
//     }
//   } catch (error) {
//     console.error("Hayvanlar getirilemedi:", error);
//     res.status(500).json({ error: "Hayvanlar getirilemedi." });
//   }
// });

// aylık yem sarfiyatı + -

// yıllık süt üretimi

// kaç hayvan yüksek grupta kaç hayvan düşük grupta +++++++

// elde ettiğimiz sütün % kaçını düşükten % kaçını yüksekten alıyoruz +++++++

module.exports = router;
