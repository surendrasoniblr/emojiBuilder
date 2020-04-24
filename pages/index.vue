<template>
  <section class="section container">
    <h2 class="title is-3 has-text-grey">
      Emoji Builder
      <b-icon icon="rocket" size="is-large" />
    </h2>

    <!-- <div class="columns">
      <div class="column is-8">{{lineData}}</div>
    </div> -->

    <div class="columns">
      <div class="column is-2">
        <div style="margin-top:auto">
          <b-field label="Text">
            <b-input v-model="emojiText"></b-input>
          </b-field>
        </div>
      </div>
      <div class="column is-2">
        <div style="margin-top:auto">
          <b-field label="Background">
            <b-input v-model="emojiBackground"></b-input>
          </b-field>
        </div>
      </div>
      <div class="column is-2">
        <b-button style="margin-top:auto" @click="addLine">Add Line</b-button>
      </div>
    </div>
    <div class="columns" v-for="(data,i) in lineData.slice().reverse()" :key="i">
      <div class="column is-7">
        <b-field label="Line">
          <b-input v-model="data.value"></b-input>
        </b-field>
      </div>
      <div style="margin-top:auto" class="column is-1">
        <b-button @click="deleteColumn(data.id)" type="is-danger" icon-right="delete" />
      </div>
      <!-- <div style="margin-top:auto" class="column is-2">
        <b-field label="Text">
          <b-input v-model="data.emojiText"></b-input>
        </b-field>
      </div>
      <div style="margin-top:auto" class="column is-2">
        <b-field label="Background">
          <b-input v-model="data.emojiBackground"></b-input>
        </b-field>
      </div>-->
    </div>
    <div class="columns">
      <div class="column is-8">
        <table>
          <tr v-for="row in generateMatrix" :key="row.id">
            <td :class="value ? 'on' : ''" v-for="(value, i) in row.value" :key="i"></td>
          </tr>
        </table>
        <b-field label="Output">
          <b-input :value="copyMatrix" type="textarea"></b-input>
        </b-field>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePage",
  components: {},
  data() {
    return {
      lineData: [],
      emojiText: "",
      emojiBackground: "",
      matrix: [],
      letterData: [
        {
          'a': [
            [1, 1, 1, 1],
            [1, 0, 0, 1],
            [1, 1, 1, 1],
            [1, 0, 0, 1],
            [1, 0, 0, 1]
          ],
          'b': [
            [1, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 1, 1, 0]
          ],
          'c': [
            [0, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 1, 1, 1]
          ],
          'd': [
            [1, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [1, 1, 1, 0]
          ],
          'e': [
            [1, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 1, 1, 1]
          ],
          'f': [
            [1, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
          ],
          'g': [
            [0, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 0, 1, 1],
            [1, 0, 0, 1],
            [0, 1, 1, 1]
          ],
          'h': [
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [1, 1, 1, 1],
            [1, 0, 0, 1],
            [1, 0, 0, 1]
          ],
          'i': [
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1]
          ],
          'j': [
            [0, 1, 1],
            [0, 0, 1],
            [0, 0, 1],
            [1, 0, 1],
            [0, 1, 0]
          ],
          'k': [
            [1, 0, 0, 1],
            [1, 0, 1, 0],
            [1, 1, 0, 0],
            [1, 0, 1, 0],
            [1, 0, 0, 1]
          ],
          'l': [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 1, 1]
          ],
          'm': [
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1]
          ],
          'n': [
            [1, 1, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 0, 1]
          ],
          'o': [
            [0, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [0, 1, 1, 0]
          ],
          'p': [
            [1, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 1, 1, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
          ],
          'q': [
            [0, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [1, 0, 1, 0],
            [0, 1, 0, 1]
          ],
          'r': [
            [1, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 1, 1, 0],
            [1, 0, 1, 0],
            [1, 0, 0, 1]
          ],
          's': [
            [0, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 1],
            [1, 1, 1, 0]
          ],
          't': [
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
          ],
          'u': [
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [1, 0, 0, 1],
            [0, 1, 1, 0]
          ],
          'v': [
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0]
          ],
          'w': [
            [1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0]
          ],
          'x': [
            [1, 0, 0, 0, 1],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 1, 0],
            [1, 0, 0, 0, 1]
          ],
          'y': [
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
          ],
          'z': [
            [1, 1, 1, 1],
            [0, 0, 0, 1],
            [0, 0, 1, 0],
            [0, 1, 0, 0],
            [1, 1, 1, 1]
          ],
          ' ': [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          '!': [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 0, 0],
            [0, 1, 0]
          ],
          '?': [
             [0, 1, 1, 0],
            [1, 0, 0, 1],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 0]
          ]
        }
      ],
      outputData: `:mr_pat::mr_pat::mr_pat:\r\n:mr_pat::mr_pat::mr_pat:`
    };
  },
  computed: {
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
          element.emojiText = this.emojiText ? this.emojiText : ":smile:";
          element.emojiBackground = this.emojiBackground
            ? this.emojiBackground
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
    }
  },
  methods: {
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
  }
};
</script>
<style lang="scss" scoped>
td {
  background: red;
  width: 14px;
  height: 10px;
  &.on {
    background: black;
  }
}
</style>