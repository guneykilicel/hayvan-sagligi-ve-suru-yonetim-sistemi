const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema(
  {
    farmerTC: {
      type: String,
      require: true,
      unique: true,
    },
    farmerPassword: {
      type: String,
      require: true,
      min: 6,
      max: 20,
    },
    farmerFullName: {
      type: String,
      default: "",
    },
    farmerPhone: {
      type: String,
      default: "",
    },
    farmerCity: {
      type: String,
      default: "",
    },
    farmerDistrict: {
      type: String,
      default: "",
    },
    farmerVillage: {
      type: String,
      default: "",
    },
    farmerAddress: {
      type: String,
      default: "",
    },
    feeding: {
      type: Array,
      default: [],
      /*
        date:,
      	milch(Sağmal): {
		      dryHerbMixture(KuruOtKArışımı):,
		      herbSilage(OtSilajı):
		      cornSilage(MısırSilajı):
		      barley(Arpa):
		      forage(Yem):
		      price(Fiyat):
	      },
	      others(Diğerleri): {
		      KuruOtKArışımı:,
		      OtSilajı:
		      MısırSilajı:
		      Arpa:
		      Yem:
		      Fiyat:
	      }

        milch: {
		      dryHerbMixture:,
		      herbSilage:
		      cornSilage:
		      barley:
		      forage:
		      price:
	      },
        others: {
          dryHerbMixture:,
		      herbSilage:
		      cornSilage:
		      barley:
		      forage:
		      price:
        }

      */
    },
    producedMilkYear: {
      type: Array,
      default: [],

    },
    animals: {
      type: Array,
      default: [],
      // animal ear tag numbers
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farmer", FarmerSchema);

// {
//   "farmerTC": "12345678901",
//   "farmerPassword": "password123",
//   "farmerFullName": "Ahmet Yılmaz",
//   "farmerPhone": "5555555555",
//   "farmerCity": "Ankara",
//   "farmerDistrict": "Çankaya",
//   "farmerVillage": "Köyköy",
//   "farmerAddress": "1234 Sokak No: 56",
//   "feeding": [
    // {
    //   "date": "2023-01-01",
    //   "milch": {
    //     "dryHerbMixture": 10,
    //     "herbSilage": 15,
    //     "cornSilage": 20,
    //     "barley": 8,
    //     "forage": 12,
    //     "price": 150
    //   },
    //   "others": {
    //     "dryHerbMixture": 8,
    //     "herbSilage": 12,
    //     "cornSilage": 18,
    //     "barley": 6,
    //     "forage": 10,
    //     "price": 120
    //   }
    // }
//   ],
//   "producedMilkYear": [
//     {
//       "year": 2023,
//       "totalMilkProduction": 5000
//     }
//   ],
//   "animals": ["TR061234567", "TR061234568", "TR061234569"]
// }
