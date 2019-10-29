<template>
  <div id="container" style="margin-top: 20px" >
    <p hidden="true">{{temp}}</p>
    <table>
      <thead>
      <tr>
        <th v-for="(item, key) in alphabet" v-bind:key="key">{{item}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, key) in array" v-bind:key="key">
        <td id="border">{{item}}</td>
        <td v-for="(item2, key) in alphabet2" v-bind:key="key" style="width: 150px;">
          <input value="" v-bind:id="item2+item" v-model="objStage[item2+item]" @keyup.enter="handleChange" @blur="test"
                 @click="clickPre"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        array: Array(26).fill().map((x, i) => i),
        alphabet: ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        alphabet2: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        objStage: {},
        temp: "",
        previousStage: {},
        tempValue: ""
      }
    },
    mounted() {
    //   console.log('mounted', this.objStage);
    },
    created: function () {
    //   console.log('created');
      const temp = this.alphabet2;
      temp.forEach((item) => {
        for (let i = 0; i < 26; i++) {
          this.objStage[`${item}${i}`] = ''
        }
      });
      this.objStage['A0'] = 'sondasdakdn'
    },
    beforeUpdate: function () {
    //   console.log('beforeUP')
    },
    methods: {
      handleChange: function (e) {
        const id = e.currentTarget.id;
        let value = e.currentTarget.value;
        value = value.toString();
        if (value.startsWith("=sum(")) {
          if (value.endsWith(")")) {
            const expression = value.substring(value.indexOf("(") + 1, value.indexOf(")"));
            if (expression.indexOf(":") >= 0) {
              const left = expression.substring(0, expression.indexOf(":"));
              const right = expression.substring(expression.indexOf(":") + 1, expression.length);
              const sum = this.calculateSum(left, right);
              this.objStage[id] = sum;
              this.temp = id;
              this.tempValue = sum;
              this.previousStage[id] = value;
              document.activeElement.blur();
            } else {
              alert("Incorrect Expression :)");
            }
          } else {
            alert("No closing bracket");
          }
        } else if (value.startsWith("=div(")) {
          if (value.endsWith(")")) {
            const expression = value.substring(value.indexOf("(") + 1, value.indexOf(")"));
            if (expression.indexOf(",") >= 0) {
              const left = expression.substring(0, expression.indexOf(","));
              const right = expression.substring(expression.indexOf(",") + 1, expression.length);
              const div = this.calculateDiv(left, right);
              this.objStage[id] = div;
              this.temp = id;
              this.tempValue = div;
              this.previousStage[id] = value;
              document.activeElement.blur();
            } else {
              alert("Incorrect Expression :)");
            }
          } else {
            alert("No closing bracket");
          }
        } else if (value.startsWith("=") && value.indexOf("(") < 0 && value.indexOf(")") < 0) {
          const cell = value.substring(1, value.length);
          if (cell && this.objStage[cell]) {
            this.objStage[id] = this.objStage[cell];
            this.temp = id;
            this.tempValue = this.objStage[id];
            this.previousStage[id] = value;
            document.activeElement.blur();
          } else {
            alert('Unknown!!!')
          }
        } else {
          this.temp = id;
        //   console.log('final else');
          document.activeElement.blur();
        }
      },
      calculateSum: function (start, end) {
        const listKey = Object.keys(this.objStage);

        start = start.toString();
        end = end.toString();

        const numberLeft = start.substring(1, start.length);
        const chaLeft = start.substring(0, 1);
        const numberRight = end.substring(1, end.length);
        const chaRight = end.substring(0, 1);

        if (chaLeft !== chaRight) {
          const indexLeft = listKey.indexOf(start);
          let tempLeft = chaLeft + numberRight;
          const indexLefts = listKey.indexOf(tempLeft);
          const slice = listKey.slice(indexLeft, indexLefts + 1);
          let sum = 0;
          slice.forEach((item) => {
            if (!isNaN(parseFloat(this.objStage[item]))) {
              sum = sum + parseFloat(this.objStage[item]);
            }
          });

          let tempRight = chaRight + numberLeft;
          const indexRight = listKey.indexOf(tempRight);
          const indexRights = listKey.indexOf(end);
          const slices = listKey.slice(indexRight, indexRights + 1);
          let sums = 0;
          slices.forEach((item) => {
            if (!isNaN(parseFloat(this.objStage[item]))) {
              sums = sums + parseFloat(this.objStage[item]);
            }
          });
          return sum + sums;
        } else {
          const slices = listKey.slice(listKey.indexOf(start), listKey.indexOf(end) + 1);
          let sums = 0;
          slices.forEach((item) => {
            if (!isNaN(parseFloat(this.objStage[item]))) {
              sums = sums + parseFloat(this.objStage[item]);
            }
          });
          return sums;
        }

      },
      calculateDiv: function (value, number) {
        value = value.toString();
        if (!isNaN(parseFloat(this.objStage[value])) && !isNaN(parseFloat(number))) {
          return this.objStage[value] / parseFloat(number);
        } else {
          return 0
        }
      },
      test: function (e) {
        const id = e.currentTarget.id;
        if (this.temp !== e.currentTarget.id) {
          this.objStage[e.currentTarget.id] = "";
          // this.temp = e.currentTarget.id;
          const tempx = this.temp;
          this.temp = "a";
          this.temp = tempx;

        } else {
          if (this.previousStage[id]) {
            this.objStage[id] = this.tempValue;
            this.temp = "";
            this.temp = id;
          }
        }

        // this.objStage[id]
      },
      clickPre: function (e) {
        const id = e.currentTarget.id;
        if (this.previousStage[id]) {
          this.tempValue = this.objStage[id];
          this.objStage[id] = this.previousStage[id];
          this.temp = "";
          this.temp = id;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  #container {
    width: 900px;
    height: 300px;
    overflow-x: auto;
    white-space: nowrap;
  }

  table {
    width: 300%;
  }

  th {
    border: 1px solid black;
  }

  #border {
    border: 1px solid black;
  }

  table, th, td {
    /*border: 1px solid black;*/
  }

  input {
    width: 100%;
    box-sizing: border-box;
  }
</style>
