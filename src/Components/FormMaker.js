import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'

const FormMaker = ({errors, touched, values, status }) => {
    return (
        <div classsName="formContainer">
            <Form>
                <Field type='text' name='personName' placeholder='' />
                <Field type='email' name='personEmail' placeholder='' />
                <Field type='password' name='personPassword' placeholder='' />
                <label className='checkboxContainer'>
                    Terms of Service
                    <Field name='personTOS' type='checkbox' checked={''} />
                    <span className='checkmark' />
                </label>
                <button type='submit'>Submit</button>
            </Form>
        </div>
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