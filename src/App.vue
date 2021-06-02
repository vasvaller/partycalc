<template>
  <header>
    <div class="wrapper">
      <h1 class="logo">PARTYCALC</h1>
      <ul>
        <li>Main</li>
        <li>About</li>
        <li>Contacts</li>
      </ul>
    </div>
  </header>
  <main>
    <section class="total">
      <div>
        <span>Totally spend: </span>
        <span class="accent">{{ this.totalSum }}</span>
      </div>
      <br />
      <div>
        <span>Average: </span>
        <span class="accent">{{ this.average }}</span>
      </div>
    </section>
    <section class="table">
      <div class="container">
        <table>
          <thead>
            <tr>
              <td>Person</td>
              <td>Paid</td>
              <td>To whom</td>
              <td>How much!</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" v-bind:key="row.$index">
              <td>
                <input
                  type="text"
                  tabindex="1"
                  placeholder="Name"
                  v-model="rows[index].name"
                />
              </td>
              <td>
                <input
                  type="text"
                  tabindex="2"
                  placeholder="Paid"
                  v-model="rows[index].paid"
                />
              </td>
              <td>
                <input
                  readonly
                  type="text"
                  tabindex="3"
                  placeholder="To whom"
                  v-model="rows[index].toWhom"
                />
              </td>
              <td>
                <input
                  readonly
                  type="text"
                  tabindex="4"
                  placeholder="How much"
                  v-model="rows[index].howMuch"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row accent separator">
          <hr />
        </div>
        <div class="row accent btn center" v-on:click="addMorePeople">
          add more people
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      rows: [
        {
          name: "Valtron",
          paid: 300,
          toWhom: "-",
          howMuch: 0,
        },
        {
          name: "Megan",
          paid: 200,
          toWhom: "Valtron",
          howMuch: 50,
        },
      ],
      totalSum: 0,
      average: 0,
      creditorList: [],
      debtorList: [],
    };
  },
  methods: {
    refreshTotalSum() {
      this.totalSum = this.rows.reduce((a, b) => Number(a) + Number(b.paid || 0), 0);
      return this.totalSum;
    },

    refreshAverage() {
      this.average = Math.round(this.totalSum / this.rows.length);
      return this.average;
    },

    addMorePeople() {
      const person = {
        name: null,
        paid: 0,
        toWhom: "",
        howMuch: 0,
      };
      this.rows.push(person);
    },

    calcHowMuch() {
      this.creditorList.length = 0;
      this.debtorList.length = 0;

      this.rows.forEach((row) => {
        row.howMuch = this.average - row.paid;

        if (row.howMuch > 0) {
          this.creditorList.push(row);
        } else if (row.howMuch < 0) {
          this.debtorList.push(row);
        }
      });
    },
  },
  mounted() {
    this.refreshTotalSum();
    this.refreshAverage();
    this.calcHowMuch();
  },
  computed: {},
  watch: {
    rows: {
      handler() {
        this.refreshTotalSum();
        this.refreshAverage();
        this.calcHowMuch();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
$first: orange;

.accent {
  color: $first;
}

body {
  padding: 0;
  margin: 0;
  font-family: "Courier New", Courier, monospace;
  color: white;
  background-color: rgb(65, 37, 117);
}

.btn {
  cursor: pointer;
}

header {
  padding: 0 30px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.171);
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  min-width: max-content;
}

.logo {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
}

ul {
  list-style: none;
  display: flex;
  width: 200px;
  justify-content: space-between;
}

thead {
  //font-weight: bold;
  color: $first;
}

section {
  padding: 0 30px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
}

input {
  background-color: transparent;
  color: white;
  padding: 10px 0;
}

.total {
  font-size: x-large;
}

.center {
  text-align: center;
}

.container {
  width: min-content;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid $first;
}

table {
  margin-bottom: 30px;
}

hr {
  border: none;
  height: 1px;
  background-color: $first;
}

.separator {
  margin-bottom: 30px;
}
</style>
