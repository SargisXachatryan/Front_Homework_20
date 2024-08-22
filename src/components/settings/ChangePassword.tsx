import { SubmitHandler, useForm } from "react-hook-form";
import { handleLogout, updatePassword } from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MDBInput, MDBTypography } from "mdb-react-ui-kit";

interface IForm {
    old: string
    newpwd: string
}
export const ChangePassword = () => {
    const [passwordError, setPasswordError] = useState<string>('')
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<IForm>()
    const navigate = useNavigate();


    const passwordChange: SubmitHandler<IForm> = async (data) => {
        const response = await updatePassword(data.old, data.newpwd);
        if (response.status === 'ok') {
            reset();
            handleLogout()
            .then(()=>{
                navigate('/login')
            })
        } else {
            setPasswordError(response.message || 'Failed to update password.')
        }
    }
    
    return <>
        <form onSubmit={handleSubmit(passwordChange)}>
            <MDBTypography tag='h5' className='text-primary mb-3' style={{ fontWeight: 'bold' }}>
                Change Password
            </MDBTypography>
            {passwordError && <p className='text-danger'>{passwordError}</p>}

            <MDBInput
                wrapperClass='mb-4'
                label='Old Password'
                type='password'
                {...register('old', { required: 'Old password is required' })}
            />
            {errors.old && <p className='text-danger'>{errors.old.message}</p>}

            <MDBInput
                wrapperClass='mb-4'
                label='New Password'
                type='password'
                {...register('newpwd', {
                    required: 'New password is required',
                    validate: value => value !== getValues('old') || 'New password cannot be the same as the old password.'
                })}
            />
            {errors.newpwd && <p className='text-danger'>{errors.newpwd.message}</p>}

            <button type='submit' className='btn btn-outline-info mb-3 w-100'>Submit</button>
        </form>
    </>
}
