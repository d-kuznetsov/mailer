<template>
  <section>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <input
          v-model="name"
          class="form-input focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          placeholder="Name:"
        />
      </div>
      <div class="mb-4">
        <input
          v-model="email"
          class="form-input focus:outline-none focus:shadow-outline"
          type="text"
          name="email"
          placeholder="Email:"
        />
      </div>
      <div class="mb-4">
        <textarea
          v-model="message"
          class="form-input focus:outline-none focus:shadow-outline"
          name="message"
          rows="7"
          placeholder="Message:"
        ></textarea>
      </div>
      <div>
        <button
          class="hover:bg-blue-700 focus:outline-none focus:shadow-outline px-4 py-2 font-bold text-white bg-blue-500 rounded"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
    }
  },
  methods: {
    submit() {
      const { name, email, message } = this
      this.$axios
        .post(process.env.MAIL_API_URL, {
          name,
          email,
          message,
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style>
.form-input {
  @apply shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight appearance-none;
}
</style>
