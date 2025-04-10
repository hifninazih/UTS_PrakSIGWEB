function validasiPassword() {
  var password = document.getElementById("inputPassword").value;
  if (password === "") {
    alert("Password tidak boleh kosong!");
    return;
  }

  if (password === "Selesai") {
    alert("Password benar!");
  } else {
    alert("Sign Error!");
  }
}
