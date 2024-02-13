import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { InputAdornment, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import "./stepper.scss";
import React, { useState } from 'react';

const steps = ['Yüksek Grup Yem Sarfiyatı', 'Düşük Grup Yem Sarfiyatı', 'İşlem Tamamlandı!'];

const LinearStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  const defaultDateTime = getDefaultDateTime();

  function getDefaultDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    const day = `${now.getDate().toString().padStart(2, '0')}`;
    const hours = `${now.getHours().toString().padStart(2, '0')}`;
    const minutes = `${now.getMinutes().toString().padStart(2, '0')}`;

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

  }

  const [earTagNumber, setEarTagNumber] = useState("");
  const [farmNumber, setFarmNumber] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [motherEarTagNumber, setMotherEarTagNumber] = useState("");
  const [fatherEarTagNumber, setFatherEarTagNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [group, setGroup] = useState("");
  const [dailyMilkYieldLt, setDailyMilkYieldLt] = useState("");
  const [pregnancyStatus, setPregnancyStatus] = useState("");
  const [lastInseminationDate, setLastInseminationDate] = useState("");
  const [numberOfInsemination, setNumberOfInsemination] = useState("");
  const [dryShippingDate, setDryShippingDate] = useState("");
  const [transitionToTheDeliveryRoomDate, setTransitionToTheDeliveryRoomDate] = useState("");
  const [lastBirthDate, setLastBirthDate] = useState("");
  const [numberOfBirths, setNumberOfBirths] = useState("");
  const [mayBeSick, setMayBeSick] = useState("");



  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <h3 style={{marginTop:'30px'}}>Tüm Adımlar Tamamlandı!</h3>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Sarfiyat girişini yenilemek ister misin?</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="stepper">
              <div className="view">
                <div className="info">
                </div>
                <form className="form" onSubmit={handleSubmit}>
                  {activeStep == 0 &&
                    <>
                      <div className="item">
                        <TextField
                          label="Kuru Ot Karışımı"
                          type="number"
                          id="outlined-start-adornment"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                        />
                      </div>
                      <div className="item">
                        <TextField
                          required
                          type="number"
                          label="Ot Silajı"
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                          onChange={(e) => setFarmNumber(e.target.value)}
                        />
                      </div>
                      <div className="item">
                        <TextField
                          required
                          type="number"
                          label="Mısır Silajı"
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                          onChange={(e) => setBirthDate(e.target.value)}
                        />
                      </div>
                      <div className="item">
                        <TextField
                          required
                          type="number"
                          label="Arpa"
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                          onChange={(e) => setAnimalType(e.target.value)}
                        />
                      </div>
                      <div className="item">
                        <TextField
                          required
                          type="number"
                          label="Yem"
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                          onChange={(e) => setGender(e.target.value)}
                        />
                      </div>
                      <div className="item">

                        <TextField
                          required
                          label="Sarfiyat Ücreti"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                          }}
                        />
                      </div>
                    </>
                  }
                  {activeStep == 1 &&
                    <>
                      <div className="item">
                        <TextField
                          label="Kuru Ot Karışımı"
                          type="number"
                          id="outlined-start-adornment"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                        />
                      </div>
                      <div className="item">
                        <TextField
                          required
                          type="number"
                          label="Ot Silajı"
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                          onChange={(e) => setFarmNumber(e.target.value)}
                        />
                      </div>
                      <div className="item">
                        <TextField
                          required
                          type="number"
                          label="Mısır Silajı"
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                          onChange={(e) => setBirthDate(e.target.value)}
                        />
                      </div>
                      <div className="item">
                        <TextField
                          required
                          type="number"
                          label="Arpa"
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                          onChange={(e) => setAnimalType(e.target.value)}
                        />
                      </div>
                      <div className="item">
                        <TextField
                          required
                          type="number"
                          label="Yem"
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                          onChange={(e) => setGender(e.target.value)}
                        />
                      </div>
                      <div className="item">

                        <TextField
                          required
                          label="Sarfiyat Ücreti"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                          }}
                        />
                      </div>
                    </>
                  }
                                    {activeStep == 2 &&
                    <>
                      <h3>İşlem Tamamlandı!</h3>
                    </>
                  }
                </form>
              </div>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Geri
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                İleri
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Adım {activeStep + 1} zaten tamamlandı ileriye tıklayın!
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Bitir'
                      : 'Adımı Tamamla'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}

export default LinearStepper;