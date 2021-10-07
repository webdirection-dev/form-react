import React, {Component} from 'react';
import {onValidateName, onValidateEmail} from "../helpers";
import './form.css'

export default class FormWithRef extends Component{
    constructor() {
        super();

        this.state = {
            creditCard: '',
            email: '',
            firstName: '',
            message: '',
            select: '',
            subscription: false,
            gender: ''
        }

        // работаем с рефами
        // По умолчанию свойства рефов - null
        // Доступ к рефам через current: this.refName.current
        this.creditCardRef = React.createRef();
        this.firstNameRef = React.createRef();
    }

    componentDidMount() {
        const myRef = this.creditCardRef;
        console.log(myRef);

        myRef.current.focus();
    }

    onChangeInput = (event) => {
        const {name, value} = event.target;
        let valueToState = value;
        if (name === 'email') valueToState = value.toLowerCase();

        // Если у setState 1й параметр фунция, то вторым параметром может быть колбэк
        this.setState(() => ({[name]: valueToState}), () => {
            if (this.state.creditCard.length === 16) this.firstNameRef.current.focus();
        });

        // this.setState({
        //     [name]: valueToState
        // });

        console.log(`${[name]}: ${value}`);
    };

    onCheckBox = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: !this.state.subscription
        });
        console.log(`${[name]}: ${value}`);

    }

    onSubmitForm = (event) => {
        event.preventDefault();

        let letter = '';
        const {firstName, message, email, subscription} = this.state;
        const {name, value} = event.target;
        console.log(`${[name]}: ${value}`);

        if (subscription) {
            letter = `Dear  ${firstName}, you sent a letter with text: "${message}" to email ${email} :)`

            this.setState({
                firstName: '',
                email: '',
                message: '',
                select: '',
                subscription: false,
                gender: ''
            });
        } else letter = 'Data entered incorrectly :(';

        alert(letter);
    }

    render() {
        const {creditCard, firstName, email, message, select, subscription, gender} = this.state;

        // Доступ к рефам через current: this.refName.current
        // console.log(this.firstName.current)

        return(
            <form className='form__wrapper' onSubmit={this.onSubmitForm}>
                <h1 className='form__txt'>Data from input/state are in Console/Components</h1>

                <input
                    value={creditCard}
                    name='creditCard'
                    className='form__input'
                    placeholder='0000 0000 0000 0000'
                    type="text"
                    onChange={this.onChangeInput}
                    onBlur={() => {
                        onValidateName(this.state.creditCard)
                    }}
                    ref={this.creditCardRef}
                />

                <input
                    value={firstName}
                    name='firstName'
                    className='form__input'
                    placeholder='Name'
                    type="text"
                    onChange={this.onChangeInput}
                    onBlur={() => {
                        onValidateName(this.state.firstName)
                    }}
                    ref={this.firstNameRef}
                />

                <input
                    value={email}
                    name='email'
                    className='form__input'
                    placeholder='Email'
                    type="email"
                    onChange={this.onChangeInput}
                    onBlur={() => {
                        onValidateEmail(this.state.email)
                    }}
                />

                <textarea
                    value={message}
                    name="message"
                    className='form__input form__input-area'
                    placeholder='Enter text'
                    id=""
                    cols="30"
                    rows="10"
                    onChange={this.onChangeInput}
                />

                <select
                    value={select}
                    name="select"
                    className=' form__input form__input-select'
                    onChange={this.onChangeInput}
                >
                    <option value="" disabled/>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <div className='form__checkbox'>
                    <label htmlFor="subscription" className='form__checkbox-label'>Subscription</label>
                    <input
                        checked={subscription}
                        name='subscription'
                        className='form__input form__input-checkbox'
                        type="checkbox"
                        onChange={this.onCheckBox}
                    />
                </div>

                <div className='form__checkbox'>
                    <label htmlFor="gender" className='form__checkbox-label'>Male</label>
                    <input
                        checked={gender === 'male'}
                        value='male'
                        name='gender'
                        className='form__input form__input-checkbox'
                        type="radio"
                        onChange={this.onChangeInput}
                    />

                    <label htmlFor="gender" className='form__checkbox-label'>Female</label>
                    <input
                        checked={gender === 'female'}
                        value='female'
                        name='gender'
                        className='form__input form__input-checkbox'
                        type="radio"
                        onChange={this.onChangeInput}
                    />
                </div>

                <input
                    value='Submit'
                    type='submit'
                    className='form__input form__submit'
                    // onClick={this.onSubmitForm}
                />
            </form>
        )
    }
};