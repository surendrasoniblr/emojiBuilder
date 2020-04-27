<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Emoji Selector</p>
    </header>
    <section class="modal-card-body">
      <!-- Might make this a get request to sort the data -->
      <!-- {{emojiList}} -->
      <div v-for="(category, index) in emojiList" :key="index">
        <h6 class="title is-6" style="text-transform:capitalize ">{{titleFormat(index)}}</h6>

        <div class="columns emoji-category-block is-multiline">
          <div class="column is-1 emojiblock" v-for="(item, index) in category" :key="index">
            <b-button
              @click="selectedEmoji(item.code)"
              class="emoji-button"
              :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }"
            ></b-button>
          </div>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

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
  methods: {
    titleFormat(title) {
      return title.replace("-", " ");
    },
    selectedEmoji(code) {
      console.log(code);
      this.$emit('pickedEmoji', code);
    }
  },
  computed: {
    ...mapGetters({
      emojiList: "emojiData/getEmojiList"
    })
  }
};
</script>

<style lang="scss" scoped>
.emoji-category-block {
  margin-bottom: 10px;
  .emojiblock {
    display: inline-block;
    padding: 1%;
    .emoji-button {
      width: 25px;
      height: 25px;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}
</style>