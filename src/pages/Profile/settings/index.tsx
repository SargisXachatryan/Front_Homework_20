import { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCol, MDBRow, MDBTypography, MDBContainer } from 'mdb-react-ui-kit';
import { Privacy } from '../../../components/settings/Privacy';
import { ChangePassword } from '../../../components/settings/ChangePassword';
import { ChangeLogin } from '../../../components/settings/ChangeLogin';

export const Settings = () => {
    const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);
    const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

    return (
        <MDBContainer className='py-5'>
            <MDBTypography tag='h2' className='text-center mb-4'>Settings</MDBTypography>

            <MDBRow className='justify-content-center'>
                <MDBCol md='8' lg='6'>
                    <MDBCard className='shadow-2-strong mb-4'>
                        <MDBCardBody className='p-4'>
                            <Privacy />
                            <button
                                type='button'
                                className='btn btn-outline-info mb-3 w-100'
                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                            >
                                {showPasswordForm ? 'Hide Password Form' : 'Change Password'}
                            </button>
                            {showPasswordForm && <ChangePassword />}
                            <button
                                type='button'
                                className='btn btn-outline-info mb-3 w-100'
                                onClick={() => setShowLoginForm(!showLoginForm)}
                            >
                                {showLoginForm ? 'Hide Login Form' : 'Change Login'}
                            </button>
                            {showLoginForm && <ChangeLogin />}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};
