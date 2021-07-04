import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


const CreateProfile = props => {

    const [formData, setFormData] = useState({
        specialization: '',
        hospital: '',
        location: '',
        certificate: '',
        facebook: '',
        twitter: '',
        youtube: ''


    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    const {
        specialization,
        hospital,
        location,
        certificate,
        facebook,
        twitter,
        youtube
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <Fragment>

            <section className="container">
                <h1 className="large text-primary">
                    Create Your Profile
        </h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Let's get some information to make your
          profile stand out
        </p>
                <small>* = required field</small>
                <form className="form">
                    <div className="form-group">
                        <select name="specialization" value={specialization} onChange={e => onChange(e)}>
                            <option value="0">* Select Professional Specialization</option>
                            <option value="General Surgery">General Surgery</option>
                            <option value="Cardiothoracic Surgery">Cardiothoracic Surgery</option>
                            <option value="Vascular Surgery">Vascular Surgery</option>
                            <option value="Dermatology">Dermatology </option>
                            <option value="Neurology">Neurology </option>
                            <option value="Ophthalmologists">Ophthalmologists</option>
                            <option value="Gastroenterologists">Gastroenterologists</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className="form-text"
                        >Give us an idea of where you are at in your career</small
                        >
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="hospital" name="hospital" value={hospital} onChange={e => onChange(e)} />
                        <small className="form-text"
                        >Could be your own hospital or one you work for</small
                        >
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                        <small className="form-text">
                            City and state suggested (eg. Boston, MA)
                            </small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="certificate" name="certificate" value={certificate} onChange={e => onChange(e)} />
                        <small className="form-text">
                            Please tell us about you medical certificate to share with doctors
                            </small>
                    </div>
                    {/* <div className="form-group">
                        <textarea placeholder="A short bio of yourself" name="bio"></textarea>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div> */}

                    <div className="my-2">
                        <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>

                    {displaySocialInputs && <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                        </div>

                    </Fragment>}

                    <input type="submit" className="btn btn-primary my-1" />
                    <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
                </form>
            </section>
        </Fragment>
    )
}

CreateProfile.propTypes = {

}

export default CreateProfile
