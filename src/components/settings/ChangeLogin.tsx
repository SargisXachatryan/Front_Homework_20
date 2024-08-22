import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleLogout, updateLogin } from '../../helpers/api';
import { MDBInput, MDBTypography } from 'mdb-react-ui-kit';

interface IForm {
    password: string
    login: string
}
export const ChangeLogin = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IForm>()
    const [loginError, setLoginError] = useState<string>('')
    const navigate = useNavigate()

    const loginChange: SubmitHandler<IForm> = async (data) => {
        if (data.login && data.password) {
            const response = await updateLogin(data.password, data.login)
            if (response.status === 'ok') {
                reset()
                handleLogout()
                navigate('/login')
            } else {
                setLoginError(response.message || 'Failed to update login.')
            }
        }
    }

    return <>
        <form onSubmit={handleSubmit(loginChange)}>
            <MDBTypography tag='h5' className='text-primary mb-3' style={{ fontWeight: 'bold' }}>
                Change Login
            </MDBTypography>
            {loginError && <p className='text-danger'>{loginError}</p>}

            <MDBInput
                wrapperClass='mb-4'
                label='Password'
                type='password'
                {...register('password', { required: 'The password is required' })}
            />
            {errors.password && <p className='text-danger'>{errors.password.message}</p>}

            <MDBInput
                wrapperClass='mb-4'
                label='New Login'
                type='text'
                {...register('login', { required: 'New Login is required' })}
            />
            {errors.login && <p className='text-danger'>{errors.login.message}</p>}

            <button type='submit' className='btn btn-outline-info mb-3 w-100'>Submit</button>
        </form>
    </>
}
