import React, { useReducer } from 'react';

const initialState = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    errors: {},
    success: false,
};

const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: action.value,
                errors: { ...state.errors, [action.field]: null },
            };
        case 'SET_ERROR':
            return { ...state, errors: { ...state.errors, [action.field]: action.error } };
        case 'SET_SUCCESS':
            return { ...initialState, success: true };
            return state;
    }
};

const validateForm = (state) => {
    const errors = {};
    if (!state.name.trim()) errors.name = 'Imię i nazwisko jest wymagane.';
    if (!state.email.trim() || !/\S+@\S+\.\S+/.test(state.email)) {
        errors.email = 'Adres e-mail jest wymagany i musi być poprawny.';
    }
    if (!state.subject.trim()) errors.subject = 'Temat jest wymagany.';
    if (!state.message.trim()) errors.message = 'Wiadomość jest wymagana.';
    return errors;
};

function ContactForm() {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'UPDATE_FIELD', field: name, value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(state);
        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([field, error]) => {
                dispatch({ type: 'SET_ERROR', field, error });
            });
        } else {
            console.log('Form submitted successfully with data:', state);
            dispatch({ type: 'SET_SUCCESS' });
        }
    };

    return (
        <div>
            <h1>Formularz kontaktowy</h1>
            {state.success && <p style={{ color: 'green' }}>Formularz został wysłany pomyślnie!</p>}
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label>
                        Imię i nazwisko:
                        <input type='text' name='name' value={state.name} onChange={handleChange} />
                    </label>
                    {state.errors.name && <p style={{ color: 'red' }}>{state.errors.name}</p>}
                </div>
                <div>
                    <label>
                        Adres e-mail:
                        <input
                            type='email'
                            name='email'
                            value={state.email}
                            onChange={handleChange}
                        />
                    </label>
                    {state.errors.email && <p style={{ color: 'red' }}>{state.errors.email}</p>}
                </div>
                <div>
                    <label>
                        Numer telefonu:
                        <input
                            type='tel'
                            name='phone'
                            value={state.phone}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Temat:
                        <input
                            type='text'
                            name='subject'
                            value={state.subject}
                            onChange={handleChange}
                        />
                    </label>
                    {state.errors.subject && <p style={{ color: 'red' }}>{state.errors.subject}</p>}
                </div>
                <div>
                    <label>
                        Wiadomość:
                        <textarea name='message' value={state.message} onChange={handleChange} />
                    </label>
                    {state.errors.message && <p style={{ color: 'red' }}>{state.errors.message}</p>}
                </div>
                <button type='submit'>Wyślij</button>
            </form>
        </div>
    );
}

export default ContactForm;
