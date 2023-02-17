import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import env from './config';
import './App.css';
import phone from './images/phone-ic.svg';
import email from './images/email-ic.svg';
import link from './images/link-ic.svg';
import location from './images/location-ic.svg';
import playStore from './images/play-store.png';
import appStore from './images/app-store.png';
import facebook from './images/facebook-ic.svg';
import whatsapp from './images/whatsapp-ic.svg';
import linkedin from './images/linkedin-ic.svg';
import instagram from './images/instagram-ic.svg';
import snapchat from './images/snapchat-ic.svg';
import youtube from './images/youtube-ic.svg';
import cover_picture from './images/mypop-cover-picture.png';
import profile_picture from './images/mypop-profile-picture.png';
import { Triangle } from 'react-loader-spinner'
import './Style.css';
import FileSaver from "file-saver";
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faLink, faLocationDot } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const queryParam = window.location.search.replace('?id=', '');
    const params = queryParam.split("&adminToken=");
    const myPopId = params[0];

    if (myPopId !== '') {
      localStorage.setItem('my-pop-connect', myPopId);
    }

    const headers = {
      'Content-Type': 'application/json',
      'MyPop': myPopId
    }

    axios.get(env.BACKEND_APP_URL, {
      headers: headers
    }).then(function (response) {
      // handle success
      setLoading(false);
      if (response?.data?.Data) {
        setData(response?.data?.Data);
      }
    })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
  }, []);

  const saveContact = (e) => {
    console.log('In,..');
    //create a new vCard
    e.preventDefault();
    var file = new Blob(
      [
        `BEGIN:VCARD
VERSION:3.0
N:${data?.name};;;
FN:${data?.name}

EMAIL;PREF=1;type=MAIN;type=work:${data?.email}
TITLE;type=TITLE:${data?.connection_profile?.designation}
TEL;type=CELL;type=VOICE;type=pref:${data?.connection_profile?.contact_number}
ADR;type=WORK;type=pref:;;;${data?.connection_profile?.location};;;
END:VCARD
`     ],
      { type: "text/vcard;charset=utf-8" }
    );
    let a = document.createElement("a");
    a.download = `${data?.name}.vcf`;
    a.href = URL.createObjectURL(file);
    FileSaver.saveAs(
      file,
      `${data?.name}.vcf`,
      true
    );
  }

  if (loading) {
    return (
      <div className='loader'>
        <Triangle heigth="100" width="100" color="grey" ariaLabel="loading-indicator" />
      </div>
    )
  }
  if (!data.id) {
    return (
      <>
        <div className='loader'>
          <h4> Invalid user or token </h4>
        </div>
      </>
    )
  }

  return (
    <main role="main" className="admin_view">

      <div className="cover-img">
        <img src={cover_picture} alt="cover-logo" />
      </div>
      <div className="profile-wrp">
        <div className="profile-img">
          <img src={data?.connection_profile?.profile_picture || profile_picture} alt="profile-picture" />
        </div>
        <div className="name-descr">
          <h1>{data?.name}</h1>
          <p className="designation">{data?.connection_profile?.designation}</p>
          {/* <FontAwesomeIcon color='red' icon={faPhone} /> */}
          <p>{data?.connection_profile?.tagline}</p>
        </div>
        <div className="btns-group">
          <div className="row">
            <div className="col-6">
              <a className="btn" style={{ backgroundColor: data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A' }} onClick={() => history.push("/mypop-register")}>Let's connect </a>
            </div>
            <div className="col-6">
              <a onClick={saveContact} className="btn white-btn">Save contact</a>
            </div>
          </div>
        </div>
        <div className="contact-details">
          <ul>
            <>
              <li>
                <a>
                  {/* <img src={phone} alt="phone" /> */}
                  <span className='font-awesome-icon' style={{ backgroundColor: data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A' }}><FontAwesomeIcon icon={faPhone} /></span>
                  <span>{data?.connection_profile?.contact_number}</span>
                </a>
              </li>
              <li>
                <a>
                  {/* <img src={email} alt="email" /> */}
                  <span className='font-awesome-icon' style={{ backgroundColor: data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A' }}><FontAwesomeIcon icon={faEnvelope} /> </span>
                  <span>{data?.email}</span>
                </a>
              </li><li>
                <a>
                  {/* <img src={link} alt="link" /> */}
                  <span className='font-awesome-icon' style={{ backgroundColor: data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A' }}><FontAwesomeIcon icon={faLink} /></span>
                  <span>{data?.connection_profile?.website}</span>
                </a>
              </li><li>
                <a>
                  {/* <img src={location} alt="location" /> */}
                  <span className='font-awesome-icon' style={{ backgroundColor: data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A' }}><FontAwesomeIcon icon={faLocationDot} /></span>
                  <span>{data?.connection_profile?.location}</span>
                </a>
              </li>
            </>
          </ul>
        </div>

        <div class="social-btns">
          <ul>
            {
              data?.connection_profile?.social_link?.facebook && (
                <li>
                  <a target="_blank" href={data?.connection_profile?.social_link?.facebook} rel="noreferrer">
                    {/* <img src={facebook} alt="Facebook" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                      <g>
                        <path fill={data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A'} d="M19.7,27.8c-0.4,0-0.7,0-1.1,0c-1.5,0-3,0-4.5,0c-0.9,0-1.2-0.3-1.2-1.1c0-2.3,0-4.6,0-6.9
		c0-0.8,0.3-1.1,1.2-1.1c1.6,0,3.3,0,4.9,0c0.2,0,0.4,0,0.7,0c0-0.3,0-0.5,0-0.7c0.1-2.1-0.1-4.2,0.1-6.2c0.4-5.2,4.4-9,9.7-9.2
		c2.2-0.1,4.4-0.1,6.6-0.1c0.7,0,1.1,0.3,1.1,1.1c0,2.2,0,4.3,0,6.5c0,0.7-0.3,1-1.1,1.1c-1.5,0.1-3,0.1-4.4,0.1
		c-1.7,0-2.4,0.7-2.4,2.4c-0.1,1.6,0,3.3,0,4.9c0.2,0,0.4,0,0.6,0.1c1.9,0,3.8,0,5.7,0c1.2,0,1.5,0.3,1.5,1.5c0,2.1,0,4.3,0,6.5
		c0,1-0.2,1.3-1.3,1.3c-2,0-3.9,0-5.8,0c-0.2,0-0.4,0-0.7,0c0,0.3,0,0.5,0,0.7c0,5.7,0,11.5,0,17.2c0,1.5-0.2,1.7-1.7,1.7
		c-2.1,0-4.2,0-6.3,0c-1.2,0-1.4-0.3-1.4-1.4c0-5.8,0-11.6,0-17.4C19.7,28.4,19.7,28.2,19.7,27.8z"/>
                      </g>
                    </svg>
                  </a>
                </li>
              )
            }

            {
              data?.connection_profile?.social_link?.whatsapp && (
                <li>
                  <a target="_blank" href={data?.connection_profile?.social_link?.whatsapp} rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                      <g> <path fill={data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A'} d='M3.7,46.3c1-2.5,1.8-4.8,2.8-7.2c0.2-0.6,0.2-1.1-0.2-1.7C-1.7,25.5,3.5,9.4,16.7,4.1C29.7-1,44.3,6.8,47,20.5 c2.5,12.1-5.4,24.1-17.5,26.5c-5.8,1.2-11.4,0.2-16.5-3c-0.3-0.2-0.6-0.2-0.9-0.1c-2.6,0.8-5.3,1.5-8,2.3C4,46.3,3.9,46.3,3.7,46.3 z M31.8,37.7c1.2,0.1,2.2-0.3,3-1.2c0.6-0.7,1.3-1.2,1.9-1.9c1.1-1.1,1.1-2.7,0.1-3.8c-1.1-1.1-2.2-2.2-3.3-3.3 c-1.3-1.3-3.3-0.9-4,0.8c-0.4,1.2-1.7,1.8-2.9,1.4c-0.7-0.3-1.5-0.6-2.1-1.1c-1.9-1.3-3.4-2.9-4.2-5.1c-0.5-1.4,0.1-2.5,1.5-3.1 c1.7-0.7,2.1-2.6,0.8-3.9c-1.1-1.2-2.3-2.3-3.4-3.4c-1-1-2.5-1-3.5,0c-0.7,0.7-1.3,1.3-2,2c-1.1,1-1.4,2.2-1.2,3.5 c0.2,1.3,0.6,2.6,1.1,3.8c2.9,6,7.5,10.5,13.3,13.8C28.5,37.1,30.1,37.6,31.8,37.7z' /> </g>
                    </svg>
                  </a>
                </li>
              )
            }
            {
              data?.connection_profile?.social_link?.linkedin && (
                <li>
                  <a target="_blank" href={data?.connection_profile?.social_link?.linkedin} rel="noreferrer">
                    {/* <img src={linkedin} alt="linkedin" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                      <g>
                        <path fill={data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A'} d="M27.7,47.5c-3.1,0-6.2,0-9.3,0c0-10,0-20,0-30c2.9,0,5.8,0,8.9,0c0,1.3,0,2.6,0,4c0.1-0.1,0.2-0.1,0.2-0.1
		c2-3.1,4.9-4.6,8.5-4.7c2.1-0.1,4.1,0.2,6,1.1c2.5,1.2,3.8,3.2,4.6,5.7c0.6,2,0.8,4.1,0.8,6.2c0,5.7-0.1,11.5-0.1,17.3
		c0,0.1,0,0.2,0,0.3c-3.1,0-6.2,0-9.3,0c0-0.2,0-0.4,0-0.6c0-4.9,0-9.8,0-14.7c0-1.1-0.1-2.2-0.3-3.3c-0.6-3.1-2.6-4.1-5.5-3.8
		c-2.6,0.3-4,1.9-4.4,4.7c-0.2,1-0.2,2.1-0.2,3.1c0,4.7,0,9.4,0,14.1C27.7,47,27.7,47.2,27.7,47.5z"/>
                        <path fill={data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A'} d="M3.3,17.5c3.1,0,6.2,0,9.3,0c0,10,0,20,0,30c-3.1,0-6.2,0-9.3,0C3.3,37.5,3.3,27.5,3.3,17.5z" />
                        <path fill={data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A'} d="M13.3,7.9c0,3-2.4,5.5-5.3,5.5c-3,0-5.5-2.5-5.5-5.5c0-2.9,2.4-5.4,5.3-5.4C10.8,2.4,13.3,4.9,13.3,7.9z" />
                      </g>
                    </svg>
                  </a>
                </li>
              )
            }
            {
              data?.connection_profile?.social_link?.instagram && (
                <li>
                  <a target="_blank" href={data?.connection_profile?.social_link?.instagram} rel="noreferrer">
                    {/* <img src={instagram} alt="instagram" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                      <g>
                        <path fill={data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A'} d="M31.8,47.5c-4.5,0-9,0-13.5,0c-0.3,0-0.6-0.1-0.8-0.1c-1.8-0.1-3.6-0.1-5.3-0.6c-3.7-0.9-6.5-3-8.2-6.5
		c-1-2.2-1.3-4.5-1.4-6.9C2.6,28.7,2.5,23.8,2.6,19c0-2.3,0.1-4.7,0.6-7c1-4,3.3-6.8,7.1-8.4c2.1-0.9,4.2-1.1,6.4-1.1
		c4.6-0.1,9.1-0.1,13.7-0.1c2.4,0,4.8,0,7.2,0.5c4.3,1,7.4,3.5,8.9,7.7c0.8,2.1,0.9,4.2,0.9,6.3c0,5.2,0.1,10.4,0,15.6
		c0,1.5-0.2,3-0.4,4.4c-0.5,3-1.8,5.5-4.2,7.5c-2.3,1.9-5,2.7-7.9,2.9C33.9,47.4,32.8,47.4,31.8,47.5z M25,43.5L25,43.5
		c1.2-0.1,2.4,0,3.6-0.1c2.6-0.1,5.2-0.1,7.7-0.4c3.5-0.5,5.8-2.5,6.7-5.9c0.4-1.4,0.5-2.9,0.5-4.3c0.1-4.2,0.1-8.4,0.1-12.5
		c0-2.2-0.1-4.4-0.4-6.5c-0.5-3.6-2.7-6.1-6.3-6.8c-1.6-0.3-3.2-0.4-4.8-0.5c-4.2-0.1-8.4-0.1-12.7,0c-2,0-3.9,0.1-5.9,0.4
		c-3.5,0.5-5.8,2.8-6.5,6.1c-0.3,1.5-0.4,3-0.5,4.5C6.6,21.4,6.6,25,6.6,28.7c0.1,2.5,0.1,5.1,0.4,7.6c0.3,2.6,1.5,4.7,3.8,6
		c1.4,0.8,3,1.2,4.6,1.2C18.5,43.4,21.8,43.4,25,43.5z"/>
                        <path fill={data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A'} d="M13.5,25c0-6.4,5.2-11.6,11.6-11.6c6.4,0,11.5,5.2,11.5,11.5S31.4,36.5,25,36.5C18.6,36.6,13.5,31.4,13.5,25z
		 M25,32.5c4.2,0,7.5-3.3,7.5-7.5c0-4.2-3.3-7.5-7.5-7.5s-7.5,3.4-7.5,7.5S20.9,32.5,25,32.5z"/>
                        <path fill={data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A'} d="M37.1,10.3c1.5,0.1,2.7,1.3,2.6,2.8c-0.1,1.5-1.3,2.7-2.8,2.6c-1.5,0-2.7-1.3-2.7-2.8
		C34.3,11.4,35.6,10.3,37.1,10.3z"/>
                      </g>
                    </svg>
                  </a>
                </li>
              )
            }
            {
              data?.connection_profile?.social_link?.snapchat && (
                <li>
                  <a target="_blank" href={data?.connection_profile?.social_link?.snapchat} rel="noreferrer">
                    {/* <img src={snapchat} alt="snapchat" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                      <g>
                        <path fill={data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A'} d="M37.1,16.4c-0.1,1.5-0.1,3-0.3,4.5c0,0.5,0.1,0.7,0.6,0.8c1,0.3,1.9,0,2.7-0.4c0.6-0.3,1.2-0.2,1.9,0
		c1.1,0.5,1.2,1.4,0.2,2.1c-0.7,0.5-1.5,0.7-2.3,1.1c-0.5,0.2-1.1,0.4-1.6,0.7c-1.1,0.6-1.4,1.5-0.9,2.7c0.5,1.1,1.1,2.3,1.9,3.3
		c1.8,2.4,4,4.2,7,5c0.2,0,0.5,0.1,0.7,0.1c0.4,0.1,0.6,0.4,0.4,0.8c-0.2,0.3-0.5,0.7-0.9,0.8c-1,0.4-2,0.7-3,1
		c-0.5,0.1-1.1,0.2-1.6,0.3c-0.4,0-0.7,0.3-0.8,0.7c-0.1,0.5-0.2,1.1-0.4,1.6c-0.2,0.7-0.3,0.8-1.1,0.7c-1.2-0.1-2.5-0.3-3.8-0.3
		s-2.5,0.4-3.6,1.1c-0.8,0.5-1.6,1.1-2.4,1.6c-3.4,2.1-6.8,2.1-10.2-0.1c-0.6-0.4-1.2-0.8-1.7-1.2c-1.8-1.4-3.8-1.6-6-1.4
		c-0.6,0.1-1.2,0.2-1.8,0.3c-0.7,0.1-0.9,0-1.1-0.7c-0.1-0.5-0.3-1.1-0.4-1.6c-0.1-0.4-0.3-0.6-0.8-0.6c-1.3-0.3-2.7-0.6-4-1
		c-0.4-0.1-0.9-0.5-1.2-0.8c-0.5-0.5-0.3-1,0.3-1.1c3.5-0.7,6-2.8,8-5.7c0.5-0.8,1-1.7,1.4-2.6c0.6-1.2,0.2-2.2-1-2.9
		c-0.6-0.3-1.3-0.5-2-0.8c-0.7-0.3-1.3-0.6-1.9-1C6.9,22.8,7,22,7.9,21.5c0.6-0.3,1.1-0.4,1.8-0.1c0.8,0.3,1.5,0.6,2.4,0.5
		c0.2,0,0.4-0.1,0.6-0.1c0.3-0.1,0.4-0.3,0.4-0.7C13,19,12.9,17,12.9,15c0.1-4.9,2.5-8.3,7-10c4.6-1.8,9.2-1.4,13.2,1.7
		c2.7,2.2,4,5.1,3.9,8.6C37,15.6,37,16,37.1,16.4L37.1,16.4z"/>
                      </g>
                    </svg>
                  </a>
                </li>
              )
            }
            {
              data?.connection_profile?.social_link?.youtube && (
                <li>
                  <a target="_blank" href={data?.connection_profile?.social_link?.youtube} rel="noreferrer">
                    {/* <img src={youtube} alt="youtube" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                      <g>
                        <path fill={data?.connection_profile?.profile_color ? data?.connection_profile?.profile_color : '#00408A'} d="M25,8.9c4.6,0,9.1,0.1,13.7,0c4.6-0.1,7.8,3.1,8.5,6.5c0.2,0.7,0.3,1.5,0.3,2.3c0,4.9,0,9.8,0,14.8
		s-3.7,8.7-8.7,8.7c-9.2,0-18.4,0-27.7,0c-4.9,0-8.7-3.7-8.7-8.7s0-9.9,0-14.9c0-4.8,3.5-8.5,8.3-8.6C15.6,8.9,20.3,8.9,25,8.9
		L25,8.9z M19.1,18.1c0,4.7,0,9.2,0,13.8c3.9-2.3,7.8-4.6,11.8-6.9C26.9,22.7,23.1,20.4,19.1,18.1z"/>
                      </g>
                    </svg>
                  </a>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
