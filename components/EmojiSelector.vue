<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Emoji Selector - Slack</p>
    </header>
    <section class="modal-card-body">
      <!-- <b-field label="Search" label-position="on-border">
        <b-input v-model="searchValue"></b-input>
      </b-field> -->

      <template>
        <div v-for="(category, index) in filteredList" :key="index">
          <h6 class="title is-6" style="text-transform:capitalize ">{{titleFormat(index)}}</h6>
          <div class="columns emoji-category-block is-multiline">
            <div class="column is-1 emojiblock" v-for="(item, index) in category" :key="index">
              <b-button
                @click="selectedEmoji(item)"
                class="emoji-button"
                :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }"
              ></b-button>
            </div>
          </div>
        </div>
      </template>
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
      searchValue: ""
    };
  },
  methods: {
    titleFormat(title) {
      return title.replace("-", " ");
    },
    selectedEmoji(code) {
      console.log(code);
      this.$emit("pickedEmoji", code);
    }
  },
  computed: {
    filteredList() {
      if (this.searchValue.length === 0) {
        return this.emojiList;
      }

      let search = { search: [] };

      Object.entries(this.emojiList).forEach(([key, value]) => {
        value.forEach(element => {
          console.log(this.searchValue);
          if (element.searchKeys.includes(this.searchValue)) {
            search.search.push(element);
          }
        });
      });

      return search;
    },
    ...mapGetters({
      emojiList: "emojiData/getEmojiList"
    })
  }
};
</script>

<style lang="scss" scoped>
.modal-card-body {
  height: 500px;
  max-height: 500px;
}
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