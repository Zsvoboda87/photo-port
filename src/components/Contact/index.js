import React, { useState } from "react";
import { validateEmail } from '../../utils/helpers';


function ContactForm() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const { name, email, message } = formState;
    const [errorMessage, setErrorMessage] = useState('');

    // needs spread operator ... to retain other values, without it, it would overwrite formState to just name value pair
    function handleChange(e) {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            console.log(isValid);
            if (!isValid) {
                setErrorMessage('Your email is invalid.');
            } else {
                setErrorMessage('');
            }
        } else {
            if (!e.target.value.length) {
                setErrorMessage(`${e.target.name} is required.`);
            } else {
                setErrorMessage('');
            }
        }
        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formState);
    }

    return (
        <section>
            <h1>Contact me</h1>
            <form id="contact-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        defaultValue={name}
                        name="name"
                        onBlur={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email address:</label>
                    <input
                        type="email"
                        defaultValue={email}
                        name="email"
                        onBlur={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        name="message"
                        defaultValue={message}
                        rows="5"
                        onBlur={handleChange}
                    />
                </div>
                {errorMessage && (
                    <div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                )}
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default ContactForm;
