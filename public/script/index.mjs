import {
	getDatabase,
	ref,
	get,
	set,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

const db = getDatabase()
const rangeSlider = document.querySelector(".range-slider__range")
const appearanceFeed = document.querySelector(".range-slider__value")
// login
const eye = document.getElementById("eye")
const password = document.getElementById("password")
const form = document.querySelector(".form")
const message = document.getElementById("message")
const overlay = document.querySelector(".overlay")

// start
document.addEventListener("DOMContentLoaded", () => {
	get(ref(db, "feed")).then((snapshot) => {
		if (snapshot.exists()) {
			rangeSlider.value = snapshot.val()
			appearanceFeed.innerHTML = snapshot.val()
		}
	})
})

rangeSlider.addEventListener("input", (e) => {
	const value = e.target.value
	appearanceFeed.innerHTML = value
	set(ref(db, "feed"), value)
		.then(() => {
			console.log("success")
		})
		.catch((err) => {
			console.log(err)
		})
})

// date
const date = new Date().toLocaleDateString("id-ID")
document.getElementById("date").innerHTML = date

eye.addEventListener("click", () => {
	if (password.type === "password") {
		password.type = "text"
		eye.innerHTML = `<img src="https://i.ibb.co/Y8dRkHz/eye-open.png" alt="eye-open" border="0" class="image"/>`
	} else {
		password.type = "password"
		eye.innerHTML = `<img src="https://i.ibb.co/8BBfh2f/eye.png" alt="eye" border="0" class="image"/>`
	}
})

form.addEventListener("submit", async (e) => {
	e.preventDefault()
	await get(ref(db, "login")).then((snapshot) => {
		if (snapshot.exists()) {
			const { password: passwordDb, user: userDb } = snapshot.val()
			const { password: passwordForm, user: userForm } = e.target
			if (passwordForm.value === passwordDb && userForm.value === userDb) {
				overlay.style.display = "none"
				message.innerHTML = "login success"
			} else {
				message.innerHTML = "login failed"
			}
		}
	})
})
