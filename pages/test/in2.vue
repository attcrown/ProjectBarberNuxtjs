<template>
  <div>
    <h1>Chat App</h1>
    <div v-for="message in messages" :key="message.id">
      {{ message.user }}: {{ message.text }}
    </div>
    <form @submit.prevent="sendMessage">
      <input type="text" v-model="text" placeholder="Type a message...">
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      messages: [
        { id: 1, user: 'John', text: 'Hello' },
        { id: 2, user: 'Jane', text: 'Hi' },
      ],
    };
  },
  methods: {
    sendMessage() {
      const message = { user: 'You', text: this.text };
      this.messages.push(message);
      this.text = '';
      // เรียกฟังก์ชันส่งข้อความผ่าน API
    },
  },
};
</script>
