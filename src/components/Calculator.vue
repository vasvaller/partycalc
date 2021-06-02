<template>
  <main>
    <section class="total">
      <div class="">
        <div class="iblock">
          <span>Totally spend: </span>
          <span class="primary">{{ this.totalSum }}</span>
        </div>
        <span> / </span>
        <div class="iblock">
          <span>Average: </span>
          <span class="primary">{{ this.average }}</span>
        </div>
      </div>
    </section>
    <section class="table">
      <div class="container">
        <table>
          <caption class="hidden">
            Thats
          </caption>
          <thead>
            <tr>
              <th scope="col">Person</th>
              <th scope="col">Paid</th>
              <th scope="col" :class="{ hidden: !toWhomColumn }">To whom</th>
              <th scope="col">How much</th>
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
              <td :class="{ hidden: !toWhomColumn }">
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
        <div class="row primary separator">
          <hr />
        </div>
        <div class="row primary btn center" v-on:click="addMorePeople">
          add more people
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      toWhomColumn: false,
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
        paid: null,
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
@import "./src/styles/_variables.scss";

thead {
  //font-weight: bold;
  color: $prime;
}

th {
  text-align: left;
  font-weight: normal;
}

td {
  font-size: 1.2em;
}

input {
  font-size: 0.8em;

  background-color: transparent;
  color: white;
  padding: 10px 0;
}

.total {
  font-size: x-large;
  display: flex;
  justify-content: space-around;
}
</style>
