<template>
  <section class="section container">
    <h2 class="title is-3 has-text-grey">
      Emoji Builder
      <b-icon icon="rocket" size="is-large" />
    </h2>
    <div class="columns">
      <div class="column is-8">{{lineData}}</div>
    </div>
    <div class="columns" v-for="(data,i) in lineData" :key="i">
      <div class="column is-8">
        <b-field label="Line">
          <b-input v-model="data.value"></b-input>
        </b-field>
      </div>
      <div style="margin-top:auto" class="column is-4">
        <b-button @click="deleteColumn(data.id)" type="is-danger" icon-right="delete" />
      </div>
    </div>
    <div class="columns">
      <div class="column is-8">
        <b-button @click="addLine">Add Line</b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column is-8">
        <table>
          <tr v-for="row in generateMatrix" :key="row.id">
            <td v-for="(value, i) in row.value" :key="i">{{value ? 'A' : '0'}}</td>
          </tr>
        </table>
        <b-field label="Message">
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
      matrix:[],
      letterData: [
        {
          a: [
            [1, 1, 1, 1],
            [1, 0, 0, 1],
            [1, 1, 1, 1],
            [1, 0, 0, 1],
            [1, 0, 0, 1]
          ]
        }
      ],
      outputData: `:mr_pat::mr_pat::mr_pat:\r\n:mr_pat::mr_pat::mr_pat:`
    };
  },
  computed: {
    copyMatrix() {
      let outputString = '';
      this.matrix.forEach(element => {
          outputString += element.value.join('') + '\r\n'
      });
     return outputString;
    },
    generateMatrix() {
      let array = [
        { value: [0], id: 0 },
        { value: [0], id: 1 },
        { value: [0], id: 2 },
        { value: [0], id: 3 },
        { value: [0], id: 4 },
        { value: [0], id: 5 },
        { value: [0], id: 6 }
      ];

      if (!this.lineData.length) {
        return "";
      }

      this.lineData.forEach(line => {
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

            // add space
            array.forEach((element, i) => {
              array[i].value = _.concat(array[i].value, 0);
            });
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
<style scoped>
</style>