import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import '../index.css'

const FormMaker = ({errors, touched, values, status }) => {
    const[users, setUsers] = useState([])
    console.log('this is touched', touched)
    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
        <>
        <Form className="formContainer">
            <Field type='text' name='personName' placeholder='Name' />
            {touched.personName && errors.personName && (
                <p className='error'>{errors.personName}</p>
            )}

            <Field type='email' name='personEmail' placeholder='example@email.com' />
            {touched.personEmail && errors.personEmail && (
                <p className='error'>{errors.personEmail}</p>
            )}

            <Field type='password' name='personPassword' placeholder='password' />
            {touched.personPassword && errors.personPassword && (
                <p className='error'>{errors.personPassword}</p>
            )}

            <label className='checkboxContainer'>
                Terms of Service
                <Field name='personTOS' type='checkbox' checked={values.personTOS} />
                {/* <span className='checkmark' /> */}
                {touched.personTOS && errors.personTOS && (
                    <p className='error'>{errors.personTOS}</p>
                )}
            </label>
            <button className='button' type='submit'>Submit</button>
        </Form>
        <h2>List of Users</h2>
        <div className='userListContainer'>
            {users.map(user => (
            <div className='userCard'key={user.id}>
                <span>Name: {user.personName}</span>
                <br></br>
                <span>Email: {user.personEmail}</span>
            </div> 
            ))} 
        </div>

        </>
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
    },

    validationSchema: Yup.object().shape({
        personName: Yup.string().required("** Name is a required field"),
        personEmail: Yup.string().required("** Email is a required field"),
        personPassword: Yup.string().required("** Password is a required field"),
        personTOS: Yup.boolean().oneOf([true], "** Must accept Terms and Conditions")
    }),

    handleSubmit(values, { setStatus }) {
        axios.post('https://reqres.in/api/users/', values)
            .then(res => {
                console.log(res)
                setStatus(res.data)
            })
            .catch(err => console.log(err.response))
    }
})(FormMaker)

export default FormikFormMaker