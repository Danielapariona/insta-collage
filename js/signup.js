$('document').ready(function() {
  // Se crea variables para cada div y se filtrará por find ya que en clase explicaron que de esta forma evitaremos cargar de muchas cosas la página y se hace ligera
  // Ecxcepto los que tendrán eventos
  var $signupGoogle = $('#signup-google');
  var $photoChrome = $('#photo-chrome');
  var $password = $('#password');
  var $passwordInput = $('#password input');
  var $signupBox = $('#signup-box');
  var $signupBoxSend = $('#signup-box button'); // botón de enviar
  var $userGooglePic; 
  var $profilePhoto = $('.img-profile img');
  var $profileName = $('.img-profile + p');

  // Ocultando input de password y la etiuqeta p de bienvenida
  $password.hide();
  $signupBox.find('p').hide();

  // desactivando boton de registro
  $signupBoxSend.prop('disabled', true);

  // FIREBASE
  var config = {
    apiKey: "AIzaSyBcaTmRiRyYY4edh1o1nAG82Isb_P-uY0I",
    authDomain: "insta-college.firebaseapp.com",
    databaseURL: "https://insta-college.firebaseio.com",
    projectId: "insta-college",
    storageBucket: "",
    messagingSenderId: "966367065250"
  };
  firebase.initializeApp(config);
  // LOGIN
  var provider = new firebase.auth.GoogleAuthProvider();

  // Al dar click en registrate con google se lanza el modal
  $signupGoogle.on('click', gmailInfo);

  // Función del modal de google
  function gmailInfo() {
    // Pegando la primera línea del punto 5    
    firebase.auth().signInWithPopup(provider).then(function(result) {
      $userGooglePic = result.user;
      localStorage.UID = $userGooglePic.uid;
      console.log(localStorage.UID);
      saveAccount(result.user);
      $signupGoogle.hide();
      // añadiendo mi imagen de google
      $photoChrome.append(`<div class="img-profile col"><img src=" ${result.user.photoURL} " /><p class="col-12"> ${result.user.displayName} <p/></div>`);
      $password.show();
      // añadiendo a localstorage
      // Guardo foto y nombre  en localStorage
      var routeActualPhoto = $profilePhoto.prop('src');
      var actualName = $profileName.text();
      localStorage.currentPhoto = routeActualPhoto;
      localStorage.currentName = actualName;
    });   
  }

  var referencia = firebase.database().ref('newDB/' + localStorage.UID).child('name');
  console.log(referencia);

  // objeto de la base de datos
  var userInfo = {};
  // Guardando datos 
  function saveAccount(user) {
    userInfo.uid = user.uid;
    userInfo.name = user.displayName;
    userInfo.mail = user.email;
    userInfo.photo = user.photoURL;
    console.log(localStorage.password);
    // userInfo.nombrecito = getPassword;
    // guardando en firebase, recuerda que set grabaría en toda la rama, osea se sustituiria. Se concatena para que se almacene en la misma user id
    firebase.database().ref('newDB/' + user.uid).set(userInfo); 
    
  }
  
  // Evento que limita la contraseña entre 4 y 10 dígitos
  $passwordInput.on('input', passwordLength);

  // función que limita la contraseña entre 4 y 10 dígitos
  function passwordLength() {
    // console.log($(this).val().length);
    if ($(this).val().length >= 6 && $(this).val().length <= 10 && $(this).val() !== '123456') {
      $signupBoxSend.prop('disabled', false).addClass('register-botton-active');
      localStorage.password = $(this).val();
      userInfo.pass = localStorage.password;
    } else {
      $signupBoxSend.prop('disabled', true).removeClass('register-botton-active');
    };
  }

  // Evento para cambiar al perfil
  $signupBoxSend.on('click', function() {
    window.location.href = 'insta-collage/views/collage.html';
  });
  console.log(userInfo); // Objeto con el correo, foto, nombre 

});