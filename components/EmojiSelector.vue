<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Emoji Selector</p>
    </header>
    <section class="modal-card-body">
      
      <!-- Might make this a get request to sort the data -->
        <div v-for="(item, index) in slackEmojiData" :key="index">
            {{item.name}} - {{item.code}}
        </div>

    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {},
  data() {
    return {
      platforms: [
        {
          title: "Slack",
          id: 1
        }
      ],
      selectedOption: null
    };
  },
  computed: {
    ...mapState({
      slackEmojiData: state => state.emojiData.slackEmojiData
    })
  }
};
</script>
