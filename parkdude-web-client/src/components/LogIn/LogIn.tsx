import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  }

// dokumentaaation mukaan onSuccess ja onFailure pakollisia kenttiä, vaikka emme niitä tarvitse kun uudelleen ohjaamme 
// kirjautumisen back endiin
const LogIn: React.FC = () => {
    return (
        <div >
        <p>Kirjaudu siään käyttäen Google tiliäsi</p>
        
        <GoogleLogin
            clientId = "658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText = "Kirjaudu sisään"
            onSuccess = {responseGoogle}
            onFailure = {responseGoogle}
            cookiePolicy = {'single_host_origin'}
            responseType = "code"
            uxMode = "redirect"
            redirectUri = "meidän bank end AWS URL"
        />
        </div>
    );
}

export default LogIn;