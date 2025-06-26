document.addEventListener("DOMContentLoaded", function () {
  const kyfCheckbox = document.getElementById("kyf");
  const kyfFields = document.getElementById("kyfFields");
  const showPasswordCheckbox = document.getElementById("showPassword");
  const passwordInput = document.getElementById("password");
  const skillSelect = document.getElementById("farmingSkill");
  const otherSkillContainer = document.getElementById("otherSkillContainer");
  const registerForm = document.getElementById("registerForm");

  // Show/hide KYF extra fields
  kyfCheckbox.addEventListener("change", () => {
    kyfFields.classList.toggle("hidden", !kyfCheckbox.checked);
  });

  // Toggle password visibility
  showPasswordCheckbox.addEventListener("change", () => {
    passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
  });

  // Show 'other' skill input
  skillSelect.addEventListener("change", () => {
    otherSkillContainer.style.display = skillSelect.value === "other" ? "block" : "none";
  });

  // On form submit
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const userData = {
      name: document.getElementById("name").value,
      dob: document.getElementById("dob").value,
      aadhar: document.getElementById("aadhar").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      language: document.getElementById("language").value,
      skill:
        skillSelect.value === "other"
          ? document.getElementById("otherSkill").value
          : skillSelect.value,
      kyf: kyfCheckbox.checked,
      landSize: kyfCheckbox.checked ? document.getElementById("landSize").value : null,
      landUnit: kyfCheckbox.checked ? document.getElementById("landUnit").value : null,
      income: kyfCheckbox.checked ? document.getElementById("income").value : null,
      govSchemes: kyfCheckbox.checked ? document.getElementById("govSchemes").checked : false
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Registration failed.");
        return;
      }

      alert("🎉 Registration successful!");
      window.location.href = "login.html"; // redirect to login page if needed
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
