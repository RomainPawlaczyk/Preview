//handle language display for login screen
export function getLoginText(position, language) {
  let ret = '';
  switch (position) {
    case 1:
      language === 'english' ?
      ret = 'If your email is in our database, a password recovery link has been sent to it' :
      ret = "Si votre email est dans notre base de donnée, un lien de recupération de mot de passe lui a été envoyé";
      break;
    case 2:
      language === 'english' ? ret = 'A confirmation email has been sent' : ret = "Un email de confirmation vous a été envoyé";
      break;
    case 3:
      language === 'english' ? ret = 'Login failed, check your credentials' : ret = 'Echec de la connexion, vérifiez vos identifiants';
      break;
    case 4:
      language === 'english' ? ret = 'All fields must be filled' : ret = 'Merci de remplir tout les champs';
      break;
    case 5:
      language === 'english' ? ret = 'Email format is not valid' : ret = "Le format de l'adresse email n'est pas valide";
      break;
    case 6:
      language === 'english' ?
      ret = 'Unexpected error whith password recovery functionnality' :
      ret = "Erreur inattendue avec la fonctionnalité de récupération de mot de passe";
      break;
    case 7:
      language === 'english' ?
      ret = 'Unexpected error with the confirm email functionnality. Please try later' :
      ret = "Une erreur est survenue lors de l'envoi de l'email de confirmation. Merci de réésayer plus tard";
      break;
    case 8:
      language === 'english' ?
      ret = 'Unexpected error occured. Please try later or contact adimistrator' :
      ret = "Une erreur est survenue. Merci de réésayer plus tard ou contactez l'administrateur du service";
      break;
    case 9:
      language === 'english' ? ret = 'Password' : ret = 'Mot de passe';
      break;
    case 10:
      language === 'english' ? ret = 'Login' : ret = 'Connexion';
      break;
    case 11:
      language === 'english' ? ret = 'Forgot your password ?' : ret = 'Mot de passe oublié ?';
      break;
    case 12:
      language === 'english' ? ret = 'Register' : ret = 'Inscription';
      break;
    case 13:
      language === 'english' ? ret = 'Forgot password' : ret = 'Mot de passe oublié';
      break;
    case 14:
      language === 'english' ? ret = 'Enter your email to receive a password recovery link' : ret = 'Entrez votre email pour recevoir un lien de recupération de mot de passe';
      break;
    case 15:
      language === 'english' ? ret = 'Email' : ret = 'Email';
      break;
    case 16:
      language === 'english' ? ret = 'Quit' : ret = 'Quitter';
      break;
    case 17:
      language === 'english' ? ret = 'Validate' : ret = 'Valider';
      break;
    case 18:
      language === 'english' ? ret = 'Email not validated' : ret = 'Adresse email non validée';
      break;
    case 19:
      language === 'english' ? ret = 'Your email is not validated yet' : ret = "Votre adresse email n'a pas encore été validée";
      break;
    case 20:
      language === 'english' ?
      ret = 'Click on the link sent by email to validate your email address' :
      ret = "Cliquez sur le lien qui vous a été envoyé par email pour valider votre adresse";
      break;
    case 21:
      language === 'english' ?
      ret = 'You can generate a new validation link with the button `New link`' :
      ret = 'Vous pouvez générer un nouveau lien de validation avec le bouton `Nouveau lien`';
      break;
    case 22:
      language === 'english' ? ret = 'Quit' : ret = 'Quitter';
      break;
    case 23:
      language === 'english' ? ret = 'New link' : ret = 'Nouveau lien';
      break;
    default:
      ret = '';
      break;
  }
  return ret;
}

//handle language display for the register screen
export function getRegisterText(position, language) {
  let ret = '';
  switch (position) {
    case 1:
      language === 'english' ?
      ret = 'Account created with success ! An email has been sent to confirm your email address' :
      ret = 'Votre compte a bien été créé ! Un email a été envoyé pour confirmer votre adresse email';
      break;
    case 2:
      language === 'english' ? ret = 'All fields must be filled' : ret = 'Merci de remplir tout les champs';
      break;
    case 3:
      language === 'english' ? ret = 'Email format is not valid' : ret = "Le format de l'adresse email n'est pas valide";
      break;
    case 4:
      language === 'english' ? ret = 'Password and password confirmation are not the same' : ret = 'Mot de passe et confirmation ne sont pas identiques';
      break;
    case 5:
      language === 'english' ? ret = 'Terms and conditions are not validated' : ret = "Merci de valider les conditions générales d'utilisation";
      break;
    case 6:
      language === 'english' ? ret = 'Email already used' : ret = 'Adresse email déjà utilisée';
      break;
    case 7:
      language === 'english' ?
      ret = 'Server error while trying to send confirmation email. Please try later' :
      ret = "Une erreur est survenue avec le mail de confirmation d'addresse email. Merci de réésayer plus tard";
      break;
    case 8:
      language === 'english' ?
      ret = 'Your password is not strong enough. It must be at least 8 characters long, contain at least one number and one special character' :
      ret = "Votre mot de passe n'est pas assez sécurisé. Il doit faire au moins 8 caractères de long, contenir au moins un chiffre et un caractère spécial";
      break;
    case 9:
      language === 'english' ? ret = 'Back' : ret = 'Retour';
      break;
    case 10:
      language === 'english' ? ret = 'to Login' : ret = 'Connexion';
      break;
    case 11:
      language === 'english' ? ret = 'SignUp' : ret = 'Inscription';
      break;
    case 12:
      language === 'english' ? ret = 'Username' : ret = "Nom d'utilisateur";
      break;
    case 13:
      language === 'english' ? ret = 'Password' : ret = 'Mot de passe';
      break;
    case 14:
      language === 'english' ? ret = 'Password confirmation' : ret = 'Confirmation du mot de passe';
      break;
    case 15:
      language === 'english' ?
      ret = 'By checking this box, you accept and acknowledge the Terms and Conditions of the current service' :
      ret = "En cochant cette case, j'accepte et je reconnais avoir pris connaissance des conditions d'utilisation du service";
      break;
    case 16:
      language === 'english' ? ret = 'Validate' : ret = 'Valider';
      break;
    case 17:
      language === 'english' ? ret = 'Terms And Conditions' : ret = "Conditions générales d'utilisation";
      break;
    case 18:
      language === 'english' ? ret = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat varius quam eu dictum.' : ret = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat varius quam eu dictum.";
      break;
    case 19:
      language === 'english' ? ret = 'Quit' : ret = 'Quitter';
      break;
    case 20:
      language === 'english' ? ret = 'Accept' : ret = 'Accepter';
      break;
    default:
      ret = '';
      break;
  }
  return ret;
}

//handle language display for the home screen
export function getHomeText(position, language) {
  let ret = '';
  switch (position) {
    case 1:
      language === 'english' ? ret = 'Placeholder' : ret = "Placeholder";
      break;
    case 2:
      language === 'english' ? ret = 'Placeholder' : ret = "Placeholder";
      break;
    case 3:
      language === 'english' ? ret = 'Placeholder' : ret = 'Placeholder';
      break;
    case 4:
      language === 'english' ? ret = 'Placeholder' : ret = 'Placeholder';
      break;
    case 5:
      language === 'english' ? ret = 'Placeholder' : ret = 'Placeholder';
      break;
    case 6:
      language === 'english' ? ret = 'Settings' : ret = 'Réglages';
      break;
    default:
      ret = '';
      break;
  }
  return ret;
}

//handle language display for the preferences screen
export function getSettingsText(position, language) {
  let ret = '';
  switch (position) {
    case 1:
      language === 'english' ? ret = 'Back' : ret = "Retour";
      break;
    case 2:
      language === 'english' ? ret = 'to Home' : ret = "Accueil";
      break;
    case 3:
      language === 'english' ? ret = 'Settings' : ret = 'Réglages';
      break;
    case 4:
      language === 'english' ? ret = 'Application language' : ret = "Langue de l'application";
      break;
    case 5:
      language === 'english' ? ret = 'English' : ret = 'Anglais';
      break;
    case 6:
      language === 'english' ? ret = 'French' : ret = 'Français';
      break;
    case 7:
      language === 'english' ? ret = 'Disconnect' : ret = 'Déconnexion';
      break;
    default: ;
      ret = '';
      break;
  }
  return ret;
}
