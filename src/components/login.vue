<template>
  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form @submit.prevent="handleRegister">
        <h1>Create Account</h1>
        <input id="su_name" type="text" placeholder="username" v-model="registerUsername" />
        <input id="su_pass" type="password" placeholder="password" v-model="registerPassword" />
        <button class="btn-grad" type="submit">Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form @submit.prevent="handleSubmit">
        <h1>Sign In</h1>
        <input id="si_name" type="text" placeholder="username" v-model="loginUsername" />
        <input id="si_pass" type="password" placeholder="Password" v-model="loginPassword" />
        <button class="btn-grad" type="submit">Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>
            Movie coupon recommendation
          </p>
          <button class="btn-grad" @click="toggle">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Buddy!</h1>
          <p>Join Us on a new adventure</p>
          <button class="btn-grad" @click="toggle">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      registerUsername: "",
      registerPassword: "",
    };
  },
  methods: {
    toggle() {
      const container = document.getElementById("container");
      container.classList.toggle("right-panel-active");
    },
    async handleSubmit() {
      try {
        const response = await axios.post("http://127.0.0.1:3000/api/login", {
          username: this.loginUsername,
          password: this.loginPassword,
        });

        //const token = response.data.token;
        

        // 跳转到主页或其他页面
        this.$router.push("/user");
      } catch (error) {
        console.error("登录失败:", error);
        alert(`${error.response.data.message}\n 请重试`);
      }
    },
    async handleRegister() {
      try {
        const response = await axios.post("http://127.0.0.1:3000/api/register", {
          username: this.registerUsername,
          password: this.registerPassword,
        });

        if (response.status == 200) {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("注册失败:", error);
        alert(`${error.response.data.message}\n 请重试`);
      }
    },
    setTokenCookie(token) {
      const d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
      const expires = "expires=" + d.toGMTString();
      document.cookie = "token=" + token + ";" + expires;
    },
  },
};
</script>

<style scoped>
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}


h1 {
    font-weight: bold;
    margin: 0;
    margin-bottom: 1rem;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}


.btn-grad {background-image: linear-gradient(to right, #6441A5 0%, #2a0845  51%, #6441A5  100%)}
.btn-grad {
   margin: 10px;
   padding: 15px 45px;
   text-align: center;
   text-transform: uppercase;
   transition: 0.5s;
   background-size: 200% auto;
   color: white;            
   border-radius: 10px;
   display: block;
   cursor: pointer;
}

.btn-grad:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}

#signIn{
    background-image: linear-gradient(to right, #fff 0%, #f7f3f3  51%, #fff  100%);
    color: #6441A5;
}

#signUp{
    background-image: linear-gradient(to right, #fff 0%, #f7f3f3  51%, #fff  100%);
    color: #6441A5;
}

form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

/*  */
.body-container{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #4568DC;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #B06AB3, #4568DC);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #B06AB3, #4568DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.container {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

/*  */


.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}



.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    background: #6441A5;
    background: -webkit-linear-gradient(to right, #6441A5, #2a0845);
    background: linear-gradient(to right, #6441A5, #2a0845);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

</style>
