<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">vite-vue-ts-admin-template</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon :data="userIcon" original />
        </span>
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          name="username"
          type="text"
          autocomplete="on"
          placeholder="username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon :data="passwordIcon" original />
        </span>
        <el-input
          :key="passwordType"
          ref="passwordRef"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="password"
          name="password"
          autocomplete="on"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :data="passwordType === 'password' ? eyeOffIcon : eyeOnIcon"
            original
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
      >
        Sign in
      </el-button>

      <div style="position: relative">
        <div class="tips">
          <span> username: admin </span>
          <span> password: any </span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { LocationQuery, useRoute, useRouter } from "vue-router";
import { UserModule } from "@/store/modules/user";
import { isValidUsername } from "@/utils/validate";
import { ElInput, ElForm } from "element-plus";
import userIcon from "@/icons/svg/user.svg";
import passwordIcon from "@/icons/svg/password.svg";
import eyeOffIcon from "@/icons/svg/eye-off.svg";
import eyeOnIcon from "@/icons/svg/eye-on.svg";

const validateUsername = (rule: any, value: string, callback: Function) => {
  if (!isValidUsername(value)) {
    callback(new Error("Please enter the correct user name"));
  } else {
    callback();
  }
};

const validatePassword = (rule: any, value: string, callback: Function) => {
  if (value.length < 6) {
    callback(new Error("The password can not be less than 6 digits"));
  } else {
    callback();
  }
};

const loginRules = {
  username: [{ validator: validateUsername, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
};

const getOtherQuery = (query: LocationQuery) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {} as LocationQuery);
};

export default defineComponent({
  name: "Login",

  setup() {
    const loginForm = reactive({
      username: "admin",
      password: "111111",
    });

    const passwordType = ref("password");
    const loading = ref(false);
    const loginFormRef = ref<typeof ElForm>();
    const usernameRef = ref<typeof ElInput>();
    const passwordRef = ref<typeof ElInput>();

    let redirect: string | undefined;
    let otherQuery: LocationQuery = {};

    const route = useRoute();
    const router = useRouter();

    watch(
      () => route.query,
      (val) => {
        if (val) {
          redirect = val.redirect as string;
          otherQuery = getOtherQuery(val);
        }
      },
      {
        deep: true,
      }
    );

    onMounted(() => {
      if (loginForm.username === "") {
        (usernameRef.value as typeof ElInput).focus();
      } else if (loginForm.password === "") {
        (passwordRef.value as typeof ElInput).focus();
      }
    });

    const showPwd = () => {
      if (passwordType.value === "password") {
        passwordType.value = "";
      } else {
        passwordType.value = "password";
      }
      nextTick(() => {
        (passwordRef.value as typeof ElInput).focus();
      });
    };

    const handleLogin = () => {
      (loginFormRef.value as typeof ElForm).validate(async (valid: boolean) => {
        if (valid) {
          try {
            loading.value = true;
            await UserModule.Login(loginForm);
            router.push({
              path: redirect || "/",
              query: otherQuery,
            });
          } finally {
            loading.value = false;
          }
        } else {
          return false;
        }
      });
    };

    return {
      loginForm,
      loginRules,
      passwordType,
      loading,

      loginFormRef,
      usernameRef,
      passwordRef,

      showPwd,
      handleLogin,

      userIcon,
      passwordIcon,
      eyeOffIcon,
      eyeOnIcon,
    };
  },
});
</script>

<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
