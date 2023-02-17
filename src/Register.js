import React from 'react';
import { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import ApplicationModal from './ApplicationModal';
import closeIcon from './images/close-ic.svg'
import facebookIcon from './images/facebook-ic.svg';
import whatsappIcon from './images/whatsapp-ic.svg';
import linkedinIcon from './images/linkedin-ic.svg';
import snapchatIcon from './images/snapchat-ic.svg';
import youtubeIcon from './images/youtube-ic.svg';
import instagramIcon from './images/instagram-ic.svg';
import addIcon from './images/add-ic.svg';
import saveIcon from './images/save-ic.svg';
import phoneIcon from './images/phone-ic.svg';
import emailIcon from './images/email-ic.svg';
import linkIcon from './images/link-ic.svg';
import locationIcon from './images/location-ic.svg';
import { socialMediaUrl } from './constants';
import axios from 'axios';
import env from './config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';


const Register = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(false);
    const [flag, setFlag] = useState(false);
    const [socialLinks, setSocialLinks] = useState({});
    const [apiResponse, setResponse] = useState([]);
    const userName = useRef('');
    const designation = useRef('');
    const tagline = useRef('');
    const contactNumber = useRef('');
    const email = useRef('');
    const website = useRef('');
    const location = useRef('');
    const history = useHistory();
    const reCaptchaRef = useRef();

    const findIndex = (link) => {
        if (socialLinks[link]) {
            return socialLinks[link];
        }
        return -1
    }

    const removeLink = (link) => {
        setFlag(!flag);
        if (link) {
            let newLinks = socialLinks;
            delete newLinks[link];
            setSocialLinks(newLinks);
        }
    }

    const handleSubmit = async () => {
        setFlag(!flag);
        const token = reCaptchaRef.current.executeAsync();
        let formData = {}
        if (userName.current.value === '' || designation.current.value === '' || contactNumber.current.value === '' || email.current.value === '') {
            setError(true);
            toast("Some validations error are there, Please fix it!")
            return false;
        }
        const connectionId = localStorage.getItem('my-pop-connect');

        if (connectionId === '') {
            toast("Unable to perform this action right now!")
            return false;
        }

        formData.name = userName?.current?.value;
        formData.contact_number = contactNumber?.current?.value;
        formData.social_link = socialLinks;
        formData.website = website?.current?.value;
        formData.designation = designation?.current?.value;
        formData.profile_color = '#00408A';
        formData.email = email?.current?.value;
        formData.location = location?.current?.value;
        formData.connection_id = connectionId;
        axios.post(env.BACKEND_APP_CREATE_ACCOUNT, formData)
            .then(response => {
                if (response?.data?.Data.error) {
                    setResponse(response?.data?.Data.error);
                    setError(true);
                    toast("Some validations error are there, Please fix it!");
                    return false;
                }
                reCaptchaRef.current.reset();
                setResponse(response);
                toast("Account has been created successfully.");
                setTimeout(() => {
                    history.goBack();
                }, 2000);
            });
        setError(false);
    }

    return (
        <div>
            <main role="main" class="admin_view edit_view">
                <div class="save-close-btn">
                    <a onClick={() => history.goBack()} className='btn-cancel'><img src={closeIcon} alt="close icon" /></a>
                    <a onClick={handleSubmit} className='btn-save'><img src={saveIcon} alt="save icon" /></a>
                </div>
                <div class="profile-wrp">
                    <div class="name-descr">
                        <input type="text" ref={userName} placeholder="Name*" class="form-control" />
                        <span className={error && userName.current.value === '' ? 'span-error' : ''}>{error && userName.current.value === '' ? 'Please enter valid Name' : ''}</span>
                        <span className={error && apiResponse?.name !== '' ? 'span-error' : ''}>{error && apiResponse?.name !== '' ? apiResponse?.name : ''}</span>

                        <input type="text" ref={designation} placeholder="Company/Designation*" class="form-control" />
                        <span className={error && designation.current.value === '' ? 'span-error' : ''}>{error && designation.current.value === '' ? 'Please enter valid Company/Designation' : ''}</span>
                        <span className={error && apiResponse?.designation !== '' ? 'span-error' : ''}>{error && apiResponse?.designation !== '' ? apiResponse?.designation : ''}</span>

                        <input type="text" ref={tagline} placeholder="Tagline" class="form-control tagline" />

                    </div>
                    <div class="contact-details">
                        <ul>
                            <li>
                                <a>
                                    <img className='registration_img' src={phoneIcon} alt="phone icon" />
                                    <input type="number" ref={contactNumber} placeholder="Contact number*" class="form-control" />
                                </a>
                                <div>
                                    <span className={error && contactNumber.current.value === '' ? 'span-error-social' : ''}>{error && contactNumber.current.value === '' ? 'Please enter valid Contact Number' : ''}</span>
                                    <span className={error && apiResponse?.contact_number !== '' ? 'span-error-social' : ''}>{error && apiResponse?.contact_number !== '' ? apiResponse?.contact_number : ''}</span>
                                </div>
                            </li>
                            <li>
                                <a>
                                    <img className='registration_img' src={emailIcon} alt="email icon" />
                                    <input type="email" ref={email} placeholder="Email address*" class="form-control" />
                                </a>
                                <div>
                                    <span className={error && email.current.value === '' ? 'span-error-social' : ''}>{error && email.current.value === '' ? 'Please enter valid Email address' : ''}</span>
                                    <span className={error && apiResponse?.email !== '' ? 'span-error-social' : ''}>{error && apiResponse?.email !== '' ? apiResponse?.email : ''}</span>
                                </div>
                            </li>
                            <li>
                                <a>
                                    <img className='registration_img' src={linkIcon} alt="link icon" />
                                    <input type="text" ref={website} placeholder="Website" class="form-control" />
                                </a>
                            </li>
                            <li>
                                <a>
                                    <img className='registration_img' src={locationIcon} alt="location icon" />
                                    <input type="text" ref={location} placeholder="Location" class="form-control" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ReCAPTCHA
                            className='recaptchaClass'
                            sitekey='6LdsdLUhAAAAAPz6V2vJykjEEKr0pM6arPtt3LX1'
                            size="invisible"
                            ref={reCaptchaRef}
                        />
                    </div>
                    <div class="social-btns">
                        <h3>Apps</h3>
                        <ul>
                            {
                                (findIndex('facebook') !== -1) && (
                                    <li>
                                        <a onClick={() => removeLink('facebook')} class="close-ic" data-bs-toggle="modal" data-bs-target="#ConfirmDelete">
                                            <img src={closeIcon} alt="close icon" />
                                        </a>
                                        <a target="_blank" href={`${socialMediaUrl['facebook']}${socialLinks['facebook']}`} rel="noreferrer">
                                            <img src={facebookIcon} alt="facebook icon" />
                                        </a>
                                    </li>
                                )
                            }
                            {
                                (findIndex('whatsapp') !== -1) && (
                                    <li>
                                        <a onClick={() => removeLink('whatsapp')} class="close-ic" data-bs-toggle="modal" data-bs-target="#ConfirmDelete">
                                            <img src={closeIcon} alt="close icon" />
                                        </a>
                                        <a target="_blank" href={`${socialMediaUrl['whatsapp']}${socialLinks['whatsapp']}`} rel="noreferrer">
                                            <img src={whatsappIcon} alt="whatsApp icon" />
                                        </a>
                                    </li>
                                )
                            }
                            {
                                (findIndex('linkdin') !== -1) && (
                                    <li>
                                        <a onClick={() => removeLink('linkdin')} class="close-ic" data-bs-toggle="modal" data-bs-target="#ConfirmDelete">
                                            <img src={closeIcon} alt="close icon" />
                                        </a>
                                        <a target="_blank" href={`${socialMediaUrl['linkdin']}${socialLinks['linkdin']}`} rel="noreferrer">
                                            <img src={linkedinIcon} alt="linkedin icon" />
                                        </a>
                                    </li>
                                )
                            }
                            {
                                (findIndex('snapchat') !== -1) && (
                                    <li>
                                        <a onClick={() => removeLink('snapchat')} class="close-ic" data-bs-toggle="modal" data-bs-target="#ConfirmDelete">
                                            <img src={closeIcon} alt="close icon" />
                                        </a>
                                        <a target="_blank" href={`${socialMediaUrl['snapchat']}${socialLinks['snapchat']}`} rel="noreferrer">
                                            <img src={snapchatIcon} alt="snapchat icon" />
                                        </a>
                                    </li>
                                )
                            }
                            {
                                (findIndex('youtube') !== -1) && (
                                    <li>
                                        <a onClick={() => removeLink('youtube')} class="close-ic" data-bs-toggle="modal" data-bs-target="#ConfirmDelete">
                                            <img src={closeIcon} alt="close icon" />
                                        </a>
                                        <a target="_blank" href={`${socialMediaUrl['youtube']}${socialLinks['youtube']}`} rel="noreferrer">
                                            <img src={youtubeIcon} alt="youtube icon" />
                                        </a>
                                    </li>
                                )
                            }
                            {
                                (findIndex('instagram') !== -1) && (
                                    <li>
                                        <a onClick={() => removeLink('instagram')} class="close-ic" data-bs-toggle="modal" data-bs-target="#ConfirmDelete">
                                            <img src={closeIcon} alt="close icon" />
                                        </a>
                                        <a target="_blank" href={`${socialMediaUrl['instagram']}${socialLinks['instagram']}`} rel="noreferrer">
                                            <img src={instagramIcon} alt="instagram icon" />
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                        <a class="add-ic" onClick={() => setIsOpen(true)}><img src={addIcon} alt="add icon" /></a>
                    </div>
                </div>
            </main>
            {
                modalIsOpen && (
                    <ApplicationModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
                )
            }
            <ToastContainer position="top-center" />
        </div>
    );
}

export default Register;