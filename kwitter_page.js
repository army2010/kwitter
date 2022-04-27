var firebaseConfig = {
      apiKey: "AIzaSyCMVttdS9n-pyyMkyXVVw2KmzN74NBJ2_g",
      authDomain: "chatapp-d341b.firebaseapp.com",
      databaseURL: "https://chatapp-d341b-default-rtdb.firebaseio.com",
      projectId: "chatapp-d341b",
      storageBucket: "chatapp-d341b.appspot.com",
      messagingSenderId: "551298880544",
      appId: "1:551298880544:web:635ec0e15bb8170ed01845"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(message_data);
                        console.log(firebase_message_id);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        nametag = "<h4>" + name + "</h4>";
                        messagetag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'> like:" + like + "</button>";
                        row = nametag + messagetag + like_button;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}