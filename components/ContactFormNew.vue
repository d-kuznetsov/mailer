<template>
  <section>
    <form
      :class="{ 'form-error': submitStatus === 'INPUT_ERROR' }"
      name="contact"
      data-netlify="true"
      @submit.prevent="submit"
    >
      <div class="mb-4">
        <input
          v-model="name"
          :class="{
            'input-error': $v.name.$invalid,
            'input-succes': submitStatus == 'SUCCES',
          }"
          class="form-input focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          placeholder="Name:"
        />
      </div>
      <div class="mb-4">
        <input
          v-model="email"
          :class="{
            'input-error': $v.email.$invalid,
            'input-succes': submitStatus == 'SUCCES',
          }"
          class="form-input focus:outline-none focus:shadow-outline"
          type="text"
          name="email"
          placeholder="Email:"
        />
      </div>
      <div class="mb-4">
        <input
          v-model="subject"
          :class="{
            'input-error': $v.subject.$invalid,
            'input-succes': submitStatus == 'SUCCES',
          }"
          class="form-input focus:outline-none focus:shadow-outline"
          type="text"
          name="subject"
          placeholder="Subject:"
        />
      </div>
      <div class="mb-4">
        <textarea
          v-model="message"
          :class="{
            'input-error': $v.message.$invalid,
            'input-succes': submitStatus == 'SUCCES',
          }"
          class="form-input focus:outline-none focus:shadow-outline"
          name="message"
          rows="7"
          placeholder="Message (from 10 characters):"
        ></textarea>
      </div>
      <input name="bot-field" class="hidden" />
      <div>
        <button
          class="hover:bg-blue-700 focus:outline-none focus:shadow-outline px-4 py-2 font-bold text-white bg-blue-500 rounded"
          type="submit"
          :disabled="submitStatus == 'PENDING'"
        >
          Submit
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data() {
    return {
      name: '',
      email: '',
      message: '',
      subject: '',
      submitStatus: null,
    }
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    submit(e) {
      e.preventDefault()
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'INPUT_ERROR'
      } else {
        const { name, email, subject, message } = this

        this.submitStatus = 'PENDING'
        this.$axios
          .post(
            /* process.env.MAIL_API_URL */ '/',
            this.encode({
              'form-name': 'contact',
              name,
              email,
              subject,
              message,
            }),
            {
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
          )
          .then(() => {
            this.submitStatus = 'SUCCES'
            setTimeout(() => {
              this.submitStatus = null
              this.clean()
            }, 5000)
            alert('SUCCES')
          })
          .catch(() => {
            this.submitStatus = 'SERVER_ERROR'
          })
      }
    },
    clean() {
      this.name = ''
      this.email = ''
      this.subject = ''
      this.message = ''
    },
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    subject: {
      required,
    },
    message: {
      required,
      minLength: minLength(10),
    },
  },
}
</script>

<style>
.form-input {
  @apply shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight appearance-none;
}

.form-error .input-error {
  @apply border-red-700;
}
.input-succes {
  @apply border-green-700;
}
</style>
