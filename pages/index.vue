<template>
  <section class="section container">
    <!-- <h2 class="title is-3 has-text-grey">
      Emoji Builder
      <b-icon icon="rocket" size="is-large" />
    </h2>-->
    <div class="columns is-centered">
      <div class="column is-4">
        <div style="margin-top:auto; width: 100%">
          <b-field label="Text" label-position="on-border">
            <b-input v-on:change="backgroundImageChange" v-model="emojiText"></b-input>
            <p class="control">
              <b-button @click="isTextModal = true" class="button is-primary">
                <i class="material-icons">mood</i>
              </b-button>

              <b-modal
                :active.sync="isTextModal"
                has-modal-card
                trap-focus
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-modal
              >
                <emoji-selector @pickedEmoji="emojiSelected($event, 'text')"></emoji-selector>
              </b-modal>
            </p>
          </b-field>
        </div>
      </div>
      <div class="column is-4">
        <div style="margin-top:auto; width: 100%">
          <b-field label="Background" label-position="on-border">
            <b-input v-model="emojiBackground"></b-input>
            <p class="control">
              <b-button @click="isBackgroundModal = true" class="button is-primary">
                <i class="material-icons">mood</i>
              </b-button>

              <b-modal
                :active.sync="isBackgroundModal"
                has-modal-card
                trap-focus
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-modal
              >
                <emoji-selector @pickedEmoji="emojiSelected($event, 'background')"></emoji-selector>
              </b-modal>
            </p>
          </b-field>
        </div>
      </div>
      <div class="column is-4">
        <b-button style="margin-top:auto" @click="addLine">Add Line</b-button>
      </div>
    </div>
    <div class="columns is-centered" v-for="(data,i) in lineData.slice().reverse()" :key="i">
      <div class="column is-11">
        <b-field label-position="on-border" label="Line">
          <b-input v-model="data.value"></b-input>
        </b-field>
      </div>
      <div style="margin-top:auto" class="column is-1">
        <b-button @click="deleteColumn(data.id)" type="is-danger" icon-right="delete" />
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-12">
        <table style="margin-bottom:15px">
          <tr v-for="row in generateMatrix" :key="row.id">
            <td
              :style="{ backgroundImage: 'url(' + (value ? textEmojifn : backgroundEmojifn) +')' }"
              :class="[value ? 'on' : '', (textEmojifn && backgroundEmojifn ? 'bothEmojisSelected' : '')]"
              v-for="(value, i) in row.value"
              :key="i"
            ></td>
          </tr>
        </table>
        <div class="buttons">
          <b-button @click="copiedItem()" v-clipboard:copy="copyMatrix">Copy Emoji Text</b-button>
        </div>
        <!-- <b-field label="Output" label-position="on-border">
          <b-input :value="copyMatrix" type="textarea"></b-input>
        </b-field>-->
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import EmojiSelector from "@/components/EmojiSelector";

export default {
  name: "HomePage",
  components: {
    EmojiSelector
  },
  data() {
    return {
      lineData: [],
      emojiText: "",
      emojiBackground: "",
      matrix: [],
      isBackgroundModal: false,
      isTextModal: false
    };
  },
  computed: {
    textEmojifn() {
      const valueToCheck = this.emojiText;

      const returnUrl = _.find(this.emojiData, function(emoji) {
        if (emoji.code === valueToCheck) {
          const val = emoji.imgUrl;
          return val;
        }
      });
      if (returnUrl) {
        return returnUrl.imgUrl;
      }
      return "";
    },
    backgroundEmojifn() {
      const valueToCheck = this.emojiBackground;

      const returnUrl = _.find(this.emojiData, function(emoji) {
        if (emoji.code === valueToCheck) {
          const val = emoji.imgUrl;
          return val;
        }
      });
      if (returnUrl) {
        return returnUrl.imgUrl;
      }
      return "";
    },
    copyMatrix() {
      let outputString = "";
      this.matrix.forEach(element => {
        let toBeAdded = element.value
          .join("")
          .replace(/0/g, element.emojiBackground)
          .replace(/1/g, element.emojiText);

        outputString += toBeAdded + "\r\n";
      });

      return outputString;
    },
    generateMatrix() {
      let array = [];

      if (!this.lineData.length) {
        return "";
      }

      this.lineData.forEach((line, lineNumber) => {
        array = _.concat(this.createArrayFiller(lineNumber), array);

        array.forEach(element => {
          element.emojiText = this.emojiText
            ? this.emojiText.trim()
            : ":smile:";
          element.emojiBackground = this.emojiBackground
            ? this.emojiBackground.trim()
            : ":fire:";
        });

        // for (let index = lineNumber * 7; index < lineNumber * 7 + 7; index++) {
        //   array[index].emojiText = line.emojiText ? line.emojiText : ":smile:";
        //   array[index].emojiBackground = line.emojiBackground ? line.emojiBackground : ":fire:";
        // }

        let lineArray = _.split(line.value, "");

        lineArray.forEach(letter => {
          letter = letter.toLowerCase();
          const foundLetter = _.find(this.letterData, letter);

          if (foundLetter) {
            foundLetter[letter].forEach((element, i) => {
              array[i + 1].value = _.concat(array[i + 1].value, element);
            });

            const lengthOfLetter = foundLetter[letter][0].length;
            const fillerArray = Array(lengthOfLetter).fill(0);

            array[0].value = _.concat(array[0].value, fillerArray);
            array[6].value = _.concat(array[6].value, fillerArray);

            // adds space
            array.reverse();
            for (
              let index = lineNumber * 7;
              index < lineNumber * 7 + 7;
              index++
            ) {
              array[index].value = _.concat(array[index].value, 0);
            }
            array.reverse();
          }
        });
      });

      // Add top and bottom boarder
      const lengthOfSentence = array[0].length;
      const fillerArray = Array(lengthOfSentence).fill(0);
      this.matrix = array;
      return array;
    },
    ...mapState({
      letterData: state => state.emojiData.letterData,
      emojiData: state => state.emojiData.slackEmojiData
    }),
    ...mapGetters({
      getEmojiUrl: "emojiData/getEmojiUrl"
    })
  },
  methods: {
    backgroundImageChange() {
      console.log("ffff");
      // const valueToCheck = value ? this.emojiText : this.emojiBackground;

      // this.emojiData.forEach(emoji => {
      //   if (emoji.code === valueToCheck) {
      //     console.log(emoji.imgUrl);
      //     return emoji.imgUrl;
      //   }
      // });
    },
    copiedItem() {
      this.$buefy.toast.open("Copied to Clipboard!");
    },
    emojiSelected(selected, sectionPicked) {
      if (sectionPicked === "background") {
        this.emojiBackground = selected.code;
        this.isBackgroundModal = false;
      } else {
        this.emojiText = selected.code;
        this.isTextModal = false;
      }
    },
    emojiSelectorComponent() {},
    createArrayFiller(lineNumber) {
      lineNumber = lineNumber * 7;
      return [
        { value: [0], id: 0 + lineNumber },
        { value: [0], id: 1 + lineNumber },
        { value: [0], id: 2 + lineNumber },
        { value: [0], id: 3 + lineNumber },
        { value: [0], id: 4 + lineNumber },
        { value: [0], id: 5 + lineNumber },
        { value: [0], id: 6 + lineNumber }
      ];
    },
    addLine() {
      var d = new Date();
      var n = d.getTime();
      this.lineData.push({ value: "", id: n });
    },
    deleteColumn(colId) {
      this.lineData = _.remove(this.lineData, function(currentObject) {
        return currentObject.id !== colId;
      });
    }
  },
  created: function() {
    this.addLine();
  }
};
</script>
<style lang="scss" scoped>
td {
  background: red;
  width: 25px;
  height: 25px;
  background-repeat: no-repeat;
  background-size: cover;
  &.bothEmojisSelected,
  &.bothEmojisSelected.on {
    background-color: transparent;
  }
  &.on {
    background: black;
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.material-icons {
  display: flex;
}
.control.is-clearfix {
  width: 100%;
}
</style>
