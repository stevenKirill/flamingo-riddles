import React from 'react';
import {
    TwitterShareButton,
    VKShareButton,
    TwitterIcon,
    VKIcon,
    TelegramShareButton,
    TelegramIcon
} from 'react-share';
import './socialMedia.css';

export function SocialMedia({url, options}) {
    const {title} = options;
    return (
        <div className="social_media">
            <div className="social_media_text">Поделиться в соц сетях: </div>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <VKShareButton url={url} title={title}>
                <VKIcon size={32} round={true}/>
            </VKShareButton>
            <TelegramShareButton url={url} title={title}>
                <TelegramIcon size={32} round={true}/>
            </TelegramShareButton>
        </div>
    )
};