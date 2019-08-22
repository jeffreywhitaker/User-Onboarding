import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'

const FormMaker = ({errors, touched, values, status }) => {
    return (
        <Form className="formContainer">
            <Field type='text' name='personName' placeholder='Name' />
            <Field type='email' name='personEmail' placeholder='example@email.com' />
            <Field type='password' name='personPassword' placeholder='password' />
            <label className='checkboxContainer'>
                Terms of Service
                <Field name='personTOS' type='checkbox' checked={''} />
                <span className='checkmark' />
            </label>
            <button type='submit'>Submit</button>
        </Form>
    )
}

const FormikFormMaker = withFormik({
    mapPropsToValues({ personName, personEmail, personPassword, personTOS }) {
        return {
            personName: personName || '',
            personEmail: personEmail || '',
            personPassword: personPassword || '',
            personTOS: personTOS || false,
        }
    }
})(FormMaker)

export default FormikFormMaker