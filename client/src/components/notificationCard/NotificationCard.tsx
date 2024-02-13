// NotificationCard.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationCard = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenPopover = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <IconButton aria-label="notifications" size="large" onClick={handleOpenPopover}>
                <div className="notification">
                    <NotificationsIcon />
                    <span>1</span>
                </div>
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Card>
                    <CardContent>
                        <Typography variant="h6">Bildirim Başlığı</Typography>
                        <Typography variant="body1">
                            Bu bir bildirim kartındaki içerik.
                        </Typography>
                    </CardContent>
                    <IconButton
                        edge="end"
                        aria-label="close"
                        onClick={handleClosePopover}
                    >
                        <CloseIcon />
                    </IconButton>
                </Card>
            </Popover>
        </div>
    );
};

export default NotificationCard;
