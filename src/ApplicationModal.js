import React from 'react';
import Modal from 'react-modal';
import { useState, useRef } from 'react';

const customStyles = {
    overlay: {
        zIndex: '19',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    content: {
        zIndex: '19',
        top: '20px',
        bottom: '20px',
        position: 'absolute',
        inset: '20px',
        border: '1px solid rgb(204, 204, 204)',
        background: 'rgba(0, 0, 0, 0.65)',
        overflow: 'auto',
        borderRadius: '25px',
        outline: 'none',
        padding: '20px',
        maxWidth: '400px',
        margin: 'auto',
        
        // top: '50%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const ApplicationModal = (props) => {
    const userName = useRef(null);
    const selectLink = useRef(null);
    const [modalError, setModalError] = useState(false);
    const [flag, setFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});

    function closeModal() {
        props.setIsOpen(false);
    }

    const handleSocialLinks = (e) => {
        e.preventDefault();
        setFlag(!flag);
        const uName = userName?.current?.value
        const selectedLink = selectLink?.current?.value;
        setModalError(false);
        if (selectedLink === 'Select App' || uName.trim() === '') {
            if (selectedLink === 'Select App') {
                errorMessage.link = 'This field is mandatory';
            } else {
                errorMessage.link = '';
            }
            if (uName.trim() === '') {
                errorMessage.uname = 'This field is mandatory';
            } else {
                errorMessage.uname = '';
            }
            setErrorMessage(errorMessage);

            setModalError(true);
            return false;
        }

        props.socialLinks[selectedLink] = userName?.current?.value
        props.setSocialLinks(props.socialLinks);
        props.setIsOpen(false);
    };

    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <form onSubmit={handleSocialLinks}>
                                <div class="form-group">
                                    <select ref={selectLink} name="" id="social_links" class="form-control">
                                        <option value="Select App">Select App</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="linkdin">LinkedIn</option>
                                        <option value="snapchat">Snapchat</option>
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="youtube">YouTube</option>
                                    </select>
                                    <span className={modalError && errorMessage?.link !== '' ? 'span-error' : ''}>{modalError && errorMessage?.link !== '' ? errorMessage?.link : ''}</span>
                                </div>
                                <div class="form-group">
                                    <input ref={userName} type="text" placeholder="Username" class="form-control" />
                                    <span className={modalError && errorMessage.uname !== '' ? 'span-error' : ''}>{modalError && errorMessage.uname !== '' ? errorMessage.uname : ''}</span>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button onClick={closeModal} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={handleSocialLinks} type="button" class="btn btn-primary btn-bg-clr">Submit</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>);
}


export default ApplicationModal;