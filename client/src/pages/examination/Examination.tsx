
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

import "./examination.scss";

const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
        borderColor: '#E0E3E7',
        borderWidth: 1,
    },
    '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
        borderLeftWidth: 4,
        padding: '4px !important', // override inline-style
    },
});


const Examination = () => {

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

    return (
        <div className="examination">
            <div className="view">
                <div className="info">
                    <h1>Hayvan Sağlığı ve Sürü Yönetim Sistemi</h1>
                    <h2>Veteriner Muayene Kaydı</h2>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="item">
                        <TextField
                            required
                            type="text"
                            label="Hayvan Kulak No"
                            variant="outlined"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            type="text"
                            label="Muayene Tipi"
                            variant="outlined"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            type="datetime-local"
                            label="Muayene Tarihi"
                            variant="outlined"
                            defaultValue={defaultDateTime}
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            type="text"
                            label="Veteriner Ticari Kurum/Kuruluş Adı"
                            variant="outlined"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            type="text"
                            label="Veteriner Kliniği Ticari Ünvanı"
                            variant="outlined"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            type="text"
                            label="Veteriner Kliniği İli"
                            variant="outlined"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            type="text"
                            label="Veteriner Kliniği İlçesi"
                            variant="outlined"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            type="text"
                            label="Veteriner Kliniği Mahallesi/Köyü"
                            variant="outlined"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            type="text"
                            label="Veteriner Klinik Adresi"
                            variant="outlined"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            label="Veteriner Kliniğinden Sorumlu Olan Kişi"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            type="text"
                            label="Hayvanı Tedavi Eden Doktorun T.C. Kimlik Numarası"
                            variant="outlined"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            label="Hayvanı Tedavi Eden Doktorun Adı Soyadı"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </div>
                    <div className="item">
                        <TextField
                            required
                            type="text"
                            label="Muayene Açıklaması"
                            variant="outlined"
                        />
                    </div>
                    <div className="item">

                        <TextField
                            required
                            label="Muayene Ücreti"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                            }}
                        />
                    </div>

                    <div>
                        <input type='checkbox' />
                        <span style={{textDecoration: "underline", marginLeft: "10px"}}>Tüm sorumlulukları ve yasal yükümlülükleri kabul ediyorum.</span>
                    </div>

                    <button>
                        Gönder
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Examination;


{/* <Box
component="form"
noValidate
sx={{
    display: 'grid',
    gridTemplateColumns: { sm: '1fr 1fr' },
    gap: 2,
}}
>

<TextField
    required
    type="text"
    label="farmerTC"
    variant="outlined"
/>

<ValidationTextField
    label="CSS validation style"
    required
    variant="outlined"
    defaultValue="Success"
    id="validation-outlined-input"
/>
</Box> */}