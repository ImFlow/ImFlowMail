<template>
  <div class="flex flex-col mx-auto my-4 w-5/6 md:w-2/3">
    <div class="px-5 py-5 w-full bg-white shadow-xl">
      <h4 class="text-2xl mt-4 mb-7">Send us a message</h4>
      <div v-show="isSubmitted" class="py-6 px-6">
        Your message has been send. We will contact you soon.
      </div>
      <form v-show="!isSubmitted" @submit.prevent="validate">
        <div class="relative mb-4">
          <label for="name" class="text-sm leading-7 text-gray-600"
            >Name:</label
          >
          <input
            v-model="name"
            type="text"
            id="name"
            name="name"
            class="
              w-full
              px-3
              py-1
              text-base
              leading-8
              text-gray-700
              transition-colors
              duration-200
              ease-in-out
              bg-white
              border border-gray-300
              rounded
              outline-none
              focus:border-indigo-500
              focus:ring-2 focus:ring-indigo-200
            "
          />
        </div>
        <div class="relative mb-4">
          <label for="email" class="text-sm leading-7 text-gray-600"
            >E-Mail:</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            class="
              w-full
              px-3
              py-1
              text-base
              leading-8
              text-gray-700
              transition-colors
              duration-200
              ease-in-out
              bg-white
              border border-gray-300
              rounded
              outline-none
              focus:border-indigo-500
              focus:ring-2 focus:ring-indigo-200
            "
          />
        </div>
        <div class="relative mb-4">
          <label for="message" class="text-sm leading-7 text-gray-600"
            >Message:</label
          >
          <textarea
            v-model="msg"
            id="message"
            name="message"
            class="
              w-full
              h-32
              px-3
              py-1
              text-base
              leading-6
              text-gray-700
              transition-colors
              duration-200
              ease-in-out
              bg-white
              border border-gray-300
              rounded
              outline-none
              resize-none
              focus:border-indigo-500
              focus:ring-2 focus:ring-indigo-200
            "
          ></textarea>
        </div>
        <div class="relative mb-4">
          <p v-show="privacyError" class="text-sm text-britta-pink">
            You need to accept out privacy policy.
          </p>
          <label for="datenschutz">
            <input
              type="checkbox"
              id="Datenschutz"
              name="datenschutz"
              v-model="privacy"
            />
            <span class="text-xs text-gray-500">
             I accept the
              <router-link to="/datenschutz"
                >privacy policy</router-link
              >.
            </span>
          </label>
        </div>
        <button
          class="
            px-6
            py-2
            text-lg text-blue
            border-0
            rounded
            bg-gray-200
            focus:outline-none
            hover:bg-boxgreen
          "
          @click="validate()"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script >
import axios from "axios";
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const msg = ref("");
    const submitting = ref(false);
    const isSubmitted = ref(false);
    const error = ref(false);
    const privacy = ref(false);
    const privacyError = ref(false);

    const validate = () => {
      if (privacy.value) {
        submitForm();
      } else {
        privacyError.value = true;
        console.log(`Privacy: ${privacy.value}`);
      }
    };

    const submitForm = async () => {
      submitting.value = true;
      //this.$ga.event('submit', 'form', this.$i18n.locale)
      error.value = false;
      try {
        await axios.post("http://localhost:3001", {
          name: name.value,
          email: email.value,
          msg: msg.value,
          apiKey: "HJ6kk2rZ2fYmvw9wju",
          subject: "Talk to me!",
        });
        submitting.value = false;
        isSubmitted.value = true;
        await new Promise((resolve) => setTimeout(resolve, 2500));
      } catch (e) {
        submitting.value = false;
        error.value = true;
        console.error(e);
      }
    };
    return {
      name,
      email,
      msg,
      submitting,
      isSubmitted,
      error,
      privacy,
      privacyError,
      validate,
      submitForm,
    };
  },
};
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>

</style>
