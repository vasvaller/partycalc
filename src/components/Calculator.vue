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
              <th scope="col">How much</th>
              <th scope="col" v-if="this.showColumnToWhom">From whom</th>
              <th scope="col" v-if="this.showColumnToWhom">To whom</th>
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
                  placeholder="How much"
                  v-model="rows[index].howMuch"
                />
              </td>
              <td>
                <input
                  type="text"
                  readonly
                  placeholder="From whom"
                  v-model="rows[index].fromWhom"
                />
              </td>
              <td v-if="this.showColumnToWhom">
                <input
                  readonly
                  type="text"
                  placeholder="To whom"
                  v-model="rows[index].toWhom"
                />
              </td>
              <td>
                <span
                  v-on:click="deletePerson(index)"
                  class="hoverControl btn btn_sm btn-danger"
                  >✖️</span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row primary separator">
          <hr />
        </div>
        <div class="row primary btn center" v-on:click="addMorePeople">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="$prime"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 0C10.3008 0.0446294 6.76575 1.53395 4.14985 4.14985C1.53395 6.76575 0.0446294 10.3008 0 14C0.0446294 17.6992 1.53395 21.2343 4.14985 23.8501C6.76575 26.466 10.3008 27.9554 14 28C17.6992 27.9554 21.2343 26.466 23.8501 23.8501C26.466 21.2343 27.9554 17.6992 28 14C27.9554 10.3008 26.466 6.76575 23.8501 4.14985C21.2343 1.53395 17.6992 0.0446294 14 0ZM22 15H15V22H13V15H6V13H13V6H15V13H22V15Z"
              fill="#DD6655"
            />
          </svg>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      showColumnToWhom: this.$store.getters.showColumnToWhom,
      rows: this.$store.state.db,
      totalSum: 0,
      average: 0,
      creditorsList: [],
      debtorsList: [],
    };
  },
  methods: {
    whoToWhom() {
      console.log("creds:");
      console.log(this.creditorsList);
      console.log("debs:");
      console.log(this.debtorsList);

      this.rows.forEach((pers) => {
        pers.toWhom = "";
        pers.fromWhom = "";
        pers.balance = pers.howMuch;
      });

      while (this.creditorsList.length > 0 && this.debtorsList.length > 0) {
        const addNamesToCredAndDebt = function () {
          creditor.fromWhom += `${debtor.name}=${debtor.balance} `;
          debtor.toWhom += `${creditor.name}=${creditor.balance} `;
        };

        this.creditorsList.sort((a, b) => b.balance - a.balance);
        this.debtorsList.sort((a, b) => b.balance - a.balance);

        let creditor = this.creditorsList[0];
        let debtor = this.debtorsList[0];

        if (debtor.balance > creditor.balance) {
          addNamesToCredAndDebt();
          debtor.balance -= creditor.balance;
          creditor.balance = 0;
          this.creditorsList.splice(0, 1);
        } else if (debtor.howMuch < creditor.howMuch) {
          addNamesToCredAndDebt();
          creditor.balance -= debtor.balance;
          debtor.balance = 0;
          this.debtorsList.splice(0, 1);
        } else {
          addNamesToCredAndDebt();
          debtor.balance = 0;
          creditor.balance = 0;
          this.debtorsList.splice(0, 1);
          this.creditorsList.splice(0, 1);
        }
      }
    },
    computeAll() {
      this.refreshTotalSum();
      this.refreshAverage();
      this.calcHowMuch();
      this.whoToWhom();
    },

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
        id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        name: null,
        paid: null,
        toWhom: "",
        howMuch: 0,
      };
      this.rows.push(person);
    },

    deletePerson(index) {
      if (this.rows.length > 1) {
        this.rows.splice(index, 1);
      }
    },

    calcHowMuch() {
      this.creditorsList.length = 0;
      this.debtorsList.length = 0;

      this.rows.forEach((row) => {
        row.howMuch = this.average - row.paid;

        if (row.howMuch < 0) {
          this.creditorsList.push(row);
          row.howMuch = Math.abs(row.howMuch);
        } else if (row.howMuch > 0) {
          this.debtorsList.push(row);
        }
      });
    },
  },
  mounted() {
    console.log(this.$store.getters.showColumnToWhom);
    this.computeAll();
  },
  computed: {
    rowsLength() {
      return this.rows.length;
    },
    rowsPaid() {
      return this.rows.map((row) => row.paid);
    },
    rowsNames() {
      return this.rows.map((row) => row.name);
    },
  },
  watch: {
    // rows: {
    //   handler() {
    //     this.computeAll();
    //   },
    //   deep: true,
    // },
    rowsLength() {
      this.computeAll();
    },
    rowsPaid() {
      this.computeAll();
    },
    rowsNames() {
      this.computeAll();
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

  border: 0;
}

.total {
  font-size: x-large;
  display: flex;
  justify-content: space-around;
}
</style>
